import type { ReactNode } from "react";

export const CardContent = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-col gap-[0.25] w-full">{children}</div>
);
