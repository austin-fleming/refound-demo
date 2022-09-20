import type { NextPage } from "next";
import { ArticlesTab } from "../components/discover-tabs/articles-tab";
import { CreatorsTab } from "../components/discover-tabs/creators-tab";
import { PhotosTab } from "../components/discover-tabs/photos-tab";
import { PoolsTab } from "../components/discover-tabs/pools-tab";
import { TabNavigation } from "../components/discover-tabs/tab-navigation";
import { DiscoverContextProvider, useDiscover } from "../state/use-discover/discover.provider";

const Inner = () => {
	const { articles, photos, pools, creators } = useDiscover();
	return (
		<section className="flex flex-col w-full px-contentPadding max-w-screen-lg mx-auto min-h-[101vh]">
			<TabNavigation />
			<div className="grid grid-cols-1 gap-4 py-24 md:grid-cols-3">
				{photos.isCurrentTab && <PhotosTab />}
				{articles.isCurrentTab && <ArticlesTab />}
				{creators.isCurrentTab && <CreatorsTab />}
				{pools.isCurrentTab && <PoolsTab />}
			</div>
		</section>
	);
};

export const DiscoverView: NextPage = () => {
	return (
		<DiscoverContextProvider>
			<Inner />
		</DiscoverContextProvider>
	);
};
