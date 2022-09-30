import * as ScrollArea from "@radix-ui/react-scroll-area";
import type { ReactNode } from "react";

export const ScrollBox = ({
	children,
	direction = "vertical",
}: {
	children: ReactNode;
	direction?: "vertical" | "horizontal";
}) => (
	<ScrollArea.Root className="w-full h-full overflow-hidden">
		<ScrollArea.Viewport className="w-full h-full">{children}</ScrollArea.Viewport>
		{direction === "vertical" && (
			<ScrollArea.Scrollbar
				className="flex duration-150 select-none touch-none padding-[2px] bg-background-less hover:bg-background-lesser w-[10px]"
				orientation="vertical"
			>
				<ScrollArea.Thumb className="flex-1 p-[2] bg-primary-less rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44] before:min-h-[44]" />
			</ScrollArea.Scrollbar>
		)}
		{direction === "horizontal" && (
			<ScrollArea.Scrollbar
				className="flex duration-150 flex-col h-[10px] select-none touch-none padding-[2px] bg-background-less hover:bg-background-lesser w-[10px]"
				orientation="horizontal"
			>
				<ScrollArea.Thumb className="flex-1 p-[2] bg-primary-less rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44] before:min-h-[44]" />
			</ScrollArea.Scrollbar>
		)}

		<ScrollArea.Corner />
	</ScrollArea.Root>
);
