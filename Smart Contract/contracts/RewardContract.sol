// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RewardContract {
    address public owner;

    constructor() public{
        owner = msg.sender; 
    }

    
    function reward(address payable user) public payable {
        require(msg.value > 0, "No Ether sent for the reward");
        user.transfer(msg.value); 
    }

    
}
