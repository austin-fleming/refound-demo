import type { Nullable, Result } from "@utils/monads";
import { result } from "@utils/monads";
import type { Contract } from "web3-eth-contract";
import type { Post, PostId } from "../../use-storage/schema";
import { postMapper } from "../post.mapper";
import { buildPost } from "./build-post";

export const makeGetPost =
	(contract: Nullable<Contract>) =>
	async (postId: PostId): Promise<Result<Post>> => {
		if (!contract) {
			console.warn("Must connect to contract before getting post.");
			return result.fail(new Error("Not connected"));
		}

		try {
			const maybeDto = contract.methods.tokenURI(postId).call();
			if (!maybeDto) {
				throw new Error(`Contract returned no post for postId "${postId}"`);
			}

			const dto = postMapper.rawDtoToDto(postId, maybeDto).unwrapOrElse((err) => {
				throw err;
			});

			console.log({ dto });

			const postResult = await buildPost(contract)(dto);
			return result.ok(
				postResult.unwrapOrElse((err) => {
					throw err;
				}),
			);
		} catch (err) {
			console.error(`Error for postId "${postId}"`, err);
			return result.fail(err as Error);
		}
	};
