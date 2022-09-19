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
import type { ImagePostAggregate } from "@modules/refound/models/post.aggregate";

export const PhotographCard = ({ photoData }: { photoData: ImagePostAggregate }) => (
	<PostCard slug={`/posts/${photoData.postId}`}>
		<CardRow>
			<AccountBadge creator={photoData.creator} />
			{photoData.createdAt && <CardTimestamp date={photoData.createdAt} />}
		</CardRow>
		<CardImage src={photoData.imageSource} alt={photoData.title || "placeholder alt"} />
		<CardContent>
			<CardTitle>{photoData.title}</CardTitle>
			{photoData.description && <CardDescription>{photoData.description}</CardDescription>}
		</CardContent>
		<CardRow>
			{/* <RankingBadges postRankings={photoData.} /> */}
			<ActionButtons />
		</CardRow>
	</PostCard>
);
