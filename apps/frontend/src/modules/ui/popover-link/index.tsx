import * as Popover from "@radix-ui/react-popover";
import { Cross1Icon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { cloin } from "@utils/styling/cloin";

export const PopoverLink = ({ label, children }: { label: string; children: ReactNode }) => {
	return (
		<div className="relative inline-block text-left">
			<Popover.Root>
				<Popover.Trigger asChild>
					<button className="link">{label}</button>
				</Popover.Trigger>
				<Popover.Content
					align="center"
					sideOffset={4}
					className={cloin(
						"z-[9000] radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
						"w-48 rounded-lg p-4 shadow-lg md:w-56",
						"bg-white",
					)}
				>
					<Popover.Arrow className="text-white fill-current" />

					{children}

					<Popover.Close
						className={cloin(
							"absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
							"focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
						)}
					>
						<Cross1Icon className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
					</Popover.Close>
				</Popover.Content>
			</Popover.Root>
		</div>
	);
};
