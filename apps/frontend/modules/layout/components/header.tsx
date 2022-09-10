
import { RefoundIcon } from "@components/icons/refound-icon";
import NextLink from "next/link";
import { BottomNav } from "./bottom-nav/bottom-nav";
import { SideMenu } from "./side-menu";

export const Header = () => {

	return (
		<header>
			<div
				id="header-top"
				className="z-[5000] fixed top-0 right-0 flex-row items-center justify-between w-full text-2xl leading-none bg-white border-b-2 border-black border-solid flex lg:text-8xl px-contentPadding"
			>
				<NextLink href="/">
					<a>
						<RefoundIcon className="h-[0.9em] lg:h-[0.7em]" />
					</a>
				</NextLink>
				<h1 className="font-normal leading-none text-[1em]">refound</h1>
			</div>

			<BottomNav/>

			<SideMenu />
		</header>
	);
};
