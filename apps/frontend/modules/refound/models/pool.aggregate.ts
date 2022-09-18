import type { Expand } from "@utils/helper-types/expand";
import type { Pool } from "./pool.model";
import type { Profile } from "./profile.model";

export type PoolAggregate = Expand<{ creator: Profile } & Omit<Pool, "creatorAddress">>;
