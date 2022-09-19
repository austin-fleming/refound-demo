import { AccountBadge } from "@modules/posts/components/account-badge";
import { ActionButtons } from "@modules/posts/components/action-buttons";
import { CardContent } from "@modules/posts/components/post-card/card-content";
import { CardDescription } from "@modules/posts/components/post-card/card-description";
import { CardImage } from "@modules/posts/components/post-card/card-image";
import { CardRow } from "@modules/posts/components/post-card/card-row";
import { CardTimestamp } from "@modules/posts/components/post-card/card-timestamp";
import { CardTitle } from "@modules/posts/components/post-card/card-title";
import { PostCard } from "@modules/posts/components/post-card/post-card";
import { RankingBadges } from "@modules/posts/components/ranking-badges";
import type { ArticlePostAggregate } from "@modules/refound/models/post.aggregate";

export const ArticleCard = ({ data }: { data: ArticlePostAggregate }) => (
	<PostCard slug={`/posts/${data.postId}`}>
		<CardRow>
			<AccountBadge creator={data.creator} />
			<CardTimestamp date={data.createdAt} />
		</CardRow>
		{data.coverImage && (
			<CardImage src={data.coverImage?.imageSource} alt={data.title || "placeholder alt"} />
		)}
		<CardContent>
			<CardTitle>{data.title}</CardTitle>
			{/* TODO: need truncation script or summary in data type */}
			{data.body && <CardDescription>{data.body.slice(0, 150)}</CardDescription>}
		</CardContent>
		<CardRow>
			{/* <RankingBadges postRankings={data.ranking} /> */}
			<ActionButtons />
		</CardRow>
	</PostCard>
);
