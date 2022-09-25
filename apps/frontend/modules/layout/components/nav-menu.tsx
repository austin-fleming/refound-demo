import { CompassIcon, MoreVerticalIcon, PlusIcon } from "@components/icons/menu-icons";
import { useAccount } from "@modules/account/state/use-account";
import NextLink from "next/link";
import { useLayout } from "../hooks/use-layout";

export const NavMenu = () => {
	const { account } = useAccount();
	const { menuIsOpen, toggleMenu } = useLayout();

	return (
		<nav className="h-full flex flex-row gap-[0.5em] text-base items-center">
			<NextLink href="/discover">
				<a className="tooltip tooltip-bottom" data-tip="discover">
					<CompassIcon className="w-[1em] h-[1em]" />
				</a>
			</NextLink>

			{/* <div data-tip="create" className="tooltip tooltip-bottom"> */}
			<NextLink href="/create">
				<a className="font-bold btn btn-ghost btn-sm" data-tip="create">
					create
				</a>
			</NextLink>
			{/* </div> */}

			{account.address ? (
				<button
					type="button"
					aria-label={`${menuIsOpen ? "close" : "open"} account menu`}
					onClick={toggleMenu}
				>
					<MoreVerticalIcon className="w-[1em] h-[1em]" />
				</button>
			) : (
				<button
					type="button"
					aria-label={`${menuIsOpen ? "close" : "open"} account menu`}
					className="btn btn-ghost btn-sm"
					onClick={toggleMenu}
				>
					Log In
				</button>
			)}
		</nav>
	);
};
