import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { Pool } from "@modules/refound/models/pool.model";
import type {
	ArticlePostAggregate,
	ImagePostAggregate,
} from "@modules/refound/models/post.aggregate";
import type { Profile, ProfileUsername } from "@modules/refound/models/profile.model";
import { toast } from "@services/toast/toast";
import type { Nullable } from "@utils/monads";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useState } from "react";

type LoadingState = "IDLE" | "LOADING" | "SUCCESS" | "FAIL";

type State = {
	profile?: Profile;
	profileLoadingState: LoadingState;
	imagePosts?: ImagePostAggregate[];
	imagePostsLoadingState: LoadingState;
	articlePosts?: ArticlePostAggregate[];
	articlePostsLoadingState: LoadingState;
	pools?: Pool[];
	poolsLoadingState: LoadingState;
};

const initialState: State = {
	profile: undefined,
	profileLoadingState: "IDLE",
	imagePosts: undefined,
	imagePostsLoadingState: "IDLE",
	articlePosts: undefined,
	articlePostsLoadingState: "IDLE",
	pools: undefined,
	poolsLoadingState: "IDLE",
};

type ProfileContext = State & {
	loadProfile: (username: ProfileUsername) => Promise<void>;
	loadImagePosts: () => Promise<void>;
	loadArticlePosts: () => Promise<void>;
};

const ProfileContextInitialState: ProfileContext = {
	...initialState,
	loadProfile: async (username) => {},
	loadImagePosts: async () => {},
	loadArticlePosts: async () => {},
};

const ProfileContext = createContext<ProfileContext>(ProfileContextInitialState);
export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
	const [username, setUsername] = useState<Nullable<ProfileUsername>>(undefined);
	const [state, setState] = useState<State>(initialState);
	const { getProfileByUsername, getImagePostsByProfile, getArticlePostsByProfile } =
		useRefoundContracts();

	const loadProfile = useCallback(
		async (username: ProfileUsername) => {
			setUsername(username);
			// NOTE: state resets when this is called.
			setState({ ...initialState, profileLoadingState: "LOADING" });

			const maybeProfile = await getProfileByUsername(username);

			maybeProfile.match({
				ok: (profile) => {
					setState({ ...state, profile, profileLoadingState: "SUCCESS" });
				},
				fail: (err) => {
					console.error(err);
					toast.error("Could not load profile.");
					setState({ ...state, profile: undefined, profileLoadingState: "FAIL" });
				},
			});
		},
		[username],
	);

	const loadImagePosts = useCallback(async () => {
		if (!username || !state.profile) return;

		setState({ ...state, imagePostsLoadingState: "LOADING" });

		const maybePosts = await getImagePostsByProfile(username);
		maybePosts.match({
			ok: (imagePosts) => {
				setState({ ...state, imagePosts, imagePostsLoadingState: "SUCCESS" });
			},
			fail: (err) => {
				console.error(err);
				toast.error("Could not load image posts.");
				setState({ ...state, imagePostsLoadingState: "FAIL" });
			},
		});
	}, [state.profile]);

	const loadArticlePosts = useCallback(async () => {
		if (!username || !state.profile) return;

		setState({ ...state, articlePostsLoadingState: "LOADING" });

		const maybePosts = await getArticlePostsByProfile(username);
		maybePosts.match({
			ok: (articlePosts) => {
				setState({ ...state, articlePosts, articlePostsLoadingState: "SUCCESS" });
			},
			fail: (err) => {
				console.error(err);
				toast.error("Could not load articles.");
				setState({ ...state, articlePostsLoadingState: "FAIL" });
			},
		});
	}, [state.profile]);

	return (
		<ProfileContext.Provider
			value={{ ...state, loadProfile, loadArticlePosts, loadImagePosts }}
		>
			{children}
		</ProfileContext.Provider>
	);
};
