import { isObject } from "@utils/data-helpers/is-object";
import { isString } from "@utils/data-helpers/is-string";
import type { Result } from "@utils/monads";
import { isNothing } from "@utils/monads";
import { result } from "@utils/monads";
import { unixTimestamp } from "@utils/unix-timestamp";
import type {
	ProfileContractDSO,
	ProfileCreationProperties,
	ProfileDataContractSchema,
} from "../models/profile.dto";
import type { Profile, ProfileOwnerAddress } from "../models/profile.model";
import { ProfileTrustStatus } from "../models/profile.model";
import { ProfileType } from "../models/profile.model";
import { throwFieldError } from "./utils/throw-field-error";

// eslint-disable-next-line sonarjs/cognitive-complexity
const uriToModel = (profileId: string, profileUri: string): Result<Profile> => {
	try {
		const parsedUri = JSON.parse(profileUri);

		if (!parsedUri || !isObject(parsedUri)) throwFieldError("parsedUri");

		// username
		const username = parsedUri.handle;
		if (!username || !isString(username)) throwFieldError("username");

		const profileData = parsedUri.profileData;
		if (!profileData || !isObject(profileData)) throwFieldError("username");

		// avatarUrl
		const avatarUrl = profileData.avatarUrl || "";
		if (!isString(avatarUrl)) throwFieldError("avatarUrl");

		// bio
		const bio = profileData.bio || "";

		// status
		const rawStatus = profileData.status;
		if (!isString(rawStatus) || !(rawStatus in ProfileTrustStatus)) throwFieldError("status");
		const status = ProfileTrustStatus[rawStatus as keyof typeof ProfileTrustStatus];

		// address
		const address = profileData.address;
		if (!address || !isString(address)) throwFieldError("address");

		// joinedOn
		const rawJoinedOn = profileData.joinedOn;
		if (!rawJoinedOn || !isString(rawJoinedOn)) throwFieldError("joinedOn");
		const joinedOn = unixTimestamp
			.toDate(rawJoinedOn)
			.unwrapOrElse(() => throwFieldError("joinedOn"));

		const profile: Profile = {
			type: ProfileType.PROFILE,
			address,
			profileId,
			username,
			avatarUrl,
			bio,
			status,
			slug: `/u/${username}`,
			joinedOn,
		};

		return result.ok(profile);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const creationPropsToContractDso = (
	creatorAddress: ProfileOwnerAddress,
	data: ProfileCreationProperties,
): Result<ProfileContractDSO> => {
	try {
		const address = creatorAddress;
		if (!isString(address) || !address) throwFieldError("address");

		const handle = data.username;
		if (!isString(handle) || !handle) throwFieldError("handle");

		const avatarUrl = data.avatarUrl || "";
		if (!isString(avatarUrl)) throwFieldError("avatarUrl");

		const bio = data.bio || "";
		if (!isString(bio)) throwFieldError("bio");

		const status = ProfileTrustStatus.NONE;

		const joinedOn = unixTimestamp.fromDate(new Date());

		const schema: ProfileDataContractSchema = {
			avatarUrl,
			bio,
			status,
			address,
			joinedOn,
		};

		const dso: ProfileContractDSO = {
			handle,
			profileData: JSON.stringify(schema),
		};

		return result.ok(dso);
	} catch (err) {
		return result.fail(err as Error);
	}
};

export const profileParser = {
	uriToModel,
	creationPropsToContractDso,
};
