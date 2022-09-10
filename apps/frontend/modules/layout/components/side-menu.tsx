import { PolyButton } from "@components/poly-button/poly-button";
import { useAuth } from "@modules/auth/hooks/use-auth";
import type { ReactNode } from "react";
import { useLayout } from "../hooks/use-layout";

const MenuSection = ({ children, title }: { children: ReactNode; title: string }) => (
	<div className="flex flex-col gap-2 pb-8">
		<h3 className="text-sm font-bold">{title}</h3>
		{children}
	</div>
);

const Menu = () => {
	const { walletAddress, isLoggedIn, logIn, logOut } = useAuth();
	const { toggleMenu } = useLayout();

	return isLoggedIn ? (
		<>
			<h2>Account</h2>
			<p>{walletAddress || ""}</p>

			<PolyButton as="button" onClick={logOut} label="Log Out" />

			<section>
				<button
					onClick={() => {
						window.alert("SOS!");
					}}
				>
					SOS
				</button>

				<MenuSection title="General">
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
		</>
	) : (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<PolyButton
				as="button"
				size="lg"
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
			className={`w-full p-contentPadding max-w-xs bg-white h-full fixed top-0 right-0 z-[8000] transition-transform duration-150 ${
				menuIsOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
			}`}
		>
			<button
				onClick={toggleMenu}
				className="absolute top-contentPadding right-contentPadding"
			>
				Close
			</button>
			<Menu />
		</aside>
	);
};
