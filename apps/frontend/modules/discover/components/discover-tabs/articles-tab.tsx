import { useDiscover } from "@modules/discover/state/use-discover/discover.provider";
import { PhotographCard } from "@modules/posts/components/photograph-card";
import { PostCard } from "@modules/posts/components/post-card/post-card";
import NextLink from "next/link";
import { ArticleCard } from "../cards/article-card";
import { TabFailed } from "./tab-failed";
import { TabLoading } from "./tab-loading";

export const ArticlesTab = () => {
	const { articles } = useDiscover();

	if (articles.loadingState === "LOADING") return <TabLoading />;
	if (articles.loadingState === "FAIL") return <TabFailed />;
	if (articles.loadingState === "SUCCESS")
		return (
			<>
				{articles.content.map((article) => (
					<ArticleCard key={article.postId} data={article} />
				))}
			</>
		);

	return null;
};
