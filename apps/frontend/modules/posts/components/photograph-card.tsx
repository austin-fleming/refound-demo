import type { Photograph } from "@modules/api/photographs";
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

export const PhotographCard = ({ photoData }: { photoData: Photograph }) => (
	<PostCard slug={photoData.slug}>
		<CardRow>
			<AccountBadge creator={photoData.creator} />
			<CardTimestamp date={photoData.date} />
		</CardRow>
		<CardImage src={photoData.source} alt={photoData.description || "placeholder alt"} />
		<CardContent>
			<CardTitle>{photoData.title}</CardTitle>
			{photoData.description && <CardDescription>{photoData.description}</CardDescription>}
		</CardContent>
		<CardRow>
			<RankingBadges postRankings={photoData.ranking} />
			<ActionButtons />
		</CardRow>
	</PostCard>
);
