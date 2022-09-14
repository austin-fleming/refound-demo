import { result } from "@utils/monads";
import type { Result } from "@utils/monads";
import { photographMocks } from "./photographs.mocks";
import type { Photograph } from "./photographs";

interface IPhotographService {
	getPhotographs: (username: string) => Promise<Result<Photograph[]>>;
}

const makeInMemoryPhotographService = (): IPhotographService => ({
	getPhotographs: async (username) => {
		const maybePhotograph = photographMocks.filter(
			(photo) => photo.creator.username === username,
		);

		if (!maybePhotograph) return result.fail(new Error("Not Found"));

		return result.ok(maybePhotograph);
	},
});

export const photographService = makeInMemoryPhotographService();
