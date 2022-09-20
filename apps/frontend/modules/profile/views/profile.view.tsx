import { LoadingPage } from "@components/loading-page/loading-page";
import { PolyButton } from "@components/poly-button/poly-button";
import { useAccount } from "@modules/account/state/use-account";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { Post } from "@modules/refound/models/post.model";
import type { Profile } from "@modules/refound/models/profile.model";
import { toast } from "@services/toast/toast";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BonusButton } from "../components/bonus-button/bonus-button";
import { MessageButton } from "../components/message-button/message-button";
import { ArticlePostsTab } from "../components/profile-tabs/article-posts-tab";
import { ImagePostsTab } from "../components/profile-tabs/image-posts-tab";
import { ProfileContextProvider, useProfile } from "../hooks/use-profile";

const Inner = () => {
	const { loadProfile, profile } = useProfile();
	const { sendBonus, getLikedPostsByAccount } = useRefoundContracts();
	const router = useRouter();

	const { username } = router.query;

	useEffect(() => {
		if (!username) return;

		loadProfile(username as string);
	}, [username]);

	useEffect(() => {
		if (!profile?.address) return;

		getLikedPostsByAccount(profile.address).then((posts) => {
			posts.match({
				ok: (value) => console.log({ likedPosts: value }),
				fail: (err) => console.error(err),
			});
		});
	}, [profile]);

	return profile ? (
		<>
			<div className="grid grid-cols-[30%_1fr] grid-rows-1 w-full max-w-screen-lg gap-8 mx-auto px-contentPadding">
				<section className="flex flex-col w-full gap-8">
					<div className="w-full">
						<figure className="avatar">
							<div className="rounded">
								<img src={profile?.avatarUrl} />
							</div>
						</figure>
					</div>
					<div className="flex flex-col">
						<span className="badge">{profile.status}</span>
						<h1 className="text-4xl font-bold">@{profile.username}</h1>

						<div className="flex flex-col w-full gap-2">
							<BonusButton receivingAddress={profile.address} />
							<MessageButton />
						</div>
					</div>
				</section>
				<section className="w-full">
					<div className="tabs tabs-boxed">
						<a className="tab">Photos</a>
						<a className="tab tab-active">Articles</a>
						<a className="tab">Pools</a>
						<a className="tab">Likes</a>
					</div>

					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						{profile && <ImagePostsTab />}
						{/* {profile && <ArticlePostsTab />} */}
					</div>
				</section>
			</div>
		</>
	) : (
		<LoadingPage />
	);
};

export const ProfileView: NextPage = () => (
	<ProfileContextProvider>
		<Inner />
	</ProfileContextProvider>
);
