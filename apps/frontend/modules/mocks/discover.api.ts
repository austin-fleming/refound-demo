import { result } from "@utils/monads";
import type { Result } from "@utils/monads";
import { photographMocks } from "./photographs.mocks";
import type { Photograph } from "./photographs";
import type { TextPost } from "./text-post";
import type { Pool } from "./pools";
import { poolsMocks } from "./pools.mocks";
import { textPostMocks } from "./text-post.mocks";
import type { Account } from "./account";
import { accountMocks } from "./account.mocks";

export type DiscoverFeedItem = Photograph | TextPost | Pool;

interface IDiscoverService {
	getPopular: () => Promise<Result<Array<DiscoverFeedItem>>>;
	getPhotographs: () => Promise<Result<Photograph[]>>;
	getTextPosts: () => Promise<Result<TextPost[]>>;
	getPools: () => Promise<Result<Pool[]>>;
	getCreators: () => Promise<Result<Account[]>>;
}

const makeInMemoryDiscoverService = (): IDiscoverService => ({
	getPopular: async () => {
		const allContent = [...poolsMocks, ...photographMocks, ...textPostMocks];

		// randomly shuffle mocks
		for (let i = allContent.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = allContent[i];
			allContent[i] = allContent[j];
			allContent[j] = temp;
		}

		return result.ok(allContent);
	},
	getPhotographs: async () => {
		return result.ok(photographMocks)
	},
	getTextPosts: async () => {
		return result.ok(textPostMocks)
	},
	getPools: async () => {
		return result.ok(poolsMocks)
	},
	getCreators: async () => {
		return result.ok(accountMocks)
	}
});

export const discoverService = makeInMemoryDiscoverService();
