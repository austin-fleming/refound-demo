// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.10;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
// We need to import the helper functions from the contract that we copy/pasted.

enum LicenseType{Outright, WebLicense, PrintLicense, SingleUse}

struct License{
    //string owner;
    uint256 postID;
    LicenseType Ltype;
    uint256 purchaseDate;
}

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract RefoundPost is ERC721URIStorage {
    // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
    //using Counters for Counters.Counter;
    //Counters.Counter private _tokenIds;

    mapping(uint8 => uint256) prices;

    address public owner;
    uint256 public posts;
    address public refound;

    mapping(address => License[]) buyerAddresstoLicense;

    // NOTE: For testing only. Remove in prod
    mapping(uint256 => uint256[]) creatorIdToPostIds;

    // We need to pass the name of our NFTs token and its symbol.
    constructor(address _refound) ERC721 ("RefoundPost", "FOUNDP") {
        owner == msg.sender;
        refound = _refound;
        posts = 0;
        console.log('owner: ', msg.sender);
    }

    function updatePrice(uint8 index, uint256 price) public {//FIX needs modifer 
        //require(msg.sender == owner, 'only owner');//FIX make modifer
        console.log('address of caller: ', msg.sender);
        prices[index] = price;
    }

    /*
    function getPrices() public view returns(uint256[] memory){
        return prices;
    }
    */

    function getLicensesByAddress(address user) public view returns(License[] memory) {
        return buyerAddresstoLicense[user];
    }

    // A function our user will hit to get their NFT.
    function makeRefoundPost(uint256 profileID, string memory postData, address postOwner/*, uint8 LicenseType*/) external returns(uint256){
        require(msg.sender == refound, "only the refound contract can make a post");//FIX this and turn into modifier

        // Get the current tokenId, this starts at 0.
        uint256 postID = posts++;

        string memory tokenURI = string(
            abi.encodePacked(
                '{"posterId": ',
                Strings.toString(profileID),
                ', "postId": ',
                Strings.toString(postID),
                ', "postData": ',
                postData,
                ', "createdAt": ',
                Strings.toString(block.timestamp),
                '}'
            )
        );
        
        _safeMint(postOwner, postID);

        // Set the NFTs data.
        _setTokenURI(profileID, tokenURI);
        console.log("minted post NFT", postID, postOwner, tokenURI);

        // NOTE: For testing only. Remove in prod
        creatorIdToPostIds[profileID].push(postID);

        return postID;
    }

    function purchaseLicense(/*string memory _owner, */ uint256 postID, uint8 licenseType) public {

        //FIX add payment
        buyerAddresstoLicense[msg.sender].push(License(/*_owner, */postID, LicenseType(licenseType), block.timestamp));
    }

    // NOTE: For testing only. Remove in prod
    function getPostsByCreator(uint256 profileID) external view returns(string[] memory) {
        string[] memory postList = new string[](creatorIdToPostIds[profileID].length);

        for(uint256 i = 0; i < creatorIdToPostIds[profileID].length; i++) {
            postList[i] = tokenURI(creatorIdToPostIds[profileID][i]);
        }

        return postList;
    }

    // NOTE: for testing only. Remove in prod
    function getAllPosts() public view returns (string[] memory) {
        string[] memory postList = new string[](posts);
        for(uint256 i = 0; i < posts; i++) {
            postList[i] = tokenURI(i);
        }
        return postList;
    }
}