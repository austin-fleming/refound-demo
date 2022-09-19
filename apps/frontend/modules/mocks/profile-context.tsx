/* 
interface IWeb3AuthContext {
	web3Auth: Nullable<Web3Auth>;
	provider: Nullable<IWalletProvider>;
	chain: Nullable<string>;
	network: Nullable<string>;
	user: User;

	connectionStatus: "DISCONNECTED" | "CONNECTING" | "CONNECTED";
	isLoading: boolean;

	account: Nullable<Account>;
	profile: Nullable<Profile>;
	setProfile: (profile: Profile) => void;

	login: () => Promise<void>;
	logout: () => Promise<void>;
	getUserInfo: () => Promise<Result<Partial<User>>>;
	getAccounts: () => Promise<Result<string[]>>;
	getBalance: IWalletProvider["getBalance"];
	signMessage: IWalletProvider["signMessage"];
} 
*/

import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { PostAggregate } from "@modules/refound/models/post.aggregate";
import type { Profile } from "@modules/refound/models/profile.model";
import type { Nullable } from "@utils/monads";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";
import type { Account } from "./account";
import { photographService } from "./photograph.api";
import type { Photograph } from "./photographs";
import type { Pool } from "./pools";
import { poolService } from "./pools.api";
import { profileService } from "./profile.api";
import type { TextPost } from "./text-post";
import { textPostsService } from "./text-post.api";

interface IProfileContext {
	reset: () => void;
	loadProfile: (profileUsername: string) => Promise<void>;
	profileData: Nullable<Account>;
	// photographs
	photographs: Nullable<Photograph[]>;
	loadPhotographs: () => Promise<void>;
	loadMorePhotographs: () => Promise<void>;
	// pools
	pools: Nullable<Pool[]>;
	loadPools: () => Promise<void>;
	loadMorePools: () => Promise<void>;
	// textPosts
	textPosts: Nullable<TextPost[]>;
	loadTextPosts: () => Promise<void>;
}

const initialState: IProfileContext = {
	reset: () => {},
	loadProfile: async (profileUsername: string) => {},
	profileData: null,
	photographs: null,
	loadPhotographs: async () => {},
	loadMorePhotographs: async () => {},
	pools: null,
	loadPools: async () => {},
	loadMorePools: async () => {},
	textPosts: null,
	loadTextPosts: async () => {},
};

export const ProfileContext = createContext(initialState);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
	const [profileData, setProfileData] = useState<Nullable<Profile>>(null);
	const [photographs, setPhotographs] = useState<Nullable<PostAggregate[]>>(null);
	const [pools, setPools] = useState<Nullable<Pool[]>>(null);
	const [textPosts, setTextPosts] = useState<Nullable<PostAggregate[]>>(null);
	const { getProfileByUsername, getPostsByProfile } = useRefoundContracts();

	const reset = () => {
		setProfileData(null);
		setPhotographs(null);
		setPools(null);
		setTextPosts(null);
	};

	const loadProfile = useCallback(async (profileUsername: string) => {
		(await getProfileByUsername(profileUsername)).match({
			ok: (data) => setProfileData(data),
			fail: (err) => {
				toast.error("Failed to load profile.");
				reset();
			},
		});
	}, []);

	const loadPhotographs = useCallback(async () => {
		if (!profileData?.username) return;

		(await getPostsByProfile(profileData.username)).match({
			ok: (photos) => setPhotographs(photos),
			fail: (err) => {
				console.error(err);
				toast.error("Failed to load photographs.");
			},
		});
	}, [profileData?.username]);

	const loadMorePhotographs = useCallback(async () => {}, [profileData?.username, photographs]);

	const loadPools = useCallback(async () => {
		if (!profileData?.username) return;

		(await poolService.getPoolsByCreator(profileData.username)).match({
			ok: (pools) => setPools(pools),
			fail: (err) => {
				console.error(err);
				toast.error("Failed to load pools.");
			},
		});
	}, [profileData?.username]);

	const loadMorePools = useCallback(async () => {}, [profileData?.username, pools]);

	const loadTextPosts = useCallback(async () => {
		if (!profileData?.username) return;

		(await textPostsService.getTextPosts(profileData.username)).match({
			ok: (post) => setTextPosts(post),
			fail: (err) => {
				console.error(err);
				toast.error("Failed to load articles.");
			},
		});
	}, [profileData?.username]);

	return (
		<ProfileContext.Provider
			value={{
				reset,
				loadProfile,
				profileData,
				photographs,
				loadPhotographs,
				loadMorePhotographs,
				pools,
				loadPools,
				loadMorePools,
				textPosts,
				loadTextPosts,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};
