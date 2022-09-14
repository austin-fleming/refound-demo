import type { Account } from "@modules/api/account";
import { CardContent } from "@modules/posts/components/post-card/card-content";
import { CardDescription } from "@modules/posts/components/post-card/card-description";
import { CardImage } from "@modules/posts/components/post-card/card-image";
import { CardTitle } from "@modules/posts/components/post-card/card-title";
import { PostCard } from "@modules/posts/components/post-card/post-card";

export const ProfileCard = ({ data }: { data: Account }) => (
	<PostCard slug={data.slug}>
		<CardImage src={data.avatarUrl || "/assets"} alt={data.username} />
		<CardContent>
			<CardTitle>@{data.username}</CardTitle>
			{<CardDescription />}
		</CardContent>
	</PostCard>
);
