// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract IdentityAndAccessManagement {

    struct AccessGrant {
        uint256 role;
        uint256 expiry;
    }

    struct User {
        address userAddress;
        uint256 role;
        bool isSuspended;
        mapping(string => string) data;
    }

    mapping(address => User) public users;
    mapping(address => mapping(bytes32 => AccessGrant)) public resourceAccess;
    address[] public userAddresses;

    event UserAdded(address indexed userAddress, uint256 role);
    event UserRoleUpdated(address indexed userAddress, uint256 role);
    event AccessGranted(address indexed grantedBy, address indexed userAddress, bytes32 resource, uint256 role, uint256 expiry);
    event AccessRevoked(address indexed revokedBy, address indexed userAddress, bytes32 resource);
    event UserSuspended(address indexed userAddress);
    event UserRestored(address indexed userAddress);
    event UserDataUpdated(address indexed userAddress, string key, string value);

    modifier onlyRole(uint256 role) {
        require(users[msg.sender].role <= role, "Unauthorized role level");
        require(!users[msg.sender].isSuspended, "Account suspended");
        _;
    }

    constructor() {
        users[msg.sender].userAddress = msg.sender;
        users[msg.sender].role = 0;  // Highest privilege (superadmin)
        users[msg.sender].isSuspended = false;
        users[msg.sender].data["name"] = "Admin";
        users[msg.sender].data["dept"] = "Admin";
        userAddresses.push(msg.sender);
        emit UserAdded(msg.sender, 0);
    }

    function addUser(address userAddress, string memory name, string memory dept, uint256 role) public onlyRole(role) {
        require(users[userAddress].userAddress == address(0), "User already exists");
        users[userAddress].userAddress = userAddress;
        users[userAddress].role = role;
        users[userAddress].isSuspended = false;
        users[userAddress].data["name"] = name;
        users[userAddress].data["dept"] = dept;
        userAddresses.push(userAddress); 
        emit UserAdded(userAddress, role);
    }

    function getAllUserAddresses() public view returns (address[] memory) {
        return userAddresses;
    }

    function updateUserRole(address userAddress, uint256 role) public onlyRole(role) {
        require(users[userAddress].userAddress != address(0), "User not found");
        require(role >= users[msg.sender].role, "Cannot assign higher privilege role than current role");
        users[userAddress].role = role;
        emit UserRoleUpdated(userAddress, role);
    }

    function grantResourceAccess(address userAddress, bytes32 resource, uint256 requiredRole, uint256 duration) public onlyRole(requiredRole) {
        require(users[userAddress].userAddress != address(0), "User not found");
        require(!users[userAddress].isSuspended, "Cannot grant access to suspended user");

        uint256 expiry = duration > 0 ? block.timestamp + duration : 0;
        resourceAccess[userAddress][resource] = AccessGrant(requiredRole, expiry);

        emit AccessGranted(msg.sender, userAddress, resource, requiredRole, expiry);
    }

    function revokeResourceAccess(address userAddress, bytes32 resource) public onlyRole(1) { 
        delete resourceAccess[userAddress][resource];
        emit AccessRevoked(msg.sender, userAddress, resource);
    }

    function suspendUser(address userAddress) public onlyRole(users[userAddress].role) {
        require(users[userAddress].userAddress != address(0), "User not found");
        require(users[userAddress].role > users[msg.sender].role, "Cannot suspend a user with equal or higher privilege");
        users[userAddress].isSuspended = true;
        emit UserSuspended(userAddress);
    }

    function restoreUser(address userAddress) public onlyRole(users[userAddress].role) {
        require(users[userAddress].isSuspended, "User is not suspended");
        require(users[userAddress].role > users[msg.sender].role, "Cannot restore a user with equal or higher privilege");
        users[userAddress].isSuspended = false;
        emit UserRestored(userAddress);
    }

    function hasAccess(address userAddress, bytes32 resource) public view returns (bool) {
        AccessGrant memory grant = resourceAccess[userAddress][resource];
        return grant.expiry == 0 || block.timestamp <= grant.expiry;
    }

    function getUserRole(address userAddress) public view returns (uint256) {
        return users[userAddress].role;
    }

    function updateUserData(address userAddress, string memory key, string memory value) public onlyRole(users[userAddress].role) {
        require(users[userAddress].userAddress != address(0), "User not found");
        users[userAddress].data[key] = value;
        emit UserDataUpdated(userAddress, key, value);
    }

    function getUserData(address userAddress, string memory key) public view returns (string memory) {
        require(users[userAddress].userAddress != address(0), "User not found");
        return users[userAddress].data[key];
    }
}
