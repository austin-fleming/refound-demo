import { useDiscover } from "@modules/discover/state/use-discover/discover.provider";
import NextLink from "next/link";
import { PhotographCard } from "../cards/photograph-card";
import { TabFailed } from "./tab-failed";
import { TabLoading } from "./tab-loading";

export const PhotosTab = () => {
	const { photos } = useDiscover();

	if (photos.loadingState === "LOADING") return <TabLoading />;
	if (photos.loadingState === "FAIL") return <TabFailed />;
	if (photos.loadingState === "SUCCESS")
		return (
			<>
				{photos.content.map((photo) => (
					<PhotographCard key={photo.postId} photoData={photo} />
				))}
			</>
		);

	return null;
};
