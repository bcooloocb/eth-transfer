// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.17;

contract Transfer {
    address public sender;
    address public receiver;

    function Transfer() public{
        sender = msg.sender;
    }
    
    function setReceiver() public {            
        receiver = msg.sender;
    }


    function sendEther() public payable restricted {   
        require(msg.value > .01 ether);    
        receiver.transfer(this.balance);       
    }

    modifier restricted() {
        require(msg.sender == sender);
        _;
    }
  
}

