import { result, type Result } from "@utils/monads";
import type { TextPost } from "./text-post";
import { textPostMocks } from "./text-post.mocks";

interface ITextPostService {
	getTextPosts: (username: string) => Promise<Result<TextPost[]>>;
}

const makeInMemoryTextPostService = (): ITextPostService => ({
	getTextPosts: async (username) => {
		const maybeTextPosts = textPostMocks.filter((post) => post.creatorUsername === username);

		if (!maybeTextPosts) return result.fail(new Error("Not Found"));

		return result.ok(maybeTextPosts);
	},
});

export const textPostsService = makeInMemoryTextPostService();
