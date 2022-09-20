import { LoadingPage } from "@components/loading-page/loading-page";
import { useDiscover } from "@modules/discover/state/use-discover/discover.provider";
import { ProfileCard } from "../cards/profile-card";
import { TabFailed } from "./tab-failed";
import { TabLoading } from "./tab-loading";

export const CreatorsTab = () => {
	const { creators } = useDiscover();

	if (creators.loadingState === "LOADING") return <LoadingPage />;
	if (creators.loadingState === "FAIL") return <TabFailed />;
	if (creators.loadingState === "SUCCESS")
		return (
			<>
				{creators.content.map((creator) => (
					<ProfileCard key={creator.profileId} data={creator} />
				))}
			</>
		);

	return null;
};
