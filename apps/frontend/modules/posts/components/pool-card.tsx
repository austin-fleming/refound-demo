import type { Pool } from "@modules/api/pools";
import { AccountBadge } from "./account-badge";
import NextImage from "next/image";
import NextLink from "next/link";
import { RankingBadges } from "./ranking-badges";
import { PostCard } from "./post-card/post-card";
import { CardImage } from "./post-card/card-image";
import { CardContent } from "./post-card/card-content";
import { CardTitle } from "./post-card/card-title";
import { CardDescription } from "./post-card/card-description";
import { CardRow } from "./post-card/card-row";
import { CardTimestamp } from "./post-card/card-timestamp";
import { ActionButtons } from "./action-buttons";

export const PoolCard = ({ poolData }: { poolData: Pool }) => (
	<PostCard slug={poolData.slug}>
		<CardRow>
			<AccountBadge creator={poolData.creator} />
			<CardTimestamp date={poolData.creationDate} />
		</CardRow>
		<CardImage src={poolData.coverImage} alt={poolData.description || "placeholder alt"} />
		<CardContent>
			<CardTitle>{poolData.title}</CardTitle>
			{poolData.description && <CardDescription>{poolData.description}</CardDescription>}
		</CardContent>
		<CardRow>
			<RankingBadges postRankings={poolData.ranking} />
			<ActionButtons />
		</CardRow>
	</PostCard>
);
