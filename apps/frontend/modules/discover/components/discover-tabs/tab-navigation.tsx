import { useDiscover } from "@modules/discover/state/use-discover/discover.provider";
import { TabButton } from "./tab-button";

export const TabNavigation = () => {
	const { selectTab, photos, articles, creators, pools } = useDiscover();

	return (
		<nav className="fixed left-0 right-0 z-50 w-full text-sm bg-white border-b-2 border-solid shadow top-headerTopHeight border-slate-300">
			<div className="relative bottom-[-2px] flex flex-row gap-[2em] px-contentPadding max-w-screen-md mx-auto w-full">
				<TabButton
					tabName="Photos"
					isActive={photos.isCurrentTab}
					onClick={() => selectTab("photos")}
				/>
				<TabButton
					tabName="Articles"
					isActive={articles.isCurrentTab}
					onClick={() => selectTab("articles")}
				/>
				<TabButton
					tabName="Creators"
					isActive={creators.isCurrentTab}
					onClick={() => selectTab("creators")}
				/>
				<TabButton
					tabName="Pools"
					isActive={pools.isCurrentTab}
					onClick={() => selectTab("pools")}
				/>
			</div>
		</nav>
	);
};
