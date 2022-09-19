import { PolyButton } from "@components/poly-button/poly-button";
import { useAccount } from "@modules/account/state/use-account";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { Post } from "@modules/refound/models/post.model";
import type { Profile } from "@modules/refound/models/profile.model";
import { toast } from "@services/toast/toast";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArticlePostsTab } from "../components/profile-tabs/article-posts-tab";
import { ImagePostsTab } from "../components/profile-tabs/image-posts-tab";
import { ProfileContextProvider, useProfile } from "../hooks/use-profile";

const Inner = () => {
	const { loadProfile, profile } = useProfile();
	const router = useRouter();

	const { username } = router.query;

	useEffect(() => {
		if (!username) return;

		loadProfile(username as string);
	}, [username]);

	return (
		<>
			<section>{JSON.stringify(profile, null, "\t")}</section>
			{profile && <ImagePostsTab />}
			{profile && <ArticlePostsTab />}
		</>
	);
};

export const ProfileView: NextPage = () => (
	<ProfileContextProvider>
		<Inner />
	</ProfileContextProvider>
);
