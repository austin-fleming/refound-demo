import { ArticlePostCard } from "@modules/posts/components/article-post/article-post-card";
import { ImagePostCard } from "@modules/posts/components/image-post/image-post-card";
import { PoolCard } from "@modules/posts/components/pool-card";
import { useProfile } from "@modules/profile/hooks/use-profile/use-profile";
import type { ProfilePageContent } from "@modules/profile/views/profile.view";
import { PostType } from "@modules/refound/models/post.model";

export const Tabs = ({
	imagePosts,
	articlePosts,
	pools,
	likes,
}: Omit<ProfilePageContent, "profile">) => {
	const { currentTab } = useProfile();

	return (
		<>
			{currentTab === "IMAGES" &&
				imagePosts.map((post) => <ImagePostCard imagePost={post} key={post.postId} />)}
			{currentTab === "ARTICLES" &&
				articlePosts.map((post) => (
					<ArticlePostCard articlePost={post} key={post.postId} />
				))}
			{currentTab === "POOLS" &&
				(pools.length > 0 ? (
					pools.map((pool) => <PoolCard pool={pool} key={pool.id} />)
				) : (
					<div className="w-full font-bold text-center col-span-full text-slate-400">
						No pools, yet!
					</div>
				))}
			{currentTab === "LIKES" &&
				likes.map((likedPost) => (
					<>
						{likedPost.postType === PostType.IMAGE && (
							<ImagePostCard imagePost={likedPost} key={likedPost.postId} />
						)}
						{likedPost.postType === PostType.ARTICLE && (
							<ArticlePostCard articlePost={likedPost} key={likedPost.postId} />
						)}
					</>
				))}
		</>
	);
};
