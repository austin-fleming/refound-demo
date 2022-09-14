import type { AbiItem } from "web3-utils";

export const refoundAbi: AbiItem[] = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address",
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool",
			},
		],
		name: "ApprovalForAll",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_postContract",
				type: "address",
			},
		],
		name: "changeAddresses",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getAllRefoundProfiles",
		outputs: [
			{
				internalType: "string[]",
				name: "",
				type: "string[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "getApproved",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "getRefoundProfile",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				internalType: "address",
				name: "operator",
				type: "address",
			},
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "profileID",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "postData",
				type: "string",
			},
		],
		name: "makeRefoundPost",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "handle",
				type: "string",
			},
			{
				internalType: "string",
				name: "profileData",
				type: "string",
			},
		],
		name: "makeRefoundProfile",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "ownerOf",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "postContract",
		outputs: [
			{
				internalType: "contract RefoundPost",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "profiles",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "profilesByWallet",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes",
			},
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address",
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool",
			},
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4",
			},
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "tokenURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "handle",
				type: "string",
			},
			{
				internalType: "string",
				name: "profileData",
				type: "string",
			},
		],
		name: "updateRefoundProfile",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
];
