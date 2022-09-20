import { type Result, result, isNothing } from "@utils/monads";
import type { PostInteraction } from "../models/post.model";

const codeToValueTable: Record<number, PostInteraction> = {
	0: "None",
	1: "UpVote",
	2: "DownVote",
	3: "Report",
};

const valueToCodeTable: Record<PostInteraction, number> = {
	None: 0,
	UpVote: 1,
	DownVote: 2,
	Report: 3,
};

const codeToValue = (code: number): Result<PostInteraction> => {
	const outcome = codeToValueTable[code];

	if (isNothing(outcome)) return result.fail(new Error(`Unknown interaction code: ${code}`));

	return result.ok(outcome);
};

const valueToCode = (value: PostInteraction): Result<number> => {
	const outcome = valueToCodeTable[value];

	if (isNothing(outcome)) return result.fail(new Error(`Unknown interaction value: ${value}`));

	return result.ok(outcome);
};

export const interactionParser = {
	codeToValue,
	valueToCode,
};
