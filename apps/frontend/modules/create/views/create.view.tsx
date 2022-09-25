import type { NextPage } from "next";

import { PostType } from "@modules/refound/models/post.model";
import { useEffect, useState } from "react";
import { ImagePostForm } from "../components/image-post-form";
import { ArticlePostForm } from "../components/article-post-form";
import { cloin } from "@utils/cloin";
import { PoolForm } from "@modules/pools/components/pool-form/pool-form";
import { useRouter } from "next/router";

type CreateTab = "IMAGE" | "ARTICLE" | "POOL";

export const CreateView: NextPage = () => {
	const router = useRouter();
	const [currentTab, setCurrentTab] = useState<CreateTab>("IMAGE");

	useEffect(() => {
		const { tab } = router.query;
		if (!tab) return;
		setCurrentTab((tab as string).toUpperCase() as CreateTab);
	}, [router.query]);

	const handleTabClick = (tab: CreateTab) => {
		router.push(`/create?tab=${tab.toLowerCase()}`);
	};

	return (
		<section className="flex flex-col w-full max-w-screen-md mx-auto min-h-[101vh]">
			<div className="flex flex-row justify-between w-full max-w-screen-md z-[4000] px-contentPadding bg-background mx-auto tabs fixed left-0 right-0  text-center top-headerTopHeight bg-white[90] justify-items-stretch">
				<button
					type="button"
					aria-label="use image post form"
					aria-current={currentTab === "IMAGE"}
					className={cloin(
						"tab tab-bordered flex-grow",
						currentTab === "IMAGE" && "tab-active",
					)}
					onClick={() => {
						handleTabClick("IMAGE");
					}}
				>
					Image
				</button>
				<button
					type="button"
					aria-label="use article post form"
					aria-current={currentTab === "ARTICLE"}
					className={cloin(
						"tab tab-bordered flex-grow",
						currentTab === "ARTICLE" && "tab-active",
					)}
					onClick={() => {
						handleTabClick("ARTICLE");
					}}
				>
					Article
				</button>
				<button
					type="button"
					aria-label="use article post form"
					aria-current={currentTab === "POOL"}
					className={cloin(
						"tab tab-bordered flex-grow",
						currentTab === "POOL" && "tab-active",
					)}
					onClick={() => {
						handleTabClick("POOL");
					}}
				>
					Pool
				</button>
			</div>
			<div className="w-full py-16 mx-auto px-contentPadding">
				{currentTab === "IMAGE" && <ImagePostForm />}
				{currentTab === "ARTICLE" && <ArticlePostForm />}
				{currentTab === "POOL" && <PoolForm />}
			</div>
		</section>
	);
};
