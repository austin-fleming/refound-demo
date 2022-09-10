import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface ILayoutContext {
	menuIsOpen: boolean;
	toggleMenu: () => void;
}

const initialState: ILayoutContext = {
	menuIsOpen: false,
	toggleMenu: () => {},
};

const LayoutContext = createContext(initialState);
export const useLayout = () => useContext(LayoutContext);

export const LayoutContextProvider = ({ children }: { children: ReactNode }) => {
	const [menuIsOpen, setMenuIsOpen] = useState<ILayoutContext["menuIsOpen"]>(
		initialState.menuIsOpen,
	);

	const toggleMenu = () => {
		setMenuIsOpen(!menuIsOpen);
	};

	return (
		<LayoutContext.Provider value={{ menuIsOpen, toggleMenu }}>
			{children}
		</LayoutContext.Provider>
	);
};
