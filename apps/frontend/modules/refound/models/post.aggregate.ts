import type { Expand } from "@utils/helper-types/expand";
import type { Post } from "./post.model";
import type { Profile } from "./profile.model";

export type PostAggregate = Expand<{ creator: Profile } & Post>;
