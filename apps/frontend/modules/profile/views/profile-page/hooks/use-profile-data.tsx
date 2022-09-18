import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { LicenseAggregate } from "@modules/refound/models/license.aggregate";
import type { PoolAggregate } from "@modules/refound/models/pool.aggregate";
import type { PostAggregate } from "@modules/refound/models/post.aggregate";
import { PostType } from "@modules/refound/models/post.model";
import type { Profile, ProfileUsername } from "@modules/refound/models/profile.model";
import { toast } from "@services/toast/toast";
import type { Nullable } from "@utils/monads";
import type { ReactNode } from "react";
import { useCallback } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type ProfileView = "PUBLIC" | "PRIVATE";

interface IProfileDataState {
	profile: Nullable<Profile>;
	imagePosts: PostAggregate[];
	articlePosts: PostAggregate[];
	pools: PoolAggregate[];
	licenses: LicenseAggregate[];
	profileLoadingState: "LOADING" | "LOADED" | "NOT_FOUND";
	view: ProfileView;
	loadProfile: (username: ProfileUsername, view: ProfileView) => void;
}

const initialState: IProfileDataState = {
	profile: null,
	imagePosts: [],
	articlePosts: [],
	pools: [],
	licenses: [],
	profileLoadingState: "LOADING",
	view: "PUBLIC",
	loadProfile: (username, view) => {},
};

const ProfileDataContext = createContext<IProfileDataState>(initialState);
export const useProfileData = () => useContext(ProfileDataContext);

export const ProfileDataContextProvider = ({ children }: { children: ReactNode }) => {
	const { getPostsByProfile, getPoolsByProfile, getProfileByUsername, getLicensesByProfile } =
		useRefoundContracts();
	const [profile, setProfile] = useState<IProfileDataState["profile"]>(initialState.profile);
	const [profileLoadingState, setProfileLoadingState] = useState<
		IProfileDataState["profileLoadingState"]
	>(initialState.profileLoadingState);
	const [imagePosts, setImagePosts] = useState<IProfileDataState["imagePosts"]>(
		initialState.imagePosts,
	);
	const [articlePosts, setArticlePosts] = useState<IProfileDataState["articlePosts"]>(
		initialState.articlePosts,
	);
	const [pools, setPools] = useState<IProfileDataState["pools"]>(initialState.pools);
	const [licenses, setLicenses] = useState<IProfileDataState["licenses"]>(initialState.licenses);
	const [view, setView] = useState<IProfileDataState["view"]>(initialState.view);

	const loadProfile = useCallback((username: ProfileUsername, view: "PUBLIC" | "PRIVATE") => {
		setView(view);
		setProfileLoadingState("LOADING");

		getProfileByUsername(username).then((maybeProfile) =>
			maybeProfile.match({
				ok: (profile) => {
					setProfile(profile);
					setProfileLoadingState("LOADED");
				},
				fail: (err) => {
					console.error(err);
					toast.error("Could not find profile");
					setProfileLoadingState("NOT_FOUND");
				},
			}),
		);
	}, []);

	const loadContent = useCallback(async () => {
		if (!profile) return;

		/* TODO: add by address method to reduce round trips */
		getPostsByProfile(profile.username).then((maybePosts) => {
			maybePosts.match({
				ok: (posts) => {
					setImagePosts(posts.filter((post) => post.postType === PostType.IMAGE));
					setArticlePosts(posts.filter((post) => post.postType === PostType.ARTICLE));
				},
				fail: (err) => {
					console.error(err);
					toast.error("Could not load posts");
				},
			});
		});

		getPoolsByProfile(profile.address).then((maybePools) => {
			maybePools.match({
				ok: setPools,
				fail: (err) => {
					console.error(err);
					toast.error("Could not load pools");
				},
			});
		});

		if (view === "PRIVATE") {
			getLicensesByProfile(profile.address).then((maybeLicenses) => {
				maybeLicenses.match({
					ok: setLicenses,
					fail: (err) => {
						console.error(err);
						toast.error("Could not load licenses");
					},
				});
			});
		}
	}, [profile, view]);

	useEffect(() => {
		loadContent();
	}, [profile]);

	return (
		<ProfileDataContext.Provider
			value={{
				profileLoadingState,
				profile,
				pools,
				imagePosts,
				articlePosts,
				licenses,
				view,
				loadProfile,
			}}
		>
			{children}
		</ProfileDataContext.Provider>
	);
};
