import type { PostId } from "./post.model";

export enum LicenseType {
	Outright = "Outright",
	WebLicense = "WebLicense",
	PrintLicense = "PrintLicense",
	SingleUse = "SingleUse",
}

export type License = {
	postId: PostId;
	license: LicenseType;
	purchaseDate: Date;
};
