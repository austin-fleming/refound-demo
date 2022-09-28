import { cid } from "is-ipfs";

export const extractCID = (
	url: unknown,
): { cid: string; containsCid: true } | { cid: undefined; containsCid: false } => {
	if (typeof url !== "string") {
		throw new TypeError("url is not string");
	}

	const splitUrl = url.split(/\/|\?/);
	for (const split of splitUrl) {
		if (cid(split)) {
			return {
				cid: split,
				containsCid: true,
			};
		}
		const splitOnDot = split.split(".")[0];
		if (cid(splitOnDot)) {
			return {
				cid: splitOnDot,
				containsCid: true,
			};
		}
	}

	return {
		cid: undefined,
		containsCid: false,
	};
};
