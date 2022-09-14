import type { ReactNode } from "react";

export const CardRow = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-row items-center justify-between w-full">{children}</div>
);
