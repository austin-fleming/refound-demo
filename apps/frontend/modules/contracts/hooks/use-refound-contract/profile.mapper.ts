import type { Nullable, Result } from "@utils/monads";
import { result } from "@utils/monads";
import { unixTimestamp } from "@utils/unix-timestamp";
import type { Profile, ProfileContractDSO, ProfileDSO } from "./profile";

// MAPPERS
interface IProfileMapper {
	modelToDso: (model: Profile) => Result<ProfileContractDSO>;
	dsoToModel: (dso: string) => Result<Profile>;
}

export const profileMapper: IProfileMapper = {
	modelToDso: ({ username, avatarUrl, status, bio, address, joinedOn }) => {
		try {
			const dataShape: ProfileDSO = {
				handle: username,
				profileData: {
					avatarUrl: avatarUrl,
					status: status,
					bio: bio,
					address: address, // TODO: optimize this out in the contract fetch
					joinedOn: unixTimestamp.fromDate(joinedOn),
				},
			};
			// NOTE: be 100% sure to stringify or it can break parsing
			return result.ok({
				handle: JSON.stringify(dataShape.handle),
				profileData: JSON.stringify(dataShape.profileData),
			});
		} catch (err) {
			console.error(err);
			return result.fail(new Error("Error occurred when formatting profile to save."));
		}
	},
	dsoToModel: (rawDso) => {
		try {
			if (!rawDso) return result.fail(new Error("Missing profile data"));
			const dso = JSON.parse(rawDso);

			const username = dso.handle;
			if (!username) return result.fail(new Error("Missing username"));

			const profileData = dso?.profileData;
			if (!profileData) return result.fail(new Error("Missing profile data"));

			const avatarUrl = profileData.avatarUrl || "/assets/avatar-placeholder.png";

			const address = profileData.address;
			if (!address) return result.fail(new Error("Missing address"));

			const status = profileData.status || "NONE";
			if (!(status === "NONE" || status === "TRUSTED" || status === "VERIFIED"))
				return result.fail(new Error(`${status} is not a valid status.`));

			const bio = profileData.bio || "";

			const slug = `/u/${username}`;

			const joinedOn = unixTimestamp.toDate(profileData.joinedOn);
			if (!joinedOn)
				return result.fail(new Error(`${joinedOn} is not a valid value for joinedOn`));

			return result.ok({
				type: "Profile",
				username,
				avatarUrl,
				bio,
				status,
				slug,
				address,
				joinedOn,
			});
		} catch (err) {
			console.error(err);
			return result.fail(new Error("Error occurred while parsing profile."));
		}
	},
	/* dsoListToProfiles: (raw: any): Result<Profile[]> =>
	Array.isArray(raw)
		? result.sequence(raw.map(dsoToProfile))
		: result.fail(new Error("Failed to parse account, expected an array.")); */
};
