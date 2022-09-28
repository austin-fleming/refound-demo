import { RefoundIcon } from "@components/icons/refound-icon";
import NextLink from "next/link";
import { BottomNav } from "./bottom-nav/bottom-nav";
import { SideMenu } from "./side-menu";
import { useAccount } from "../../account/state/use-account";
import { PolyButton } from "@components/poly-button/poly-button";
import { NavMenu } from "./nav-menu";

export const Header = () => {
	const { login, account } = useAccount();

	return (
		<header>
			<div
				id="header-top"
				className="z-[5000] fixed top-0 right-0 flex-row items-center justify-between w-full text-2xl leading-none bg-white border-b-2 border-black border-solid flex lg:text-4xl px-contentPadding h-headerTopHeight"
			>
				<NextLink href="/">
					<a>
						<RefoundIcon className="h-[0.8em] lg:h-[0.7em] inline" />
						<h1
							className="font-normal leading-none text-[1em]"
							style={{ display: "inline-block", marginLeft: "10px" }}
						>
							{" "}
							refound
						</h1>
					</a>
				</NextLink>

				<NavMenu />
			</div>

			<BottomNav />

			<SideMenu />
		</header>
	);
};
