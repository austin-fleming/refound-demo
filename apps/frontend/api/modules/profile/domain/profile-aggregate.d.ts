import type { Profile } from "./profile";
import type { Expand } from "@repo/common/utils/helper-types";
import type { ProfileVerificationLevelTable } from "@repo/common/db/cache/cache-tables";

export enum ProfileVerificationLevel {
	"NONE" = 0,
	"TRUSTED",
	"VERIFIED",
}

export type ProfileAggregate = Profile & Omit<ProfileVerificationLevelTable, "id">;
