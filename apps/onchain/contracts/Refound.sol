// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
import "contracts/RefoundPost.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

enum verificationLevel {
	None,
	Trusted,
	Verified
}

contract Refound is ERC721URIStorage, Ownable {
	uint256 public profiles;
	RefoundPost public postContract;
	mapping(bytes32 => uint256) public ProfileIDByHandle;
	mapping(uint256 => verificationLevel) userVerificationLevel;

	event PostCreated(address indexed from, uint256 indexed profileID, uint256 postID);
	event ProfileCreated(address indexed caller, uint256 indexed profileID, string handle);
	event ProfileUpdated(address indexed caller, uint256 indexed profileID, string handle);
	event VerificationLevelChanged(uint256 indexed profileID, uint8 level);
	event AddressChange(address contractAddress);

	// We need to pass the name of our NFTs token and its symbol.
	constructor() ERC721("RefoundUser", "FOUNDU") {
		profiles = 0;
	}

	function changeUserVerificationLevel(uint256 profileID, uint8 level) external onlyOwner {
		userVerificationLevel[profileID] = verificationLevel(level);

		emit VerificationLevelChanged(profileID, level);
	}

	function changeAddresses(address _postContract) external onlyOwner {
		postContract = RefoundPost(_postContract);

		emit AddressChange(_postContract);
	}

	function makeRefoundProfile(string memory handle, string memory profileData) public {
		require(bytes(handle).length < 200, "handle too long");
		require(
			ProfileIDByHandle[keccak256(abi.encode(handle))] == 0,
			"handle taken by another user"
		);
		require(balanceOf(msg.sender) == 0, "A profile already exists for this wallet");

		// Get the current tokenId, this starts at 0.
		uint256 profileID = profiles++;

		ProfileIDByHandle[keccak256(abi.encode(handle))] = profileID;

		string memory tokenURI = string(
			abi.encodePacked('{"handle": "', handle, '", "profileData": ', profileData, "}")
		);

		_safeMint(msg.sender, profileID);

		// Set the NFTs data.
		_setTokenURI(profileID, tokenURI);

		emit ProfileCreated(msg.sender, profileID, handle);
	}

	function updateRefoundProfile(
		uint256 profileID,
		string memory handle,
		string memory profileData
	) public {
		require(
			this.ownerOf(profileID) == msg.sender,
			"only the token holder can update the token"
		);
		require(bytes(handle).length < 200, "handle too long");
		require(
			ProfileIDByHandle[keccak256(abi.encode(handle))] == 0,
			"handle taken by another user"
		);

		ProfileIDByHandle[keccak256(abi.encode(handle))] = profileID; //for testing only

		string memory tokenURI = string(
			abi.encodePacked('{"handle": "', handle, '", "profileData": ', profileData, "}")
		);

		_setTokenURI(profileID, tokenURI);

		emit ProfileUpdated(msg.sender, profileID, handle);
	}

	function makeRefoundPost(uint256 profileID, string memory postData) public {
		require(
			ownerOf(profileID) == msg.sender,
			"you need to own a profile to make a post from it"
		);
		uint256 postID = postContract.makeRefoundPost(profileID, postData, msg.sender);

		emit PostCreated(msg.sender, profileID, postID);
	}

	//--------------------------------------------------------------------------

	//using Counters for Counters.Counter;
	//Counters.Counter private _tokenIds;

	function getProfileIDByHandle(string memory handle) public view returns (uint256) {
		//for testing only
		bytes32 h = keccak256(abi.encode(handle));
		return ProfileIDByHandle[h];
	}
}
