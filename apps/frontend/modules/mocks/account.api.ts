import { option, result } from "@utils/monads";
import type { Result, Option } from "@utils/monads";
import type { Account } from "./account";
import { accountMocks } from "./account.mocks";

interface IAccountService {
	getAccount: (walletAddress: string) => Promise<Result<Option<Account>>>;
}

const makeInMemoryAccountService = (): IAccountService => ({
	getAccount: async (walletAddress) => {
		try {
			const maybeAccount = option.fromNullable(
				accountMocks.find((value) => value.walletAddress === walletAddress),
			);
			return result.ok(maybeAccount);
		} catch (e) {
			console.error(e);
			return result.fail(new Error("Failed to get account"));
		}
	},
});

export const accountService = makeInMemoryAccountService();
