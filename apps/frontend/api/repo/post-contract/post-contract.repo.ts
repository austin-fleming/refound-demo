import { result } from "@repo/common/utils/monads";
import { config } from "config/config";
import type Web3 from "web3";

export const makePostContractRepo = (web3Provider: Web3) => {
	const postContract = new web3Provider.eth.Contract(
		config.contracts.post.abi,
		config.contracts.post.address,
	);

	const setContractUri = async ({
		caller,
		contractUri,
	}: {
		caller: string;
		contractUri: string;
	}) =>
		postContract.methods
			.setContractURI(contractUri)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`setContractUri failed: ${error}`)));

	const updatePrice = async ({
		caller,
		licenseTypeIndex,
		price,
	}: {
		caller: string;
		licenseTypeIndex: number;
		price: number;
	}) =>
		postContract.methods
			.updatePrice(licenseTypeIndex, price)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`updatePrice failed: ${error}`)));

	const interactWithContent = async ({
		caller,
		postId,
		interactionType,
	}: {
		caller: string;
		postId: number;
		interactionType: number;
	}) =>
		postContract.methods
			.interactWithContent(postId, interactionType)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) =>
				result.fail(new Error(`interactWithContent failed: ${error}`)),
			);

	const purchaseLicense = async ({
		caller,
		postId,
		licenseType,
	}: {
		caller: string;
		postId: number;
		licenseType: number;
	}) =>
		postContract.methods
			.purchaseLicense(postId, licenseType)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`purchaseLicense failed: ${error}`)));

	return {
		setContractUri,
		updatePrice,
		interactWithContent,
		purchaseLicense,
	};
};
