import { PolyButton } from "@components/poly-button/poly-button";
import { useAuth } from "@modules/auth/hooks/use-auth";
import type { ReactNode } from "react";
import { useLayout } from "../hooks/use-layout";
import NextImage from "next/image";
import { useAccount } from "@modules/account/hooks/use-account";

const MenuSection = ({ children, title }: { children: ReactNode; title: string }) => (
	<div className="flex flex-col gap-2">
		<h3 className="text-sm font-bold">{title}</h3>
		{children}
	</div>
);

const Menu = () => {
	const { walletAddress, isLoggedIn, logIn, logOut } = useAuth();
	const { avatarUrl, username } = useAccount();

	const { toggleMenu } = useLayout();

	return isLoggedIn ? (
		<div className="w-full max-h-screen overflow-y-scroll p-contentPadding">
			<section className="flex flex-col items-center justify-center w-full gap-8 py-9">
				<h2 className="text-2xl leading-none">Account</h2>

				<div className="w-1/2 mx-auto">
					<figure className="w-full pb-[100%] relative rounded-md overflow-hidden">
						<NextImage
							src={avatarUrl || "/assets/avatar-placeholder.png"}
							alt="your avatar"
							layout="fill"
							objectFit="cover"
						/>
					</figure>
				</div>

				<div className="flex flex-col items-center justify-center w-full gap-2">
					<p className="text-2xl leading-none">@{username}</p>
					{walletAddress && (
						<p className="font-mono text-xs">{`${walletAddress.slice(
							0,
							6,
						)}...${walletAddress.slice(-4)}`}</p>
					)}
				</div>
			</section>

			<section className="py-8">
				<button className="w-full text-white bg-red-700 border-[3px] border-red-700 border-solid rounded-full relative flex flex-row justify-between items-center">
					<span className="w-[36px] h-[36px] overflow-hidden text-[10px] leading-none font-bold text-red-700 bg-white rounded-full flex flex-col justify-center items-center">
						SOS
					</span>
					<span className="text-[10px] leading-none text-white pr-[18px]">
						Swipe to send alert
					</span>
				</button>
			</section>

			<section className="flex flex-col gap-4">
				<MenuSection title="General">
					<PolyButton as="button" onClick={logOut} label="Log Out" size="sm" fullWidth />
					<PolyButton
						as="button"
						label="Notifications"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
					<PolyButton
						as="button"
						label="Saved"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
				</MenuSection>

				<MenuSection title="Funds">
					<PolyButton
						as="button"
						label="Balances"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
					<PolyButton
						as="button"
						label="Withdraw"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
					<PolyButton
						as="button"
						label="Manage Royalties"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
					<PolyButton
						as="button"
						label="Manage Beneficieries"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
					<PolyButton
						as="button"
						label="Manage Subscribers"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
				</MenuSection>

				<MenuSection title="Settings">
					<PolyButton
						as="button"
						label="Profile"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
					<PolyButton
						as="button"
						label="Notifications"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
					<PolyButton
						as="button"
						label="Identity"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
					<PolyButton
						as="button"
						label="Privacy"
						icon="rightArrow"
						size="sm"
						color="secondary"
					/>
				</MenuSection>
			</section>
		</div>
	) : (
		<div className="flex flex-col items-center justify-center w-full h-full gap-4 p-contentPadding">
			<p className="text-xl font-bold text-center">Let&apos;s get started</p>
			<PolyButton
				as="button"
				size="lg"
				fullWidth
				align="center"
				onClick={() => {
					toggleMenu();
					logIn();
				}}
				label="Log In"
			/>
		</div>
	);
};

export const SideMenu = () => {
	const { menuIsOpen, toggleMenu } = useLayout();

	return (
		<aside
			className={`w-full max-w-xs bg-white h-full fixed top-0 right-0 z-[8000] transition-transform duration-150 ${
				menuIsOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
			}`}
		>
			<button
				onClick={toggleMenu}
				className="absolute top-contentPadding right-contentPadding"
				aria-label="close"
			>
				<svg
					className="w-[36px] h-[36px]"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.53 6.47-.084-.073a.75.75 0 0 0-.882-.007l-.094.08L12 10.939l-2.47-2.47-.084-.072a.75.75 0 0 0-.882-.007l-.094.08-.073.084a.75.75 0 0 0-.007.882l.08.094L10.939 12l-2.47 2.47-.072.084a.75.75 0 0 0-.007.882l.08.094.084.073a.75.75 0 0 0 .882.007l.094-.08L12 13.061l2.47 2.47.084.072a.75.75 0 0 0 .882.007l.094-.08.073-.084a.75.75 0 0 0 .007-.882l-.08-.094L13.061 12l2.47-2.47.072-.084a.75.75 0 0 0 .007-.882l-.08-.094-.084-.073.084.073Z"
						fill="currentColor"
					/>
				</svg>
			</button>
			<Menu />
		</aside>
	);
};
