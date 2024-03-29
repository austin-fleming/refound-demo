import { LoadingPage } from "@components/loading-page/loading-page";
import { useDiscover } from "@modules/discover/state/use-discover/discover.provider";
import { ArticlePostCard } from "@modules/posts/components/article-post/article-post-card";
import { PhotographCard } from "@modules/posts/components/photograph-card";
import { PostCard } from "@modules/posts/components/post-card/post-card";
import NextLink from "next/link";
import { ArticleCard } from "../cards/article-card";
import { TabFailed } from "./tab-failed";
import { TabLoading } from "./tab-loading";

export const ArticlesTab = () => {
	const { articles } = useDiscover();

	if (articles.loadingState === "LOADING") return <LoadingPage />;
	if (articles.loadingState === "FAIL") return <TabFailed />;
	if (articles.loadingState === "SUCCESS")
		return (
			<>
				{articles.content.map((article) => (
					<ArticlePostCard key={article.postId} articlePost={article} />
				))}
			</>
		);

	return null;
};
