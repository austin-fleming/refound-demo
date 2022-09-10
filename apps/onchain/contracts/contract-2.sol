// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// Importing OpenZeppelin's SafeMath Implementation
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// IERC-20 contract
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BasePool is Initializable {
    using SafeMath for uint256;

    // CONSTANTS
    uint maxDuration 

    // STATE
    uint public deadline;

    function isActive() internal view returns (bool) {
        return block.timestamp >= deadline;
    }

    event Intialized();
    event Launched();
    event Cancelled();
    event Withdrew();
    event Contributed();
    event Uncontributed();
    event Refunded();

    function initialize() {}
    function launch() {}
    function cancel() {}
    function withdraw() {}
    function contribute() {}
    function uncontribute() {}
    function refund() {}
}

contract PoolFactory is Ownable {
    address public poolImplementation;
    address[] public poolClones;

    event PoolCreated(address poolClone);

    function createNewPool(
        address payable poolCreator,
        string memory poolTitle,
        string memory poolDescription,
        string memory poolImageLink,
        uint poolDeadline,
        uint poolGoalAmount
    ) external payable returns (address poolInstance) {
        poolInstance = Clones.clone(poolImplementation);

        (bool success, ) = poolInstance.call{value: msg.value}(
            abi.encodeWithSignature(
                "initialize(address,string,string,string,uint,uint)",
                poolCreator,
                poolTitle,
                poolDescription,
                poolImageLink,
                poolDeadline,
                poolGoalAmount
            )
        );

        require(success, "Failed to create pool");

        poolClones.push(poolInstance);
        emit PoolCreated(poolInstance);

        return poolInstance;
    }
}
