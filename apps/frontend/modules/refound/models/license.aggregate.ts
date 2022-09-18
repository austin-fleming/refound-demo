import type { Expand } from "@utils/helper-types/expand";
import type { License } from "./license.model";
import type { Post } from "./post.model";

export type LicenseAggregate = Expand<{ post: Post } & License>;
