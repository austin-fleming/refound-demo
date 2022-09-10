import {
	BellIcon,
	ChatIcon,
	CommunityIcon,
	CompassIcon,
	HomeIcon,
	MoreVerticalIcon,
	PlusIcon,
} from "@components/icons/menu-icons";
import { RefoundIcon } from "@components/icons/refound-icon";
import NextLink from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AccountIcon } from "./account-icon";
import { useLayout } from "./layout-provider";
import { SideMenu } from "./side-menu";

const BodyLink = ({
	to,
	label,
	isCurrent = false,
	children,
}: {
	to: string;
	label: string;
	isCurrent?: boolean;
	children: ReactNode;
}) => (
	<NextLink href={to}>
		<a
			aria-current={isCurrent}
			className={`flex flex-col justify-center items-center w-full text-sm text-center border-t-2 border-transparent border-solid hover:border-black py-[0.4em] hover:text-slate-900 ${
				isCurrent ? "text-slate-900" : "text-slate-500"
			}`}
		>
			{children}
			<span className="text-[0.9em]">{label}</span>
		</a>
	</NextLink>
);

type MenuLinks = "home" | "discover" | "notifications" | "create" | string;

export const Header = () => {
	const [currentPage, setCurrentPage] = useState<MenuLinks>("");
	const { toggleMenu } = useLayout();

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
				<button onClick={toggleMenu}>menu</button>
				<h1 className="font-normal leading-none text-[1em]">refound</h1>
			</div>

			<div
				id="header-bottom"
				className="z-[5000] fixed bottom-0 left-0 right-0 w-full bg-white border-t-2 border-solid border-slate-300"
			>
				<nav className="flex flex-row relative -top-[2px] max-w-[500px] w-full mx-auto pb-[24px]">
					<BodyLink to="/" label="Home" isCurrent={currentPage === "home"}>
						<HomeIcon className="h-[2em]" />
					</BodyLink>
					<BodyLink
						to="/discover"
						label="Discover"
						isCurrent={currentPage === "discover"}
					>
						<CompassIcon className="h-[2em]" />
					</BodyLink>
					<BodyLink to="/create" label="Create" isCurrent={currentPage === "create"}>
						<PlusIcon className="h-[2em]" />
					</BodyLink>
					<BodyLink
						to="/"
						label="Notifications"
						isCurrent={currentPage === "notifications"}
					>
						<BellIcon className="h-[2em]" />
					</BodyLink>
					<BodyLink to="/" label="Menu">
						<AccountIcon className="h-[2em] w-[2em]" />
					</BodyLink>
				</nav>
			</div>

			<SideMenu />
		</header>
	);
};
