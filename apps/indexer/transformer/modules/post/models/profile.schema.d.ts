/* eslint-disable typescript-sort-keys/interface */

type ProfileHandle = string;
type AvatarUrl = string;

export type ProfileMetadataSchema = {
	name: ProfileHandle;
	description: string;
	image: AvatarUrl;
	attributes: Array<{
		trait_type: string;
		value: string | number;
	}>;
};
