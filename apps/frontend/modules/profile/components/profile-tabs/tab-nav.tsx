import { useProfile } from "@modules/profile/hooks/use-profile/use-profile";
import { cloin } from "@repo/common/utils/css";

export const TabNav = () => {
	const { currentTab, setCurrentTab } = useProfile();

	return (
		<div className="tabs tabs-boxed">
			<button
				type="button"
				onClick={() => setCurrentTab("IMAGES")}
				className={cloin("tab", currentTab === "IMAGES" && "tab-active")}
			>
				Images
			</button>
			<button
				type="button"
				onClick={() => setCurrentTab("ARTICLES")}
				className={cloin("tab", currentTab === "ARTICLES" && "tab-active")}
			>
				Articles
			</button>
			<button
				type="button"
				onClick={() => setCurrentTab("POOLS")}
				className={cloin("tab", currentTab === "POOLS" && "tab-active")}
			>
				Pools
			</button>
			<button
				type="button"
				onClick={() => setCurrentTab("LIKES")}
				className={cloin("tab", currentTab === "LIKES" && "tab-active")}
			>
				Likes
			</button>
		</div>
	);
};
