import type { TextPost } from "@modules/mocks/text-post";
import NextLink from "next/link";
import { AccountBadge } from "./account-badge";
import { ActionButtons } from "./action-buttons";
import { CardContent } from "./post-card/card-content";
import { CardDescription } from "./post-card/card-description";
import { CardImage } from "./post-card/card-image";
import { CardRow } from "./post-card/card-row";
import { CardTimestamp } from "./post-card/card-timestamp";
import { CardTitle } from "./post-card/card-title";
import { PostCard } from "./post-card/post-card";
import { RankingBadges } from "./ranking-badges";

export const TextPostCard = ({ data }: { data: TextPost }) => (
	<PostCard slug={data.slug}>
		<CardRow>
			<AccountBadge creator={data.creator} />
			<CardTimestamp date={data.date} />
		</CardRow>
		{data.coverImage && (
			<CardImage src={data.coverImage} alt={data.title || "placeholder alt"} />
		)}
		<CardContent>
			<CardTitle>{data.title}</CardTitle>
			{/* TODO: need truncation script or summary in data type */}
			{data.body && <CardDescription>{data.body.slice(0, 150)}</CardDescription>}
		</CardContent>
		<CardRow>
			<RankingBadges postRankings={data.ranking} />
			<ActionButtons />
		</CardRow>
	</PostCard>
);
