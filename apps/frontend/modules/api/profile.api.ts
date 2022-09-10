import { result, type Result } from "@utils/monads";
import type { Account } from "./account";
import { accountMocks } from "./account.mocks";

interface IProfileService {
	getProfile: (username: string) => Promise<Result<Account>>;
}

const makeInMemoryProfileService = (): IProfileService => ({
	getProfile: async (username) => {
		const maybeProfile = accountMocks.find((account) => account.username === username);

		if (!maybeProfile) return result.fail(new Error("Not Found"));

		return result.ok(maybeProfile);
	},
});

export const profileService = makeInMemoryProfileService();
