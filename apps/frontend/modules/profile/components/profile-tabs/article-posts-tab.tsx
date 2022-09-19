import { useProfile } from "@modules/profile/hooks/use-profile";
import { useEffect } from "react";

export const ArticlePostsTab = () => {
	const { loadArticlePosts, articlePosts, articlePostsLoadingState } = useProfile();

	useEffect(() => {
		loadArticlePosts();
	}, []);

	return (
		<section>
			<pre>{JSON.stringify({ articlePosts, articlePostsLoadingState })}</pre>
		</section>
	);
};
