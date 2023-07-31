// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
	address public arbiter;
	address public beneficiary;
	address public depositor;

	bool public isApproved;

	constructor(address _arbiter, address _beneficiary) payable {
		require ( msg.sender != _beneficiary, "address not approved");
        require (msg.sender != _arbiter, "address not approved");
        require (_beneficiary != _arbiter, "address not approved");
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}
	fallback() external payable{
	}
	event Approved(uint);

	function approve() external {
		require(msg.sender == arbiter);
		uint balance = address(this).balance;
		(bool sent, ) = payable(beneficiary).call{value: balance}("");
 		require(sent, "Failed to send Ether");
		emit Approved(balance);
		isApproved = true;
	}
}
