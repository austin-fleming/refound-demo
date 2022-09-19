import type { Expand } from "@utils/helper-types/expand";
import type { ArticlePost, ImagePost, Post } from "./post.model";
import type { Profile } from "./profile.model";

export type ImagePostAggregate = Expand<{ creator: Profile } & ImagePost>;
export type ArticlePostAggregate = Expand<{ creator: Profile } & ArticlePost>;

export type PostAggregate = ImagePostAggregate | ArticlePostAggregate;
