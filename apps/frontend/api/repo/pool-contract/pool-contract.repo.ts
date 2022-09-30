import { result } from "@repo/common/utils/monads";
import { config } from "config/config";
import type Web3 from "web3";

export const makePoolContractRepo = (web3Provider: Web3) => {
	const poolContract = new web3Provider.eth.Contract(
		config.contracts.pool.abi,
		config.contracts.pool.address,
	);

	const launch = async ({
		caller,
		goal,
		title,
		description,
		imageLink,
		startAt,
		endAt,
	}: {
		caller: string;
		goal: number;
		title: string;
		description: string;
		imageLink: string;
		startAt: number;
		endAt: number;
	}) =>
		poolContract.methods
			.launch(goal, title, description, imageLink, startAt, endAt)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`launch failed: ${error}`)));

	const cancel = async ({ caller, poolId }: { caller: string; poolId: number }) =>
		poolContract.methods
			.cancel(poolId)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`cancel failed: ${error}`)));

	const pledge = async ({
		caller,
		poolId,
		amount,
	}: {
		caller: string;
		poolId: number;
		amount: number;
	}) =>
		poolContract.methods
			.pledge(poolId, amount)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`pledge failed: ${error}`)));

	const unPledge = async ({
		caller,
		poolId,
		amount,
	}: {
		caller: string;
		poolId: number;
		amount: number;
	}) =>
		poolContract.methods
			.unPledge(poolId, amount)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`unPledge failed: ${error}`)));

	const claim = async ({ caller, poolId }: { caller: string; poolId: number }) =>
		poolContract.methods
			.claim(poolId)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`claim failed: ${error}`)));

	const refund = async ({ caller, poolId }: { caller: string; poolId: number }) =>
		poolContract.methods
			.refund(poolId)
			.send({ from: caller })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`refund failed: ${error}`)));

	return {
		launch,
		cancel,
		pledge,
		unPledge,
		claim,
		refund,
	};
};
