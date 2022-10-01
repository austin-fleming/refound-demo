import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import { toast } from "@services/toast/toast";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { createContext, useContext, useReducer } from "react";
import type { DiscoverTabs } from "./reducer";
import { type DiscoverState, initialDiscoverState, discoverReducer } from "./reducer";

type DiscoverContextState = DiscoverState & {
	selectTab: (tab: DiscoverTabs) => void;
};

const discoverContextInitialState = {
	...initialDiscoverState,
	selectTab: (tab: DiscoverTabs) => {},
};

const DiscoverContext = createContext<DiscoverContextState>(discoverContextInitialState);
export const useDiscover = () => useContext(DiscoverContext);

export const DiscoverContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(discoverReducer, initialDiscoverState);
	const { getAllImagePosts, getAllArticlePosts, getAllProfiles, getPools } =
		useRefoundContracts();

	const selectTab = (tab: DiscoverTabs) => {
		dispatch({ type: "SET_TAB", payload: tab });
	};

	const loadImages = useCallback(async () => {
		dispatch({ type: "LOAD_TAB_START", payload: { tab: "photos" } });

		(await getAllImagePosts()).match({
			ok: (posts) =>
				dispatch({ type: "LOAD_TAB_SUCCESS", payload: { tab: "photos", content: posts } }),
			fail: (err) => {
				console.error(err);
				toast.error("Could not load images.");
				dispatch({ type: "LOAD_TAB_FAIL", payload: { tab: "photos" } });
			},
		});
	}, [state.currentTab]);

	const loadArticles = useCallback(async () => {
		dispatch({ type: "LOAD_TAB_START", payload: { tab: "articles" } });

		(await getAllArticlePosts()).match({
			ok: (posts) =>
				dispatch({
					type: "LOAD_TAB_SUCCESS",
					payload: { tab: "articles", content: posts },
				}),
			fail: (err) => {
				console.error(err);
				toast.error("Could not load articles.");
				dispatch({ type: "LOAD_TAB_FAIL", payload: { tab: "articles" } });
			},
		});
	}, [state.currentTab]);

	const loadPools = useCallback(async () => {
		if (state.pools.loadingState === "FAIL") return;

		dispatch({ type: "LOAD_TAB_START", payload: { tab: "pools" } });

		(await getPools()).match({
			ok: (pools) =>
				dispatch({ type: "LOAD_TAB_SUCCESS", payload: { tab: "pools", content: pools } }),
			fail: (err) => {
				console.error(err);
				toast.message("No pools have been made yet.");
				dispatch({ type: "LOAD_TAB_FAIL", payload: { tab: "pools" } });
			},
		});
	}, [state.currentTab]);

	const loadCreators = useCallback(async () => {
		dispatch({ type: "LOAD_TAB_START", payload: { tab: "creators" } });

		(await getAllProfiles()).match({
			ok: (profiles) => {
				console.log({ fetchedProfiles: profiles });
				dispatch({
					type: "LOAD_TAB_SUCCESS",
					payload: { tab: "creators", content: profiles },
				});
			},
			fail: (err) => {
				console.error(err);
				toast.error("Could not load creators.");
				dispatch({ type: "LOAD_TAB_FAIL", payload: { tab: "creators" } });
			},
		});
	}, [state.currentTab]);

	useEffect(() => {
		switch (state.currentTab) {
			case "articles":
				state.articles.loadingState !== "SUCCESS" && loadArticles();
				return;
			case "photos":
				state.photos.loadingState !== "SUCCESS" && loadImages();
				return;
			case "creators":
				state.creators.loadingState !== "SUCCESS" && loadCreators();
				return;
			case "pools":
				state.pools.loadingState !== "SUCCESS" && loadPools();
				return;
			default:
				return;
		}
	}, [state.currentTab]);

	return (
		<DiscoverContext.Provider value={{ ...state, selectTab }}>
			{children}
		</DiscoverContext.Provider>
	);
};
