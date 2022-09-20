import type { Expand } from "@utils/helper-types/expand";
import type { PostInteractionList } from "./interactions.model";
import type { ArticlePost, ImagePost } from "./post.model";
import type { Profile } from "./profile.model";

export type ImagePostAggregate = Expand<
	{ creator: Profile; interactions: PostInteractionList } & ImagePost
>;
export type ArticlePostAggregate = Expand<
	{ creator: Profile; interactions: PostInteractionList } & ArticlePost
>;

export type PostAggregate = ImagePostAggregate | ArticlePostAggregate;
