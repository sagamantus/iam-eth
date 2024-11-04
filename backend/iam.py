from web3 import Web3
import json
from datetime import datetime, timedelta
from solcx import compile_standard, install_solc

# Install the Solidity compiler version
install_solc("0.8.26")


class IdentityAndAccessManagement:
    def __init__(self, provider_url, contract_source_path, private_key=None):
        self.web3 = Web3(Web3.HTTPProvider(provider_url))
        assert self.web3.is_connected(), "Unable to connect to Ethereum node"

        # Load contract ABI and bytecode
        self.bytecode, self.contract_abi = self.compile_contract(contract_source_path)

        # Wallet setup
        self.wallet_setup(private_key)

        # Deploy contract and get the address
        self.contract_address = self.deploy_contract()

        # Initialize contract instance
        self.contract = self.web3.eth.contract(
            address=self.contract_address, abi=self.contract_abi
        )

    def wallet_setup(self, private_key):
        self.private_key = private_key
        self.account = (
            self.web3.eth.account.from_key(self.private_key) if private_key else None
        )

    def compile_contract(self, contract_source_path):
        """Compiles the Solidity contract and returns the ABI and bytecode."""
        with open(contract_source_path, "r") as file:
            contract_source_code = file.read()

        # Compile the contract
        compiled_sol = compile_standard(
            {
                "language": "Solidity",
                "sources": {contract_source_path: {"content": contract_source_code}},
                "settings": {
                    "evmVersion": "paris",
                    "outputSelection": {
                        "*": {
                            "*": [
                                "abi",
                                "metadata",
                                "evm.bytecode",
                                "evm.bytecode.sourceMap",
                            ]
                        }
                    },
                },
            },
            solc_version="0.8.26",
        )

        # Extract bytecode and ABI
        bytecode = compiled_sol["contracts"][contract_source_path][
            "IdentityAndAccessManagement"
        ]["evm"]["bytecode"]["object"]
        abi = json.loads(
            compiled_sol["contracts"][contract_source_path][
                "IdentityAndAccessManagement"
            ]["metadata"]
        )["output"]["abi"]

        return bytecode, abi

    def deploy_contract(self):
        """Deploys the contract and returns its address."""
        contract = self.web3.eth.contract(abi=self.contract_abi, bytecode=self.bytecode)
        nonce = self.web3.eth.get_transaction_count(self.account.address)

        tx = contract.constructor().build_transaction(
            {
                "chainId": self.web3.eth.chain_id,
                "gasPrice": self.web3.eth.gas_price,
                "from": self.account.address,
                "nonce": nonce,
            }
        )

        signed_tx = self.web3.eth.account.sign_transaction(
            tx, private_key=self.private_key
        )
        tx_hash = self.web3.eth.send_raw_transaction(signed_tx.raw_transaction)
        tx_receipt = self.web3.eth.wait_for_transaction_receipt(tx_hash)

        print(f"Contract deployed to {tx_receipt.contractAddress}")
        return tx_receipt.contractAddress

    def _send_transaction(self, func):
        transaction = func.build_transaction(
            {
                "from": self.account.address,
                "nonce": self.web3.eth.get_transaction_count(self.account.address),
                "gas": 3000000,
                "gasPrice": self.web3.to_wei("10", "gwei"),
            }
        )

        signed_txn = self.web3.eth.account.sign_transaction(
            transaction, private_key=self.private_key
        )
        txn_hash = self.web3.eth.send_raw_transaction(signed_txn.raw_transaction)
        return self.web3.to_hex(txn_hash)

    def add_user(self, user_address, name, dept, role_level):
        func = self.contract.functions.addUser(
            Web3.to_checksum_address(user_address), name, dept, role_level
        )
        txn_hash = self._send_transaction(func)
        return txn_hash

    def update_user_role(self, user_address, role_level):
        func = self.contract.functions.updateUserRole(
            Web3.to_checksum_address(user_address), role_level
        )
        txn_hash = self._send_transaction(func)
        return txn_hash

    def grant_resource_access(
        self, user_address, resource, role_level, duration_in_seconds
    ):
        expiry_time = duration_in_seconds
        func = self.contract.functions.grantResourceAccess(
            Web3.to_checksum_address(user_address),
            Web3.to_hex(Web3.keccak(text=resource))[:66],
            role_level,
            expiry_time,
        )
        txn_hash = self._send_transaction(func)
        return txn_hash

    def revoke_resource_access(self, user_address, resource):
        func = self.contract.functions.revokeResourceAccess(
            Web3.to_checksum_address(user_address),
            Web3.to_hex(Web3.keccak(text=resource))[:66],
        )
        txn_hash = self._send_transaction(func)
        return txn_hash

    def suspend_user(self, user_address):
        func = self.contract.functions.suspendUser(
            Web3.to_checksum_address(user_address)
        )
        txn_hash = self._send_transaction(func)
        return txn_hash

    def restore_user(self, user_address):
        func = self.contract.functions.restoreUser(
            Web3.to_checksum_address(user_address)
        )
        txn_hash = self._send_transaction(func)
        return txn_hash

    def get_user_role(self, user_address):
        role = self.contract.functions.getUserRole(
            Web3.to_checksum_address(user_address)
        ).call()
        return role

    def has_access(self, user_address, resource):
        access = self.contract.functions.hasAccess(
            Web3.to_checksum_address(user_address),
            Web3.to_hex(Web3.keccak(text=resource))[:66],
        ).call()
        return access

    def update_user_data(self, user_address, key, value):
        func = self.contract.functions.updateUserData(
            Web3.to_checksum_address(user_address), key, value
        )
        txn_hash = self._send_transaction(func)
        return txn_hash

    def get_user_data(self, user_address, key):
        data = self.contract.functions.getUserData(
            Web3.to_checksum_address(user_address), key
        ).call()
        return data

    def get_all_users(self):
        user_addresses = self.contract.functions.getAllUserAddresses().call()
        users = []

        # Retrieve user details for each address
        for address in user_addresses:
            role = self.contract.functions.getUserRole(address).call()
            is_suspended = self.contract.functions.users(address).call()[
                2
            ]  # Assuming users mapping returns a tuple (userAddress, role, isSuspended)
            users.append(
                {"address": address, "role": role, "is_suspended": is_suspended}
            )

        return users
