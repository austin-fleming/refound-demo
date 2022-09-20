import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type ProfileTab = "IMAGES" | "ARTICLES" | "POOLS" | "LIKES";

type State = {
	currentTab: ProfileTab;
	setCurrentTab: (tab: ProfileTab) => void;
};

const initialState: State = {
	currentTab: "IMAGES",
	setCurrentTab: (_) => {},
};

const ProfileContext = createContext<State>(initialState);
export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentTab, setCurrentTab] = useState<State["currentTab"]>(initialState.currentTab);

	return (
		<ProfileContext.Provider value={{ currentTab, setCurrentTab }}>
			{children}
		</ProfileContext.Provider>
	);
};
