import { useAccount } from "@modules/account/state/use-account";
import { useLayout } from "../hooks/use-layout";
import NextLink from "next/link";
import { RefoundIcon } from "@components/icons/refound-icon";
import { RightArrowIcon } from "@components/icons/arrow-icons";
import { SideMenu } from "./side-menu";
import { MoreIcon } from "@components/icons/menu-icons";

export const SiteHeader = () => {
	const { account } = useAccount();
	const { toggleMenu, menuIsOpen } = useLayout();

	return (
		<header>
			<div className="fixed top-0 left-0 right-0 text-base border-b-2 border-black border-solid navbar bg-base-100 z-[5000]">
				<div className="flex-1 text-base">
					<NextLink href="/">
						<a className="flex flex-row items-center text-xl normal-case btn btn-ghost">
							<RefoundIcon className="h-[0.9em] inline -mb-[0.2em]" />
							<h1
								className="font-normal leading-none text-[1.5em]"
								style={{ display: "inline-block", marginLeft: "10px" }}
							>
								{" "}
								refound
							</h1>
						</a>
					</NextLink>
				</div>

				<nav className="flex-none">
					<ul className="p-0 menu menu-horizontal">
						<li tabIndex={0} className="hidden sm:block">
							<a>
								Discover
								<svg
									className="fill-current"
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
								>
									<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
								</svg>
							</a>
							<ul className="p-2 bg-base-100">
								<li>
									<NextLink href="/discover?tab=photos">
										<a>Images</a>
									</NextLink>
								</li>
								<li>
									<NextLink href="/discover?tab=articles">
										<a>Articles</a>
									</NextLink>
								</li>
								<li>
									<NextLink href="/discover?tab=creators">
										<a>Creators</a>
									</NextLink>
								</li>
								<li>
									<NextLink href="/discover?tab=pools">
										<a>Pools</a>
									</NextLink>
								</li>
							</ul>
						</li>
						<li tabIndex={0} className="hidden sm:block">
							<a>
								Create
								<svg
									className="fill-current"
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
								>
									<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
								</svg>
							</a>
							<ul className="p-2 bg-base-100">
								<li>
									<NextLink href="/create?tab=image">
										<a>Image</a>
									</NextLink>
								</li>
								<li>
									<NextLink href="/create?tab=article">
										<a>Article</a>
									</NextLink>
								</li>
								<li>
									<NextLink href="/create?tab=pool">
										<a>Pool</a>
									</NextLink>
								</li>
							</ul>
						</li>
						{account.address && (
							<li>
								<button type="button" onClick={toggleMenu}>
									<MoreIcon className="h-[1.5em] w-[1.5em]" />
								</button>
							</li>
						)}
						<li className="pl-6">
							{account.address ? (
								<button
									type="button"
									className="text-white btn"
									aria-label={`${menuIsOpen ? "close" : "open"} menu`}
									onClick={toggleMenu}
								>
									{account?.profile?.username ? (
										<>
											<span className="tracking-wider">
												@{account.profile.username}
											</span>
											<svg
												className="fill-current"
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 24 24"
											>
												<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
											</svg>
										</>
									) : (
										<span className="font-mono">
											0x...${account.address.slice(-4)}
										</span>
									)}
								</button>
							) : (
								<button
									type="button"
									className="gap-2 text-white btn hover:bg-purple-900"
									onClick={toggleMenu}
								>
									Log In
									<RightArrowIcon className="h-[1em] w-[1em] -mr-[0.25em]" />
								</button>
							)}
						</li>
					</ul>
				</nav>
			</div>

			<SideMenu />
		</header>
	);
};
