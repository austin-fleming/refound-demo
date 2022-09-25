/* eslint-disable typescript-sort-keys/interface */
import type { PostId } from "./post.schema";

enum LicenseType {
	OUTRIGHT = 0,
	WEB_LICENSE,
	PRINT_LICENSE,
	SINGLE_USE,
}

export type LicenseDTO = {
	postId: PostId;
	LType: LicenseType;
};
