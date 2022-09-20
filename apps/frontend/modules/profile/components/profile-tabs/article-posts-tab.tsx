import { useProfile } from "@modules/profile/hooks/use-profile";
import { useEffect } from "react";

export const ArticlePostsTab = () => {
	const { loadArticlePosts, articlePosts, articlePostsLoadingState } = useProfile();

	useEffect(() => {
		loadArticlePosts();
	}, []);

	return (
		<section>
			{articlePosts &&
				articlePosts.map((post) => (
					<article key={post.postId} className="overflow-hidden artboard artboard-demo">
						<div className="w-full whitespace-pre-wrap">
							{JSON.stringify({ articlePosts, articlePostsLoadingState })}
						</div>
					</article>
				))}
		</section>
	);
};
