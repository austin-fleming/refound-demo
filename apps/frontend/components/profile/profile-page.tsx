import type { Account } from "@modules/api/account";
import { profileService } from "@modules/api/profile.api";
import { toast } from "@services/toast/toast";
import type { Nullable } from "@utils/monads";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import { RightArrowIcon } from "@components/icons/arrow-icons";
import { poolsMocks } from "@modules/api/pools.mocks";
import {
	ProfileContext,
	ProfileContextProvider,
	useProfileContext,
} from "@modules/api/profile-context";
import { AboutTab } from "./tabs/about-tab";
import { ArticlesTab } from "./tabs/articles-tab";
import { PhotosTab } from "./tabs/photos-tab";
import { PoolsTab } from "./tabs/pools-tab";
import { SubscriberFeedTab } from "./tabs/subscriber-feed-tab";

type TabName = "about" | "articles" | "photos" | "pools" | "subscriberFeed";

const TabButton = ({
	label,
	action,
	isCurrent,
}: {
	label: string;
	action: () => void;
	isCurrent: boolean;
}) => {
	return (
		<button
			className={`border-b-[2px] border-solid py-[0.5em] leading-none hover:text-slate-900 ${
				isCurrent ? "border-slate-900 text-slate-900" : "text-slate-500 border-transparent"
			}`}
			onClick={() => action()}
		>
			{label}
		</button>
	);
};

const Inner = ({ username }: { username: string }) => {
	const [dataIsLoading, setDataIsLoading] = useState(true);
	const { loadProfile, profileData, reset } = useProfileContext();
	const [activeTab, setActiveTab] = useState<TabName>("about");

	useEffect(() => {
		loadProfile(username).then(() => {
			setDataIsLoading(false);
		});

		return () => {
			reset();
		};
	}, [username]);

	const tabs: Record<TabName, JSX.Element> = {
		about: <AboutTab />,
		articles: <ArticlesTab />,
		photos: <PhotosTab />,
		pools: <PoolsTab />,
		subscriberFeed: <SubscriberFeedTab />,
	};

	return dataIsLoading ? (
		<span>Loading...</span>
	) : profileData ? (
		<>
			<section className="grid grid-cols-2 gap-4 px-contentPadding">
				<figure className="relative w-full pb-[100%] rounded-md overflow-hidden">
					<NextImage
						src={profileData.avatarUrl}
						alt={`profile photo of ${profileData.username}`}
						layout="fill"
						objectFit="cover"
						objectPosition="center"
					/>
				</figure>

				<div className="flex flex-col items-start justify-between">
					<span className="capitalize text-xs px-[1em] py-[0.5em] bg-trustLevel-trusted-bg text-trustLevel-trusted-fg">
						{profileData.status.toLowerCase()}
					</span>

					<h1 className="text-2xl">@{profileData.username}</h1>

					<div className="flex flex-col items-start w-full gap-2">
						<button className="text-sm leading-none bg-slate-900 text-slate-50 px-[1.25em] w-full text-left rounded-[0.25em] py-[0.7em] flex flex-row justify-between items-center">
							Send a Bonus
							<RightArrowIcon className="h-[1em]" />
						</button>
						<button className="text-sm leading-none bg-slate-200 text-slate-900 px-[1.25em] w-full text-left rounded-[0.25em] py-[0.7em]  flex flex-row justify-between items-center">
							Message
							<RightArrowIcon className="h-[1em]" />
						</button>
					</div>
				</div>
			</section>

			<div className="px-contentPadding border-b-[2px] border-solid border-slate-300 shadow mx-auto">
				<nav className="flex flex-row items-baseline justify-start text-sm gap-[1em] relative bottom-[-2px]">
					<TabButton
						label="About"
						action={() => setActiveTab("about")}
						isCurrent={activeTab === "about"}
					/>
					<TabButton
						label="Articles"
						action={() => setActiveTab("articles")}
						isCurrent={activeTab === "articles"}
					/>
					<TabButton
						label="Photos"
						action={() => setActiveTab("photos")}
						isCurrent={activeTab === "photos"}
					/>
					<TabButton
						label="Pools"
						action={() => setActiveTab("pools")}
						isCurrent={activeTab === "pools"}
					/>
					<TabButton
						label="Subscriber Feed"
						action={() => setActiveTab("subscriberFeed")}
						isCurrent={activeTab === "subscriberFeed"}
					/>
				</nav>
			</div>

			<section className="flex flex-col gap-10 my-8 px-contentPadding">
				{tabs[`${activeTab}`]}
			</section>
		</>
	) : (
		<span>Profile not found</span>
	);
};

export const ProfilePage = ({ username }: { username: string }) => {
	return (
		<ProfileContextProvider>
			<Inner username={username} />
		</ProfileContextProvider>
	);
};
