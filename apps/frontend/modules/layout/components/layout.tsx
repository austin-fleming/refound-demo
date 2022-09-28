import Head from "next/head";
import type { ReactNode } from "react";
import { AccessibleShortcut } from "./accessible-shortcut";
import { Header } from "./header";
import { LayoutContextProvider } from "../hooks/use-layout";
import { SiteHeader } from "./site-header";

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<LayoutContextProvider>
			<Head>
				<title>Refound</title>
			</Head>

			<SiteHeader />
			{/* <AccessibleShortcut targetId="#header-bottom" label="Skip to Navigation" />
			<AccessibleShortcut targetId="#main-content" label="Skip to Content" />
		
			<Header /> */}

			<main id="main-content" className="pb-headerBottomHeight pt-headerTopHeight">
				{children}
			</main>
		</LayoutContextProvider>
	);
};
