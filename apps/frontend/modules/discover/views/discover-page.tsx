import { PhotographCard } from "@modules/posts/components/photograph-card";
import { PoolCard } from "@modules/posts/components/pool-card";
import { TextPostCard } from "@modules/posts/components/text-post-card";
import type { DiscoverFeedItem } from "@modules/api/discover.api";
import { discoverService } from "@modules/api/discover.api";
import type { Photograph } from "@modules/api/photographs";
import { toast } from "@services/toast/toast";
import type { Nullable } from "@utils/monads";
import {useCallback, useEffect, useState } from "react";
import type { TextPost } from "@modules/api/text-post";
import type { Pool } from "@modules/api/pools";
import type { Account } from "@modules/api/account";
import { AccountCard } from "@modules/account/components/account-card";


type Tabs = 'Popular' | 'Photos' | 'Articles' | 'Pools' | 'Creators'
type ContentType = DiscoverFeedItem | Photograph | TextPost | Pool | Account

const Tab = ({tabName}:{tabName: Tabs}) => {
	const [content, setContent] = useState<Nullable<ContentType[]>>(null);

	const loadContent = useCallback(async () => {
		let content;

		if (tabName === 'Popular') {content = await discoverService.getPopular()}
		if (tabName === 'Photos') {content = await discoverService.getPhotographs()}
		if (tabName === 'Articles') {content = await discoverService.getTextPosts()}
		if (tabName === 'Pools') {content = await discoverService.getPools()}
		if (tabName === 'Creators') {content = await discoverService.getCreators()}

		if (!content) {
			console.error(`Tab ${tabName} does not exist.`)
			toast.error("Could not load feed")
			return
		}

		content.match({
			ok: (items) => setContent(items),
			fail: (err) => {
				console.error(err);
				toast.error("Could not load feed");
			},
		});
	}, [tabName]);

	useEffect(() => {
		loadContent();
	}, [tabName]);

	return <section className="flex flex-col gap-8 p-contentPadding">{content ? (
		content.map((item) => {
			if (item.type === "Photograph") return <PhotographCard photoData={item} />;
			if (item.type === "Pool") return <PoolCard poolData={item} />;
			if (item.type === "TextPost") return <TextPostCard data={item} />;
			if (item.type === 'Account') return <AccountCard data={item}/>;

			console.error("No component for item:", item);
			return null;
		})
	) : (
		<div>Loading...</div>
	)}</section>
}

const TabButton = ({tabName, currentTab, setCurrentTab}:{tabName:Tabs, currentTab:Tabs, setCurrentTab:(tab:Tabs) => void}) => {
	return <button className={`text-sm border-b-2 border-solid ${tabName === currentTab ? 'border-black' : 'border-transparent'}`} type='button' onClick={() => setCurrentTab(tabName)}>{tabName}</button>
}

export const DiscoverPage = () => {
	const [currentTab, setCurrentTab] = useState<Tabs>('Popular')

	return (
		<>
			<nav className="flex flex-row px-contentPadding gap-[1em] text-sm">
				<TabButton tabName='Popular' currentTab={currentTab} setCurrentTab={setCurrentTab}/>
				<TabButton tabName='Photos' currentTab={currentTab} setCurrentTab={setCurrentTab}/>
				<TabButton tabName='Articles' currentTab={currentTab} setCurrentTab={setCurrentTab}/>
				<TabButton tabName='Pools' currentTab={currentTab} setCurrentTab={setCurrentTab}/>
				<TabButton tabName='Creators' currentTab={currentTab} setCurrentTab={setCurrentTab}/>
			</nav>

			<Tab tabName={currentTab}/>
		</>
	);
};
