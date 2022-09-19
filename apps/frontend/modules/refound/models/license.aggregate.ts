import type { Expand } from "@utils/helper-types/expand";
import type { License } from "./license.model";
import type { PostAggregate } from "./post.aggregate";

export type LicenseAggregate = Expand<{ post: PostAggregate } & Omit<License, "postId">>;
