import type { ProfileAggregate } from "@api/modules/profile/domain/profile-aggregate";
import type { Expand } from "@repo/common/utils/helper-types";

export type AccountAggregate = Expand<
	ProfileAggregate & {
		cUsdBalance: number;
		rUsdBalance: number;
		claimPlaced: boolean;
	}
>;
