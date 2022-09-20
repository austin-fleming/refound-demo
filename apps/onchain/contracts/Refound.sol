// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
import "contracts/RefoundPost.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

enum verificationLevel{None, Trusted, Verified}

contract Refound is ERC721URIStorage, Ownable {
    
    uint256 public profiles;
    RefoundPost public postContract;

    mapping(uint256 => verificationLevel) userVerificationLevel;

    event madeProfile(uint256 profileID, string handle);

    // We need to pass the name of our NFTs token and its symbol.
    constructor() ERC721 ("RefoundUser", "FOUNDU") {
        profiles = 0;
    }

    function changeUserVerificationLevel(uint256 profileID, uint8 level) external onlyOwner() {
        userVerificationLevel[profileID] = verificationLevel(level);
    }

    function changeAddresses(address _postContract) external onlyOwner() {
        postContract = RefoundPost(_postContract);
    }

    function makeRefoundProfile(string memory handle, string memory profileData) public {
        require(bytes(handle).length < 200, "handle to long");
        // Get the current tokenId, this starts at 0.
        uint256 profileID = profiles++;

        UserIdbyHandle[keccak256(abi.encode(handle))] = profileID;//for testing only
        
        string memory tokenURI = string(
            abi.encodePacked(
                '{"Handle": ',
                handle,
                ', "ProfileData": ',
                profileData,
                '}'
            )
        );
        
        _safeMint(msg.sender, profileID);

        // Set the NFTs data.
        _setTokenURI(profileID, tokenURI);
        emit madeProfile(profileID, handle);
    }

    function makeRefoundPost(uint256 profileID, string memory postData) public {
        require(ownerOf(profileID) == msg.sender, 'you need two own a profile to make a post from it');
        postContract.makeRefoundPost(profileID, postData, msg.sender);
    }

    //--------------------------------------------------------------------------

    //using Counters for Counters.Counter;
    //Counters.Counter private _tokenIds;
    
    mapping(bytes32 => uint256) UserIdbyHandle;//for testing only

    function getUserIdbyHandle(string memory handle) public view returns(uint256){//for testing only
        bytes32 h = keccak256(abi.encode(handle));
        return UserIdbyHandle[h];
    }
}