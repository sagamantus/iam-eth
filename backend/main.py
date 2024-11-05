from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyHeader
from jose import JWTError, jwt
from pydantic import BaseModel
from web3 import Web3
import os
import dotenv
from iam import IdentityAndAccessManagement

dotenv.load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Configuration
provider_url = os.getenv("PROVIDER_URL")
contract_source_path = "./contract/contract.sol"
iam_private_key = os.getenv("PRIVATE_KEY")
jwt_secret_key = os.getenv("JWT_SECRET_KEY", "supersecret")
algorithm = "HS256"

# Initialize IAM
iam = IdentityAndAccessManagement(provider_url, contract_source_path, iam_private_key)


# Define a custom API key security scheme
class BearerAuth(APIKeyHeader):
    def __init__(self):
        super().__init__(name="Authorization", auto_error=True)


oauth2_scheme = BearerAuth()


# Request models
class AddUserRequest(BaseModel):
    user_address: str
    name: str
    dept: str
    role_level: int


class UpdateUserRoleRequest(BaseModel):
    user_address: str
    role_level: int


class GrantAccessRequest(BaseModel):
    user_address: str
    resource: str
    role_level: int
    duration_in_seconds: int


class RevokeAccessRequest(BaseModel):
    user_address: str
    resource: str


class SuspendUserRequest(BaseModel):
    user_address: str


class RestoreUserRequest(BaseModel):
    user_address: str


class UpdateUserDataRequest(BaseModel):
    user_address: str
    key: str
    value: str


class LoginRequest(BaseModel):
    private_key: str


class Token(BaseModel):
    access_token: str
    token_type: str


# Verify private key function (implement actual validation logic as needed)
def verify_private_key(private_key: str) -> bool:
    try:
        iam.wallet_setup(iam_private_key)
        acc = iam.web3.eth.account.from_key(private_key)
        return acc.address in [_["address"] for _ in iam.get_all_users()]
    except Exception as e:
        print(e)
        return False


# JWT Token creation
def create_access_token(data: dict):
    return jwt.encode(data, jwt_secret_key, algorithm=algorithm)


# Dependency to extract and verify token in each request
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        # Remove 'Bearer ' prefix before decoding the token
        payload = jwt.decode(
            token.replace("Bearer ", ""), jwt_secret_key, algorithms=[algorithm]
        )
        private_key = payload.get("sub")
        if not private_key:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )
        return private_key
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )


# Login endpoint
@app.post("/login", response_model=Token)
async def login(request: LoginRequest):
    if not verify_private_key(request.private_key):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    access_token = create_access_token({"sub": request.private_key})
    return {"access_token": access_token, "token_type": "bearer"}


# Endpoint to add a new user
@app.post("/users/add")
def add_user(request: AddUserRequest, current_user: str = Depends(get_current_user)):
    iam.wallet_setup(current_user)
    try:
        txn_hash = iam.add_user(
            request.user_address, request.name, request.dept, request.role_level
        )
        return {"transaction_hash": txn_hash}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Endpoint to update a user's role
@app.put("/users/update-role")
def update_user_role(
    request: UpdateUserRoleRequest, current_user: str = Depends(get_current_user)
):
    iam.wallet_setup(current_user)
    try:
        txn_hash = iam.update_user_role(request.user_address, request.role_level)
        return {"transaction_hash": txn_hash}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Endpoint to grant access to a resource
@app.post("/access/grant")
def grant_resource_access(
    request: GrantAccessRequest, current_user: str = Depends(get_current_user)
):
    iam.wallet_setup(current_user)
    try:
        txn_hash = iam.grant_resource_access(
            request.user_address,
            request.resource,
            request.role_level,
            request.duration_in_seconds,
        )
        return {"transaction_hash": txn_hash}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Endpoint to revoke access to a resource
@app.post("/access/revoke")
def revoke_resource_access(
    request: RevokeAccessRequest, current_user: str = Depends(get_current_user)
):
    iam.wallet_setup(current_user)
    try:
        txn_hash = iam.revoke_resource_access(request.user_address, request.resource)
        return {"transaction_hash": txn_hash}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Endpoint to suspend a user
@app.post("/users/suspend")
def suspend_user(
    request: SuspendUserRequest, current_user: str = Depends(get_current_user)
):
    iam.wallet_setup(current_user)
    try:
        txn_hash = iam.suspend_user(request.user_address)
        return {"transaction_hash": txn_hash}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Endpoint to restore a suspended user
@app.post("/users/restore")
def restore_user(
    request: RestoreUserRequest, current_user: str = Depends(get_current_user)
):
    iam.wallet_setup(current_user)
    try:
        txn_hash = iam.restore_user(request.user_address)
        return {"transaction_hash": txn_hash}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Endpoint to get a user's role
@app.get("/users/{user_address}/role")
def get_user_role(user_address: str, current_user: str = Depends(get_current_user)):
    iam.wallet_setup(current_user)
    try:
        role = iam.get_user_role(user_address)
        return {"role": role}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Endpoint to check if a user has access to a resource
@app.get("/access/{user_address}/{resource}")
def has_access(
    user_address: str, resource: str, current_user: str = Depends(get_current_user)
):
    iam.wallet_setup(current_user)
    try:
        access = iam.has_access(user_address, resource)
        return {"has_access": access}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Endpoint to update user data
@app.post("/users/data/update")
def update_user_data(
    request: UpdateUserDataRequest, current_user: str = Depends(get_current_user)
):
    iam.wallet_setup(current_user)
    try:
        txn_hash = iam.update_user_data(
            request.user_address, request.key, request.value
        )
        return {"transaction_hash": txn_hash}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Endpoint to get user data by key
@app.get("/users/{user_address}/data/{key}")
def get_user_data(
    user_address: str, key: str, current_user: str = Depends(get_current_user)
):
    iam.wallet_setup(current_user)
    try:
        data = iam.get_user_data(user_address, key)
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Endpoint to get all users
@app.get("/users/all")
def get_all_users(current_user: str = Depends(get_current_user)):
    iam.wallet_setup(current_user)
    try:
        users = iam.get_all_users()
        for i, user in enumerate(users):
            users[i]["name"] = iam.get_user_data(user["address"], "name")
            users[i]["dept"] = iam.get_user_data(user["address"], "dept")
        return users
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
