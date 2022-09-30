import type { ReactNode } from "react";
import { SiteHeader } from "../site-header";

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<SiteHeader />
			<main className="w-full overflow-x-hidden min-h-[101vh]">{children}</main>
		</>
	);
};
