// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/* 
REFERENCE:
https://learn.figment.io/tutorials/celo-crowd-funding-project
https://github.com/Envoy-VC/Smart-Contracts/blob/main/Crowd%20Fund/CrowdFund.sol
https://www.chainshot.com/article/how-to-use-minimal-proxies
 */

// Importing OpenZeppelin's SafeMath Implementation
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// IERC-20 contract
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Project {
    using SafeMath for uint256;

    enum ProjectState {
        Fundraising,
        Expired,
        Successful
    }

    // VARIABLES

    IERC20 private cUSDToken;

    address payable public creator;
    uint public goalAmount;
    uint public completeAt;
    uint256 public currentBalance;
    uint public deadline;
    string public title;
    string public description;
    string public imageLink;

    ProjectState public state = ProjectState.Fundraising;

    mapping(address => uint) public contributions;

    // EVENTS
    event ReceivedFunding(address contributor, uint amount, uint currentTotal);
    event CreatorPaid(address Recipient);

    // MODIFIERS
    modifier verifyState(ProjectState projectState) {
        require(state == projectState);
        _;
    }

    constructor(
        IERC20 token,
        address payable projectCreator,
        string memory projectTitle,
        string memory projectDescription,
        string memory projectImageLink,
        uint projectDeadline,
        uint projectGoalAmount
    ) {
        cUSDToken = token;
        creator = projectCreator;
        title = projectTitle;
        description = projectDescription;
        imageLink = projectImageLink;
        goalAmount = projectGoalAmount;
        deadline = projectDeadline;
        currentBalance = 0;
    }

    function contribute(uint256 amount)
        external
        payable
        verifyState(ProjectState.Fundraising)
    {
        // check
        checkIfFundingExpired();
        // update
        contributions[msg.sender] = contributions[msg.sender].add(amount);
        currentBalance = currentBalance.add(amount);
        // transact
        cUSDToken.transferFrom(msg.sender, address(this), amount);

        emit ReceivedFunding(msg.sender, amount, currentBalance);
    }
}

contract CrowdFund {
    using SafeMath for uint256;

    Project[] private projects;
}
