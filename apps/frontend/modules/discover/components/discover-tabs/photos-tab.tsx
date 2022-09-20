import { LoadingPage } from "@components/loading-page/loading-page";
import { useDiscover } from "@modules/discover/state/use-discover/discover.provider";
import { ImagePostCard } from "@modules/posts/components/image-post/image-post-card";
import NextLink from "next/link";
import { PhotographCard } from "../cards/photograph-card";
import { TabFailed } from "./tab-failed";
import { TabLoading } from "./tab-loading";

export const PhotosTab = () => {
	const { photos } = useDiscover();

	if (photos.loadingState === "LOADING") return <LoadingPage />;
	if (photos.loadingState === "FAIL") return <TabFailed />;
	if (photos.loadingState === "SUCCESS")
		return (
			<>
				{photos.content.map((post) => (
					<ImagePostCard key={post.postId} imagePost={post} />
				))}
			</>
		);

	return null;
};
