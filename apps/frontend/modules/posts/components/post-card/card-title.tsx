import type { ReactNode } from "react";

export const CardTitle = ({ children }: { children: ReactNode }) => (
	<h1 className="text-base font-bold">{children}</h1>
);
