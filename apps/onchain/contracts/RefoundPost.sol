// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
//import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

enum LicenseType {
	OUTRIGHT,
	WEB_LICENSE,
	PRINT_LICENSE,
	SINGLE_USE
}
enum ContentInteraction {
	NONE,
	UP_VOTE,
	DOWN_VOTE,
	REPORT
}

struct License {
	uint256 postID;
	LicenseType LType;
}

contract RefoundPost is ERC721URIStorage, ERC2981, Ownable {
	IERC20 currency;

	mapping(uint256 => mapping(address => ContentInteraction)) public contentInteractions; //tokenID, interactorAddress to contentInteraction
	mapping(uint8 => uint256) public prices;

	uint256 public posts;
	address public refound;
	mapping(address => License[]) public buyerAddresstoLicense;
	string public contractURI;

	event PostCreated(uint256 profileID, uint256 postID, string metadata);
	event PriceUpdated(uint8 licenseTypeIndex, uint256 price);
	event ContentInteracted(
		address indexed interactor,
		uint256 indexed postID,
		ContentInteraction interactionType
	);
	event LicensePurchased(
		address indexed from,
		address indexed to,
		uint256 indexed postID,
		LicenseType licenseType,
		uint256 amount
	);
	event ContractURIUpdated(string contractURI);

	// We need to pass the name of our NFTs token and its symbol.
	constructor(
		address _refound,
		address _currency,
		string memory _contractURI
	) ERC721("RefoundPost", "FOUNDP") {
		refound = _refound;
		posts = 0;
		currency = IERC20(_currency);
		contractURI = _contractURI;
	}

	function setContractURI(string memory _contractURI) public onlyOwner {
		contractURI = _contractURI;

		emit ContractURIUpdated(_contractURI);
	}

	function updatePrice(uint8 licenseTypeIndex, uint256 price) public onlyOwner {
		prices[licenseTypeIndex] = price;
		emit PriceUpdated(licenseTypeIndex, price);
	}

	// A function our user will hit to get their NFT.
	function makeRefoundPost(
		uint256 profileID,
		string memory postData,
		address postOwner
	) external returns (uint256 _postID) {
		require(msg.sender == refound, "only the refound contract can make a post"); //FIX this and turn into modifier

		// Get the current tokenId, this starts at 0.
		uint256 postID = posts++;

		string memory tokenURI = string(
			abi.encodePacked(
				'{"profileId": ',
				Strings.toString(profileID),
				', "postId": ',
				Strings.toString(postID),
				', "postData": ',
				postData,
				"}"
			)
		);

		_safeMint(postOwner, postID);
		// Set the NFTs data.
		_setTokenURI(postID, tokenURI);

		ownerToPostIDs[postOwner].push(postID); //for testing only

		emit PostCreated(profileID, postID, tokenURI);

		return postID;
	}

	function interactWithContent(uint256 postID, uint8 interactionType) public {
		require(interactionType != 0);
		if (contentInteractions[postID][msg.sender] != ContentInteraction(0)) {
			contentInteractionAddresses[postID].push(msg.sender);
		}
		contentInteractions[postID][msg.sender] = ContentInteraction(interactionType);

		emit ContentInteracted(msg.sender, postID, ContentInteraction(interactionType));
	}

	function purchaseLicense(uint256 postID, uint8 licenseType) public {
		currency.transferFrom(msg.sender, ownerOf(postID), prices[licenseType]);
		buyerAddresstoLicense[msg.sender].push(License(postID, LicenseType(licenseType)));

		emit LicensePurchased(
			msg.sender,
			ownerOf(postID),
			postID,
			LicenseType(licenseType),
			prices[licenseType]
		);
	}

	//-------------------------------------------------------------------------------------

	function supportsInterface(bytes4 interfaceId)
		public
		view
		virtual
		override(ERC721, ERC2981)
		returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}

	//using Counters for Counters.Counter;
	//Counters.Counter private _tokenIds;

	mapping(address => uint256[]) public ownerToPostIDs; //for testing only
	mapping(uint256 => address[]) public contentInteractionAddresses; //for testing only
}
