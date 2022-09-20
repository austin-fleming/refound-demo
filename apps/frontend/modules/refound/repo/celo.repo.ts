import type { Contract } from "web3-eth-contract";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import type { ProfileOwnerAddress } from "../models/profile.model";
import type { MiniContractKit } from "@celo/contractkit/lib/mini-kit";

const sendBonus = async (
	kit: MiniContractKit,
	payerAddress: ProfileOwnerAddress,
	receiverAddress: ProfileOwnerAddress,
): Promise<Result<true>> => {
	try {
		const cUsdAmount = 1;

		const cUSDContract = await kit.contracts.getStableToken();
		const payerBalance = await cUSDContract.balanceOf(payerAddress);
		console.log({ payerBalance: payerBalance.toString() });

		if (payerBalance.toString() + 0 < cUsdAmount) throw new Error("Insufficient balance");

		await cUSDContract
			.transferFrom(payerAddress, receiverAddress, cUsdAmount)
			.send({ from: payerAddress, feeCurrency: cUSDContract.address });

		return result.ok(true);
	} catch (err) {
		return result.fail(err as Error);
	}
};

export const commands = {
	sendBonus,
};
