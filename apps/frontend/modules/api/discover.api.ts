import { result } from "@utils/monads";
import type { Result } from "@utils/monads";
import { photographMocks } from "./photographs.mocks";
import type { Photograph } from "./photographs";
import type { TextPost } from "./text-post";
import type { Pool } from "./pools";
import { poolsMocks } from "./pools.mocks";
import { textPostMocks } from "./text-post.mocks";

export type DiscoverFeedItem = Photograph | TextPost | Pool;

interface IDiscoverService {
	getDiscoverItems: () => Promise<Result<Array<DiscoverFeedItem>>>;
}

const makeInMemoryDiscoverService = (): IDiscoverService => ({
	getDiscoverItems: async () => {
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
});

export const discoverService = makeInMemoryDiscoverService();
