// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IERC20 {
	function transfer(address, uint256) external returns (bool);

	function transferFrom(
		address,
		address,
		uint256
	) external returns (bool);
}

/**
 * @title CrowdFund Smart Contract
 * @author Vedant Chainani
 */

contract FundingPool {
	struct Campaign {
		address creator;
		uint256 goal;
		string title;
		string description;
		string imageLink;
		uint256 pledged;
		uint256 startAt;
		uint256 endAt;
		bool claimed;
	}

	IERC20 public immutable token;
	uint256 public count;
	uint256 public maxDuration;
	mapping(uint256 => Campaign) public campaigns;
	mapping(uint256 => mapping(address => uint256)) public pledgedAmount;

	event Launch(
		uint256 id,
		address indexed creator,
		uint256 goal,
		string title,
		string description,
		string imageLink,
		uint32 startAt,
		uint32 endAt
	);
	event Cancel(address indexed caller, uint256 indexed poolId);
	event Pledge(
		address indexed caller,
		uint256 indexed poolId,
		uint256 amount,
		uint256 callerTotal,
		uint256 poolTotal
	);
	event Unpledge(
		address indexed caller,
		uint256 indexed poolId,
		uint256 amount,
		uint256 callerTotal,
		uint256 poolTotal
	);
	event Claim(address indexed caller, uint256 poolId, uint256 amount);
	event Refund(address indexed caller, uint256 indexed poolId, uint256 amount);

	constructor(address _token, uint256 _maxDuration) {
		token = IERC20(_token);
		maxDuration = _maxDuration;
	}

	function launch(
		uint256 _goal,
		string memory _title,
		string memory _description,
		string memory _imageLink,
		uint32 _startAt,
		uint32 _endAt
	) external {
		require(_startAt >= block.timestamp, "Start time is less than current Block Timestamp");
		require(_endAt > _startAt, "End time is less than Start time");
		require(_endAt <= block.timestamp + maxDuration, "End time exceeds the maximum Duration");

		count += 1;
		campaigns[count] = Campaign({
			creator: msg.sender,
			goal: _goal,
			title: _title,
			description: _description,
			imageLink: _imageLink,
			pledged: 0,
			startAt: _startAt,
			endAt: _endAt,
			claimed: false
		});

		CampaignsByCreator[msg.sender].push(campaigns[count]);

		emit Launch(count, msg.sender, _goal, _title, _description, _imageLink, _startAt, _endAt);
	}

	function cancel(uint256 _id) external {
		Campaign memory campaign = campaigns[_id];
		require(campaign.creator == msg.sender, "You did not create this Campaign");
		require(block.timestamp < campaign.startAt, "Campaign has already started");

		delete campaigns[_id];

		emit Cancel(msg.sender, _id);
	}

	function pledge(uint256 _id, uint256 _amount) external {
		Campaign storage campaign = campaigns[_id];
		require(block.timestamp >= campaign.startAt, "Campaign has not Started yet");
		require(block.timestamp <= campaign.endAt, "Campaign has already ended");
		campaign.pledged += _amount;
		pledgedAmount[_id][msg.sender] += _amount;
		token.transferFrom(msg.sender, address(this), _amount);

		emit Pledge(msg.sender, _id, _amount, pledgedAmount[_id][msg.sender], campaign.pledged);
	}

	function unPledge(uint256 _id, uint256 _amount) external {
		Campaign storage campaign = campaigns[_id];
		require(block.timestamp >= campaign.startAt, "Campaign has not Started yet");
		require(block.timestamp <= campaign.endAt, "Campaign has already ended");
		require(
			pledgedAmount[_id][msg.sender] >= _amount,
			"You do not have enough tokens Pledged to withraw"
		);

		campaign.pledged -= _amount;
		pledgedAmount[_id][msg.sender] -= _amount;
		token.transfer(msg.sender, _amount);

		emit Unpledge(msg.sender, _id, _amount, pledgedAmount[_id][msg.sender], campaign.pledged);
	}

	function claim(uint256 _id) external {
		Campaign storage campaign = campaigns[_id];
		require(campaign.creator == msg.sender, "You did not create this Campaign");
		require(block.timestamp > campaign.endAt, "Campaign has not ended");
		require(campaign.pledged >= campaign.goal, "Campaign did not succed");
		require(!campaign.claimed, "claimed");

		campaign.claimed = true;
		token.transfer(campaign.creator, campaign.pledged);

		emit Claim(msg.sender, _id, campaign.pledged);
	}

	function refund(uint256 _id) external {
		Campaign memory campaign = campaigns[_id];
		require(block.timestamp > campaign.endAt, "not ended");
		require(campaign.pledged < campaign.goal, "You cannot Withdraw, Campaign has succeeded");

		uint256 bal = pledgedAmount[_id][msg.sender];
		pledgedAmount[_id][msg.sender] = 0;
		token.transfer(msg.sender, bal);

		emit Refund(msg.sender, _id, bal);
	}

	//--------------------------------------------------------------------------

	mapping(address => Campaign[]) public CampaignsByCreator; //for testing only
}
