import type { Result } from "@repo/common/utils/monads";
import { result } from "@repo/common/utils/monads";
import { config } from "config/config";
import type Web3 from "web3";

export const makeCoreContractRepo = (web3Provider: Web3) => {
	const coreContract = new web3Provider.eth.Contract(
		config.contracts.core.abi,
		config.contracts.core.address,
	);

	const makeRefoundProfile = async ({
		callerAddress,
		handle,
		profileData,
	}: {
		callerAddress: string;
		handle: string;
		profileData: string;
	}): Promise<Result<true>> =>
		coreContract.methods
			.makeRefoundProfile(handle, profileData)
			.send({ from: callerAddress })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`makeRefoundProfile failed: ${error}`)));

	const updateRefoundProfile = async ({
		callerAddress,
		profileId,
		handle,
		profileData,
	}: {
		callerAddress: string;
		profileId: number;
		handle: string;
		profileData: string;
	}): Promise<Result<true>> =>
		coreContract.methods
			.updateRefoundProfile(profileId, handle, profileData)
			.send({ from: callerAddress })
			.then(() => result.ok(true))
			.catch((error: Error) =>
				result.fail(new Error(`updateRefoundProfile failed: ${error}`)),
			);

	const makeRefoundPost = async ({
		callerAddress,
		profileId,
		postData,
	}: {
		callerAddress: string;
		profileId: number;
		postData: string;
	}): Promise<Result<true>> =>
		coreContract.methods
			.makeRefoundPost(profileId, postData)
			.send({ from: callerAddress })
			.then(() => result.ok(true))
			.catch((error: Error) => result.fail(new Error(`makeRefoundPost failed: ${error}`)));

	const changeUserVerificationLevel = async ({
		callerAddress,
		profileId,
		level,
	}: {
		callerAddress: string;
		profileId: number;
		level: number;
	}): Promise<Result<true>> =>
		coreContract.methods
			.changeUserVerificationLevel(profileId, level)
			.send({ from: callerAddress })
			.then(() => result.ok(true))
			.catch((error: Error) =>
				result.fail(new Error(`changeUserVerificationLevel failed: ${error}`)),
			);

	return {
		makeRefoundProfile,
		updateRefoundProfile,
		makeRefoundPost,
		changeUserVerificationLevel,
	};
};

export type CoreContractRepo = ReturnType<typeof makeCoreContractRepo>;
