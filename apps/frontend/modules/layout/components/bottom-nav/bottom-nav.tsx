import { useLayout } from "../../hooks/use-layout";
import S from "./bottom-nav.module.css";
import { BellIcon, CompassIcon, HomeIcon, PlusIcon } from "@components/icons/menu-icons";
import NextLink from "next/link";
import { AccountIcon } from "../account-icon";
import { useAccount } from "@modules/account/state/use-account";

export const BottomNav = () => {
	const { currentPage, toggleMenu } = useLayout();
	const { account } = useAccount();

	return (
		<div
			id="header-bottom"
			className="z-[5000] fixed bottom-0 left-0 right-0 w-full bg-white border-t-2 border-solid border-slate-300"
		>
			<nav className="flex flex-row relative -top-[2px] max-w-[500px] w-full mx-auto pb-[24px]">
				<NextLink href="/discover">
					<a
						aria-current={currentPage === "discover"}
						className={`${S.navButton} ${
							currentPage === "discover" && S["navButton--current"]
						}`}
					>
						<CompassIcon
							className={S.navButton__icon}
							filled={currentPage === "discover"}
						/>
						<span className={S.navButton__label}>Discover</span>
					</a>
				</NextLink>
				<NextLink href="/create">
					<a
						aria-current={currentPage === "create"}
						className={`${S.navButton} ${
							currentPage === "create" && S["navButton--current"]
						}`}
					>
						<PlusIcon className={S.navButton__icon} filled={currentPage === "create"} />
						<span className={S.navButton__label}>Create</span>
					</a>
				</NextLink>
				<button
					className={S.navButton}
					type="button"
					onClick={toggleMenu}
					aria-label="open menu"
				>
					<AccountIcon
						avatarSource={account?.profile?.avatarUrl}
						className={S.navButton__icon}
					/>
					<span className={S.navButton__label}>Account</span>
				</button>
			</nav>
		</div>
	);
};
