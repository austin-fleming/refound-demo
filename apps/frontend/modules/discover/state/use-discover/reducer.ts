import type { PoolAggregate } from "@modules/refound/models/pool.aggregate";
import type {
	ArticlePostAggregate,
	ImagePostAggregate,
} from "@modules/refound/models/post.aggregate";
import type { Profile } from "@modules/refound/models/profile.model";

export type DiscoverTabs = "photos" | "articles" | "pools" | "creators";
type LoadingState = "IDLE" | "LOADING" | "SUCCESS" | "FAIL";

export type DiscoverState = {
	currentTab: DiscoverTabs;
	photos: {
		isCurrentTab: boolean;
		loadingState: LoadingState;
		content: ImagePostAggregate[];
	};
	articles: {
		isCurrentTab: boolean;
		loadingState: LoadingState;
		content: ArticlePostAggregate[];
	};
	pools: {
		isCurrentTab: boolean;
		loadingState: LoadingState;
		content: PoolAggregate[];
	};
	creators: {
		isCurrentTab: boolean;
		loadingState: LoadingState;
		content: Profile[];
	};
};

export const initialDiscoverState: DiscoverState = {
	currentTab: "photos",
	photos: {
		isCurrentTab: true,
		loadingState: "IDLE",
		content: [],
	},
	articles: {
		isCurrentTab: false,
		loadingState: "IDLE",
		content: [],
	},
	pools: {
		isCurrentTab: false,
		loadingState: "IDLE",
		content: [],
	},
	creators: {
		isCurrentTab: false,
		loadingState: "IDLE",
		content: [],
	},
};

type DiscoverActions =
	| {
			type: "SET_TAB";
			payload: DiscoverTabs;
	  }
	| {
			type: "LOAD_TAB_START";
			payload: { tab: DiscoverTabs };
	  }
	| {
			type: "LOAD_TAB_SUCCESS";
			payload: { tab: DiscoverTabs; content: DiscoverState[DiscoverTabs]["content"] };
	  }
	| {
			type: "LOAD_TAB_FAIL";
			payload: { tab: DiscoverTabs };
	  };

export const discoverReducer = (state: DiscoverState, action: DiscoverActions): DiscoverState => {
	switch (action.type) {
		case "SET_TAB":
			return {
				...state,
				currentTab: action.payload,
				photos: { ...state.photos, isCurrentTab: false },
				articles: { ...state.articles, isCurrentTab: false },
				pools: { ...state.pools, isCurrentTab: false },
				creators: { ...state.creators, isCurrentTab: false },
				[action.payload]: { ...state[action.payload], isCurrentTab: true },
			};
		case "LOAD_TAB_START":
			return {
				...state,
				[action.payload.tab]: {
					...state[action.payload.tab],
					loadingState: "LOADING",
				},
			};
		case "LOAD_TAB_SUCCESS":
			return {
				...state,
				[action.payload.tab]: {
					...state[action.payload.tab],
					loadingState: "SUCCESS",
					content: action.payload.content,
				},
			};
		case "LOAD_TAB_FAIL":
			return {
				...state,
				[action.payload.tab]: {
					...state[action.payload.tab],
					loadingState: "FAIL",
					content: [],
				},
			};
		default:
			return state;
	}
};
