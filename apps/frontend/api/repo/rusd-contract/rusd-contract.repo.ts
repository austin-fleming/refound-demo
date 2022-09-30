import { result } from "@repo/common/utils/monads";
import { config } from "config/config";
import type Web3 from "web3";

export const makeRusdContractRepo = (web3Provider: Web3) => {
	const rusdContract = new web3Provider.eth.Contract(
		config.contracts.rusd.abi,
		config.contracts.rusd.address,
	);

	const deposit = async ({ caller, amount }: { caller: string; amount: number }) =>
		rusdContract.methods
			.deposit(amount)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`deposit failed: ${error}`)));

	const withdraw = async ({ caller, amount }: { caller: string; amount: number }) =>
		rusdContract.methods
			.withdrawal(amount)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`withdraw failed: ${error}`)));

	const setBeneficiary = async ({
		caller,
		beneficiary,
	}: {
		caller: string;
		beneficiary: string;
	}) =>
		rusdContract.methods
			.setBeneficiary(beneficiary)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`setBeneficiary failed: ${error}`)));

	const removeBeneficiary = async ({ caller }: { caller: string }) =>
		rusdContract.methods
			.removeBeneficiary()
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`removeBeneficiary failed: ${error}`)));

	const startBeneficiaryClaimFunds = async ({
		caller,
		accountOwner,
	}: {
		caller: string;
		accountOwner: string;
	}) =>
		rusdContract.methods
			.startBeneficiaryClaimFunds(accountOwner)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) =>
				result.fail(new Error(`startBeneficiaryClaimFunds failed: ${error}`)),
			);

	const beneficiaryClaimFunds = async ({
		caller,
		accountOwner,
	}: {
		caller: string;
		accountOwner: string;
	}) =>
		rusdContract.methods
			.beneficiaryClaimFunds(accountOwner)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) =>
				result.fail(new Error(`beneficiaryClaimFunds failed: ${error}`)),
			);

	const cancelClaim = async ({ caller }: { caller: string }) =>
		rusdContract.methods
			.cancelClaim()
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`cancelClaim failed: ${error}`)));

	const addSubscriptionReceiver = async ({
		caller,
		receiver,
	}: {
		caller: string;
		receiver: string;
	}) =>
		rusdContract.methods
			.addSubscriptionReceiver(receiver)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) =>
				result.fail(new Error(`addSubscriptionReceiver failed: ${error}`)),
			);

	const subscribe = async ({ caller, receiver }: { caller: string; receiver: string }) =>
		rusdContract.methods
			.subscribe(receiver)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`subscribe failed: ${error}`)));

	const unsubscribe = async ({
		caller,
		receiver,
		index,
	}: {
		caller: string;
		receiver: string;
		index: number;
	}) =>
		rusdContract.methods
			.unSubscribe(receiver, index)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`unsubscribe failed: ${error}`)));

	return {
		deposit,
		withdraw,
		setBeneficiary,
		removeBeneficiary,
		startBeneficiaryClaimFunds,
		beneficiaryClaimFunds,
		cancelClaim,
		addSubscriptionReceiver,
		subscribe,
		unsubscribe,
	};
};
