import type { ReactNode } from "react";
import { useMemo } from "react";
import { createContext, useCallback, useContext, useReducer } from "react";

type ModalViews = "SIGNUP_VIEW" | "LOGIN_VIEW";

type SidebarView = "LOGGED_IN" | "LOGGED_OUT";

interface State {
	sidebarIsOpen: boolean;
	sidebarView: SidebarView;
	modalIsOpen: boolean;
	modalView: ModalViews;
	userAvatar?: string;
	openSidebar: () => void;
	closeSidebar: () => void;
	toggleSidebar: () => void;
	setSidebar: (sidebar: SidebarView) => void;
	openModal: () => void;
	closeModal: () => void;
	setModal: (modal: ModalViews) => void;
	setUserAvatar: (avatar?: string) => void;
}

const initialState: State = {
	sidebarIsOpen: false,
	sidebarView: "LOGGED_OUT",
	modalIsOpen: false,
	modalView: "LOGIN_VIEW",
	userAvatar: undefined,
	/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
	openSidebar: () => {},
	closeSidebar: () => {},
	toggleSidebar: () => {},
	setSidebar: (sidebar) => {},
	openModal: () => {},
	closeModal: () => {},
	setModal: (modal) => {},
	setUserAvatar: (avatar?: string) => {},
	/* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
};

type Action =
	| {
			type: "OPEN_SIDEBAR";
	  }
	| {
			type: "CLOSE_SIDEBAR";
	  }
	| {
			type: "SET_SIDEBAR_VIEW";
			payload: State["sidebarView"];
	  }
	| {
			type: "OPEN_MODAL";
	  }
	| {
			type: "CLOSE_MODAL";
	  }
	| {
			type: "SET_MODAL_VIEW";
			payload: State["modalView"];
	  }
	| {
			type: "SET_USER_AVATAR";
			payload: State["userAvatar"];
	  };

const uiReducer = (state: State, action: Action) => {
	switch (action.type) {
		case "OPEN_SIDEBAR":
			return { ...state, sidebarIsOpen: true, modalIsOpen: false };
		case "CLOSE_SIDEBAR":
			return { ...state, sidebarIsOpen: false };
		case "SET_SIDEBAR_VIEW":
			return { ...state, sidebarView: action.payload };
		case "OPEN_MODAL":
			return { ...state, modalIsOpen: true, sidebarIsOpen: false };
		case "CLOSE_MODAL":
			return { ...state, modalIsOpen: false };
		case "SET_MODAL_VIEW":
			return { ...state, modalView: action.payload };
		case "SET_USER_AVATAR":
			return { ...state, userAvatar: action.payload };
		default:
			return state;
	}
};

const UIContext = createContext<State>(initialState);
export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(uiReducer, initialState);

	const openSidebar = useCallback(() => dispatch({ type: "OPEN_SIDEBAR" }), [dispatch]);

	const closeSidebar = useCallback(() => dispatch({ type: "CLOSE_SIDEBAR" }), [dispatch]);

	const toggleSidebar = useCallback(
		() => dispatch({ type: state.sidebarIsOpen ? "CLOSE_SIDEBAR" : "OPEN_SIDEBAR" }),
		[dispatch, state.sidebarIsOpen],
	);

	const setSidebar = useCallback(
		(sidebarView: SidebarView) => dispatch({ type: "SET_SIDEBAR_VIEW", payload: sidebarView }),
		[dispatch],
	);

	const openModal = useCallback(() => dispatch({ type: "OPEN_MODAL" }), [dispatch]);

	const closeModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), [dispatch]);

	const setModal = useCallback(
		(modalView: ModalViews) => dispatch({ type: "SET_MODAL_VIEW", payload: modalView }),
		[dispatch],
	);

	const setUserAvatar = useCallback(
		(avatarUrl: State["userAvatar"]) =>
			dispatch({ type: "SET_USER_AVATAR", payload: avatarUrl }),
		[dispatch],
	);

	const contextValue = useMemo(
		() => ({
			...state,
			openSidebar,
			closeSidebar,
			toggleSidebar,
			setSidebar,
			openModal,
			closeModal,
			setModal,
			setUserAvatar,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state],
	);

	return <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>;
};
