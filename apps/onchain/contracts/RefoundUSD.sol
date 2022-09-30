// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RefoundUSD is ERC20, Ownable {
	//mapping(address => uint256) locked;

	IERC20 token;

	mapping(address => address) public beneficiary;
	mapping(address => bool) public fundsBeingClaimed;
	mapping(address => uint256) public beneficiaryClaimTimestamp;

	uint256 public accountLockPeriod = 60 * 60 * 24 * 7;
	uint256 public subscriptionPeriod = 60 * 60 * 24 * 30;
	uint256 public subscriptionAmount = 5 * (10**18);
	uint256 public subscriptionStartTime;
	address[] public subscriptionReceivers;
	mapping(address => bool) public subscriptionReceiversMap;
	mapping(address => address[]) public subscriptions; // Receiver to subscribers

	uint256 subscriptionReceiverIndex;
	uint256 subscriptionsIndex;
	bool public SubscriptionsLocked;

	event Deposit(address indexed from, uint256 amount);
	event Withdraw(address indexed to, uint256 amount);

	event BeneficiaryAdded(address indexed primary, address indexed beneficiary);
	event BeneficiaryRemoved(address indexed primary, address indexed beneficiary);
	event BeneficiaryClaimStart(
		address indexed primary,
		address indexed beneficiary,
		uint256 releaseDate
	);
	event BeneficiaryClaimCancelled(address indexed primary, address indexed beneficiary);
	event BeneficiaryWithdraw(address indexed primary, address indexed beneficiary, uint256 amount);

	event NewSubscriptionReceiver(address receiverOwner);
	event NewSubscriber(address receiver, address subscriber, uint256 amount);
	event SubscriberUnsubscribed(address receiver, address subscriber);
	event UnsubscribedInsufficientFunds(address receiver, address subscriber);
	event SubscriptionPeriodIncremented(uint256 startTime);

	modifier accountNotLocked(address user) {
		require(!fundsBeingClaimed[user], "this account is being claimed");
		_;
	}

	constructor(address _token) ERC20("RefoundUSD", "RUSD") {
		token = IERC20(_token);
		subscriptionStartTime = block.timestamp;
		subscriptionReceiverIndex = 0;
		subscriptionsIndex = 0;
		SubscriptionsLocked = false;
	}

	function deposit(uint256 amount) public accountNotLocked(msg.sender) {
		token.transferFrom(msg.sender, address(this), amount);
		_mint(msg.sender, amount);
		emit Deposit(msg.sender, amount);
	}

	function withdrawal(uint256 amount) public accountNotLocked(msg.sender) {
		_burn(msg.sender, amount);
		token.transfer(msg.sender, amount);
		emit Withdraw(msg.sender, amount);
	}

	function setBeneficiary(address _beneficiary) public {
		beneficiary[msg.sender] = _beneficiary;
		emit BeneficiaryAdded(msg.sender, _beneficiary);
	}

	function removeBeneficiary() public {
		require(beneficiary[msg.sender] != address(0), "No beneficiary is set");
		emit BeneficiaryRemoved(msg.sender, beneficiary[msg.sender]);
		delete beneficiary[msg.sender];
	}

	function startBeneficiaryClaimFunds(address user) public accountNotLocked(user) {
		require(beneficiary[user] == msg.sender, "this user has not made you his beneficiary");

		fundsBeingClaimed[user] = true;
		beneficiaryClaimTimestamp[user] = block.timestamp + accountLockPeriod;

		emit BeneficiaryClaimStart(user, msg.sender, beneficiaryClaimTimestamp[user]);
	}

	function beneficiaryClaimFunds(address user) public accountNotLocked(user) {
		require(beneficiary[user] == msg.sender, "this user has not made you his beneficiary");
		require(
			fundsBeingClaimed[user] == true,
			"you need to use startBeneficiaryClaimFunds first"
		);
		require(
			beneficiaryClaimTimestamp[user] < block.timestamp,
			"you need to wait till LockPeriod is over"
		);

		uint256 amount = balanceOf(user);
		_burn(user, amount);
		token.transfer(user, amount);

		emit BeneficiaryWithdraw(user, msg.sender, amount);
	}

	function cancelClaim() public {
		fundsBeingClaimed[msg.sender] = false;

		emit BeneficiaryClaimCancelled(msg.sender, beneficiary[msg.sender]);
	}

	function addSubscriptionReceiver(address receiver) public {
		require(
			subscriptionReceiversMap[msg.sender] == false,
			"Subscription receiver already exists."
		);
		require(!SubscriptionsLocked, "Subscription is locked.");

		subscriptionReceiversMap[msg.sender] == true;
		subscriptionReceivers.push(receiver);

		emit NewSubscriptionReceiver(msg.sender);
	}

	function subscribe(address receiver) public {
		require(
			subscriptionReceiversMap[msg.sender] == true,
			"this user needs to call addSubsciptionReceiver for you to subscribe to them"
		);
		require(!SubscriptionsLocked, "Subscription is locked");

		transfer(receiver, subscriptionAmount); //pay amount for this subscription period
		subscriptions[receiver].push(msg.sender);

		emit NewSubscriber(receiver, msg.sender, subscriptionAmount);
	}

	function unSubscribe(address receiver, uint64 index) public {
		require(!SubscriptionsLocked);
		require(subscriptions[receiver][index] == msg.sender);
		address last = subscriptions[receiver][subscriptions[receiver].length - 1];
		subscriptions[receiver][index] = last;
		subscriptions[receiver].pop();

		emit SubscriberUnsubscribed(receiver, msg.sender);
	}

	function incrementSubscriptionPeriod() public onlyOwner {
		//once all payment are done
		require(SubscriptionsLocked);
		require(subscriptionReceiverIndex > subscriptionReceivers.length);
		subscriptionStartTime += subscriptionPeriod;
		subscriptionReceiverIndex = 0;
		SubscriptionsLocked = false;

		emit SubscriptionPeriodIncremented(subscriptionStartTime);
	}

	function _incrementSubscriptionPeriod(uint8 times) public onlyOwner {
		//does times number of transfers call this function till they are all done
		require(SubscriptionsLocked);
		uint256 subscriptionReceiverIndexTmp = subscriptionReceiverIndex; //for gas savings
		uint256 subscriptionsIndexTmp = subscriptionsIndex; //for gas savings
		require(subscriptionReceiverIndexTmp < subscriptionReceivers.length, "your done"); //this will let you know when you finished all the transfers
		address receiver = subscriptionReceivers[subscriptionReceiverIndexTmp];
		for (uint8 i = 0; i < times; i++) {
			if (subscriptionsIndexTmp >= subscriptions[receiver].length) {
				//reached the end of this users subscriptions start on the next one
				subscriptionsIndexTmp = 0;
				subscriptionReceiverIndexTmp++;
				if (subscriptionReceiverIndexTmp >= subscriptionReceivers.length) {
					break;
				} //all transactions are done
				receiver = subscriptionReceivers[subscriptionReceiverIndexTmp];
			}
			address sender = subscriptions[receiver][subscriptionsIndexTmp];
			if (sender == address(0)) {
				//make sure its not the 0 address
				subscriptionsIndexTmp++;
				continue;
			}
			if (balanceOf(sender) < subscriptionAmount) {
				//force unsubscribe if user cant afford
				subscriptions[receiver][subscriptionsIndexTmp] = address(0);
				emit UnsubscribedInsufficientFunds(receiver, sender);
			} else {
				_transfer(sender, receiver, subscriptionAmount); //make subscription payment
			}
			subscriptionsIndexTmp++;
			continue;
		}
		subscriptionReceiverIndex = subscriptionReceiverIndexTmp; //for gas savings
		subscriptionsIndex = subscriptionsIndexTmp; //for gas savings
	}

	function lockForSubsciptionPayments() public onlyOwner {
		//need to lock before we start transfering payments
		require(block.timestamp > subscriptionStartTime + subscriptionPeriod);
		SubscriptionsLocked = true;
	}
}
