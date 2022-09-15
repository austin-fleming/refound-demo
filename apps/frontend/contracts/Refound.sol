// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.10;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
import "contracts/RefoundPost.sol";

contract Refound is ERC721URIStorage {

    uint256 public profiles;
    address public owner;
    RefoundPost public postContract;
    // NOTE: for testing only. Remove in prod
    mapping(address => uint256) public profilesByWallet;

    // We need to pass the name of our NFTs token and its symbol.
    constructor() ERC721 ("RefoundUser", "FOUNDU") {
        profiles = 0;
        owner = msg.sender;
    }

    // NOTE: for testing only. Remove in prod
    function guardMultipleProfiles(address wallet) internal view {
        require(profilesByWallet[wallet] == 0, "An account already exists for this wallet.");
    }

    function changeAddresses(address _postContract/*, address _mediaData*/) external {
        require(owner == msg.sender, "only the contract owner can call this function");//FIX make modifer
        postContract = RefoundPost(_postContract);
    }

    // TODO: currently user can set their own validity status
    function makeRefoundProfile(string memory handle, string memory profileData) public returns(uint256 _profileId){
        // NOTE: for testing only. Remove in prod
        guardMultipleProfiles(msg.sender);
        require(bytes(handle).length < 200, "handle to long");
        // Get the current tokenId, this starts at 0.
        uint256 profileID = profiles++;
        
        string memory tokenURI = string(
            abi.encodePacked(
                '{"handle": "',
                handle,
                '", "profileData": ',
                profileData,
                '}'
            )
        );
        
        _safeMint(msg.sender, profileID);

        // Set the NFTs data.
        _setTokenURI(profileID, tokenURI);
        // NOTE: for testing only. Remove in prod
        profilesByWallet[msg.sender] = profileID;
        return profileID;
    }

    // NOTE: for testing only. Remove in prod
    function updateRefoundProfile(string memory handle, string memory profileData) public returns(uint256 profileId) {
        require(profilesByWallet[msg.sender] != 0, "No profile exists for this address");
        require(bytes(handle).length < 200, "handle to long");

        string memory tokenURI = string(
            abi.encodePacked(
                '{"handle": "',
                handle,
                '", "profileData": ',
                profileData,
                '}'
            )
        );

        _setTokenURI(profilesByWallet[msg.sender], tokenURI);
        return profilesByWallet[msg.sender];
    }

    // NOTE: for testing only. Remove in prod
    function getRefoundProfile(address account) public view returns (bool _profileExists, string memory _profileUri, uint256 _profileId) {
        uint256 profileId = profilesByWallet[account];

        if (profileId == 0) {
            return (false, '', 0);
        }

        return (true, tokenURI(profilesByWallet[account]), profilesByWallet[account]);
    }

    // NOTE: for testing only. Remove in prod
    function getAllRefoundProfiles() public view returns (string[] memory) {
        string[] memory profileList = new string[](profiles);
        for(uint256 i = 0; i < profiles; i++) {
            profileList[i] = tokenURI(i);
        }
        return profileList;
    }

    function makeRefoundPost(uint256 profileID, string memory postData) public returns(uint256 _postId){
        require(this.ownerOf(profileID) == msg.sender, 'you need to own a profile to make a post from it');
        return postContract.makeRefoundPost(profileID, postData, msg.sender);//FIX how does this contract know what the others address is?
    }
}