import type { ReactNode } from "react";

export const CardDescription = ({ children }: { children: ReactNode }) => (
	<p className="text-sm">{children}</p>
);
