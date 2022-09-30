import type { ReactNode } from "react";
import { cloin } from "@utils/styling/cloin";

type Widths = "xs" | "sm" | "base" | "lg" | "full";
const widthClasses: Record<Widths, string> = {
	xs: "max-w-screen-sm",
	sm: "max-w-screen-md",
	base: "max-w-screen-lg",
	lg: "max-w-screen-xl",
	full: "",
};

export const ContentSection = ({
	children,
	className = "",
	width = "base",
}: {
	children: ReactNode;
	className?: string;
	width?: Widths;
}) => {
	return (
		<section
			className={cloin(
				"w-full mx-auto mt-headerTopHeight p-contentPadding",
				widthClasses[`${width}`],
				className,
			)}
		>
			{children}
		</section>
	);
};
