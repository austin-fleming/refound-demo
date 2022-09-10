import { PhotographCard } from "@components/photographs/photograph-card";
import { PoolCard } from "@components/pools/pool-card";
import { TextPostCard } from "@components/text-post/text-post-card";
import type { DiscoverFeedItem } from "@modules/api/discover.api";
import { discoverService } from "@modules/api/discover.api";
import type { Photograph } from "@modules/api/photographs";
import { toast } from "@services/toast/toast";
import type { Nullable } from "@utils/monads";
import { useCallback, useEffect, useState } from "react";

export const DiscoverPage = () => {
	const [content, setContent] = useState<Nullable<DiscoverFeedItem[]>>(null);

	const loadContent = useCallback(async () => {
		(await discoverService.getDiscoverItems()).match({
			ok: (items) => setContent(items),
			fail: (err) => {
				console.error(err);
				toast.error("Could not load feed");
			},
		});
	}, []);

	useEffect(() => {
		loadContent();
	}, []);

	return (
		<>
			<nav className="flex flex-row px-contentPadding gap-[1em] text-sm">
				<span>Popular</span>
				<span>Photos</span>
				<span>Articles</span>
				<span>Pools</span>
			</nav>
			<section className="flex flex-col gap-8 px-contentPadding">
				{content ? (
					content.map((item) => {
						if (item.type === "Photograph") return <PhotographCard photoData={item} />;
						if (item.type === "Pool") return <PoolCard poolData={item} />;
						if (item.type === "TextPost") return <TextPostCard data={item} />;

						console.error("No component for item:", item);
						return null;
					})
				) : (
					<div>Loading...</div>
				)}
			</section>
		</>
	);
};
