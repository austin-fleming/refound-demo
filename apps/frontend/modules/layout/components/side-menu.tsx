import { PolyButton } from "@components/poly-button/poly-button";
import type { ReactNode } from "react";
import { useLayout } from "../hooks/use-layout";
import NextImage from "next/image";
import NextLink from "next/link";
import { useAccount } from "@modules/account/state/use-account";
import { cloin } from "@utils/cloin";

const MenuSection = ({ children, title }: { children: ReactNode; title: string }) => (
	<div className="flex flex-col gap-2">
		<h3 className="text-sm font-bold">{title}</h3>
		{children}
	</div>
);

const Menu = () => {
	const { account, login, logout } = useAccount();
	const { toggleMenu } = useLayout();

	return account.status === "CONNECTED" ? (
		<div className="w-full max-h-screen overflow-y-scroll p-contentPadding">
			<section className="flex flex-col items-center justify-center w-full gap-8 py-9">
				<h2 className="text-2xl leading-none">Account</h2>

				<div className="w-1/2 mx-auto">
					<figure className="w-full pb-[100%] relative rounded-md overflow-hidden">
						<NextImage
							src={account.profile?.avatarUrl || "/assets/avatar-placeholder.png"}
							alt="your avatar"
							layout="fill"
							objectFit="cover"
						/>
					</figure>
				</div>

				<div className="flex flex-col items-center justify-center w-full gap-2">
					<p className="text-2xl leading-none">
						{`@${account.profile?.username}` || "-"}
					</p>
					{account.address && (
						<p className="font-mono text-xs">{`${account.address.slice(
							0,
							6,
						)}...${account.address.slice(-4)}`}</p>
					)}
				</div>

				<NextLink href="/account">
					<a>View Account</a>
				</NextLink>
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
					<button type="button" onClick={logout} className="justify-start btn btn-sm">
						Log Out
					</button>

					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Notifications
					</a>

					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Saved
					</a>
				</MenuSection>

				<MenuSection title="Funds">
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Balances
					</a>
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Withdraw
					</a>
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Manage Royalties
					</a>
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Manage Beneficieries
					</a>
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Manager Subscribers
					</a>
				</MenuSection>

				<MenuSection title="Settings">
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Profile
					</a>
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Content Settings
					</a>
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Notifications
					</a>
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Identity
					</a>
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Privacy
					</a>
					<a href="#" className="justify-start btn btn-disabled btn-sm ">
						Manager Subscribers
					</a>
				</MenuSection>
			</section>
		</div>
	) : (
		<div className="flex flex-col items-center justify-center w-full h-full gap-4 p-contentPadding">
			<p className="text-xl font-bold text-center">Let&apos;s get started</p>
			<button
				type="button"
				onClick={login}
				className={cloin(
					"btn btn-lg tracking-wider btn-block",
					account.status === "CONNECTING" && "loading",
				)}
			>
				Log In
			</button>
			<PolyButton
				as="button"
				size="lg"
				fullWidth
				align="center"
				onClick={() => {
					toggleMenu();
					login();
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
