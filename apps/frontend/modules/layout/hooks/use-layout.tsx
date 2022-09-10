import type { Nullable } from "@utils/monads";
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface ILayoutContext {
	menuIsOpen: boolean;
	toggleMenu: () => void;
	currentPage: Nullable<string>;
}

const initialState: ILayoutContext = {
	menuIsOpen: false,
	toggleMenu: () => {},
	currentPage: null
};

const LayoutContext = createContext(initialState);
export const useLayout = () => useContext(LayoutContext);

export const LayoutContextProvider = ({ children }: { children: ReactNode }) => {
	const [menuIsOpen, setMenuIsOpen] = useState<ILayoutContext["menuIsOpen"]>(
		initialState.menuIsOpen,
	);
	const [currentPage, setCurrentPage] = useState<ILayoutContext['currentPage']>(initialState.currentPage)

	const toggleMenu = () => {
		setMenuIsOpen(!menuIsOpen);
	};

	return (
		<LayoutContext.Provider value={{ menuIsOpen, toggleMenu, currentPage }}>
			{children}
		</LayoutContext.Provider>
	);
};
