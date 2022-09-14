import type { ReactNode } from "react";

export const CardFeed = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-col w-full max-w-screen-sm gap-8 mx-auto p-contentPadding">
		{children}
	</div>
);
