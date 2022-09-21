import { LoadingPage } from "@components/loading-page/loading-page";
import { PolyButton } from "@components/poly-button/poly-button";
import { useAccount } from "@modules/account/state/use-account";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { PoolAggregate } from "@modules/refound/models/pool.aggregate";
import type {
	ArticlePostAggregate,
	ImagePostAggregate,
	PostAggregate,
} from "@modules/refound/models/post.aggregate";
import type { Post } from "@modules/refound/models/post.model";
import type { Profile } from "@modules/refound/models/profile.model";
import { ProfileTrustStatus } from "@modules/refound/models/profile.model";
import { queries as coreQueries } from "@modules/refound/repo/refound-core-contract.repo";
import { queries as postQueries } from "@modules/refound/repo/refound-post-contract.repo";
import { toast } from "@services/toast/toast";
import { isString } from "@utils/data-helpers/is-string";
import { isNothing, result } from "@utils/monads";
import { config } from "config/config";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { BonusButton } from "../components/bonus-button/bonus-button";
import { MessageButton } from "../components/message-button/message-button";
import { ArticlePostsTab } from "../components/profile-tabs/article-posts-tab";
import { ImagePostsTab } from "../components/profile-tabs/image-posts-tab";
import { TabNav } from "../components/profile-tabs/tab-nav";
import { Tabs } from "../components/profile-tabs/tabs";
import { ProfileContextProvider } from "../hooks/use-profile/use-profile";

export type ProfilePageContent = {
	profile: Profile;
	imagePosts: ImagePostAggregate[];
	articlePosts: ArticlePostAggregate[];
	pools: PoolAggregate[];
	likes: PostAggregate[];
};

export const getStaticPaths: GetStaticPaths<{ username: string }> = async () => {
	return {
		fallback: true,
		paths: [],
	};
};

const prepObjectForTransfer = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const getStaticProps: GetStaticProps<ProfilePageContent> = async (context) => {
	const username = context.params?.username;
	if (isNothing(username) || !isString(username)) return { notFound: true };

	const web3 = new Web3(config.contracts.rpcUrl);
	const coreContract = new web3.eth.Contract(
		config.contracts.coreContract.abi,
		config.contracts.coreContract.address,
	);
	const postContract = new web3.eth.Contract(
		config.contracts.postContract.abi,
		config.contracts.postContract.address,
	);
	const poolContract = new web3.eth.Contract(
		config.contracts.poolContract.abi,
		config.contracts.poolContract.address,
	);

	const profile = (await coreQueries.getProfileByUsername(coreContract, username))
		.mapOk(prepObjectForTransfer)
		.unwrapOrElse((err) => {
			throw err;
		});

	const [imagePosts, articlePosts, likes] = await Promise.all([
		(
			await postQueries.getImagePostsByOwner(coreContract, postContract, profile.address)
		)
			.unwrapOrElse((err) => {
				throw err;
			})
			.map(prepObjectForTransfer),
		(
			await postQueries.getArticlePostsByOwner(coreContract, postContract, profile.address)
		)
			.unwrapOrElse((err) => {
				throw err;
			})
			.map(prepObjectForTransfer),
		(
			await postQueries.getLikedPostsByAccount(coreContract, postContract, profile.address)
		)
			.unwrapOrElse((err) => {
				throw err;
			})
			.map(prepObjectForTransfer),
	]);

	return {
		props: {
			profile,
			imagePosts,
			articlePosts,
			pools: [],
			likes,
		},
	};
};

const ProfileView: NextPage<ProfilePageContent> = ({
	profile,
	imagePosts,
	articlePosts,
	pools,
	likes,
}) => {
	const router = useRouter();

	if (router.isFallback) return <LoadingPage />;

	return (
		<ProfileContextProvider>
			<div className="grid grid-cols-1 sm:grid-cols-[30%_1fr] grid-rows-1 w-full max-w-screen-lg gap-8 mx-auto px-contentPadding py-contentPadding">
				<section className="grid w-full grid-cols-2 gap-8 sm:flex sm:flex-col">
					<div className="w-full">
						<figure className="avatar">
							<div className="rounded">
								<img src={profile.avatarUrl} />
							</div>
						</figure>
					</div>
					<div className="flex flex-col justify-between">
						{profile.status !== ProfileTrustStatus.NONE ? (
							<span className="badge">{profile.status}</span>
						) : (
							<span />
						)}
						<h1 className="text-2xl font-bold leading-none">@{profile.username}</h1>

						<div className="flex flex-col w-full gap-2 sm:mt-8">
							<BonusButton receivingAddress={profile.address} />
							<MessageButton />
						</div>
					</div>
				</section>
				<section className="w-full">
					<TabNav />
					<div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2">
						<Tabs
							imagePosts={imagePosts}
							articlePosts={articlePosts}
							pools={pools}
							likes={likes}
						/>
					</div>
				</section>
			</div>
		</ProfileContextProvider>
	);
};

export default ProfileView;
