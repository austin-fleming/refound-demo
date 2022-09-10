import type { Account } from "@modules/api/account";
import { accountMocks } from "@modules/api/account.mocks";
import { result, type Result } from "@utils/monads";

interface IAccountApi {
    getAccount: (username: string) => Promise<Result<Account>>
}

const mockAccountApi = (): IAccountApi => ({
    getAccount: async (username) => {
        // await getDataFromOnChain(username)
        return result.ok(accountMocks[0])
    }
})

export const accountApi =  mockAccountApi()