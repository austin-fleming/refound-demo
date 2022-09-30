import { SignInButton } from "@modules/account/components/sign-in-button";
import { useAccount } from "@modules/account/hooks/use-account";
import { ContentSection } from "@modules/ui/content-section";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cloin } from "@utils/styling/cloin";

const AccordionItem = ({
	value,
	children,
	title,
}: {
	value: string;
	children: ReactNode;
	title: string;
}) => {
	return (
		<Accordion.Item
			value={value}
			className="bg-white rounded-lg focus-within:ring focus-within:ring-purple-500 focus-within:ring-opacity-75 focus:outline-none"
		>
			<Accordion.Header className="w-full">
				<Accordion.Trigger
					className={cloin(
						"group",
						"radix-state-open:rounded-t-lg radix-state-closed:rounded-lg",
						"focus:outline-none",
						"inline-flex w-full items-center justify-between bg-white px-4 py-2 text-left dark:bg-gray-800",
					)}
				>
					<span className="text-sm font-medium text-gray-900 dark:text-gray-100">
						{title}
					</span>
					<ChevronDownIcon
						className={cloin(
							"ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
							"group-radix-state-open:rotate-180 group-radix-state-open:duration-300",
						)}
					/>
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content className="w-full px-4 pb-3 mt-0 prose-sm prose bg-white rounded-b-lg pt-r1">
				<div className="text-sm text-gray-700 dark:text-gray-400">{children}</div>
			</Accordion.Content>
		</Accordion.Item>
	);
};

const HelperItems = () => {
	return (
		<Accordion.Root type="single" defaultValue="1" className="w-full space-y-4">
			<AccordionItem value="1" title="How this works">
				<p className="font-bold">This site is running on Celo&apos;s Alfajores network.</p>
				<p>
					In web3, your identity is linked to your wallet, think of it like your email
					address, but with the ability to hold your crypto currency and NFT assets.
				</p>
			</AccordionItem>

			<AccordionItem value="2" title="Setting Up a Wallet">
				<p className="font-bold">This site is running on Celo&apos;s Alfajores network.</p>
				<p>
					In web3, your identity is linked to your wallet, think of it like your email
					address, but with the ability to hold your crypto currency and NFT assets.
				</p>
			</AccordionItem>

			<AccordionItem value="3" title="Funding Your Wallet">
				<p>
					If you need some free test funds, you can{" "}
					<a href="https://celo.org/developers/faucet" target="_blank" rel="noreferrer">
						visit this link
					</a>
					.
				</p>
			</AccordionItem>

			<AccordionItem value="4" title="Contact Us">
				<p>
					To register your interest and setup a tutorial with the Refound team, please
					email us at hello@refound.app”
				</p>
			</AccordionItem>
		</Accordion.Root>
	);
};

const HowToDropdown = () => {
	return (
		<div
			tabIndex={0}
			className="w-full border collapse collapse-plus border-base-300 bg-base-100 rounded-box p-contentPadding"
		>
			<div className="font-bold collapse-title">How does this work?</div>
			<div className="leading-tight prose-sm prose collapse-content ">
				<p className="font-bold">This site is running on Celo&apos;s Alfajores network.</p>
				<p>
					In web3, your identity is linked to your wallet, think of it like your email
					address, but with the ability to hold your crypto currency and NFT assets.
				</p>
				<p>
					To signup with Refound, make sure you have a Celo/Alfajores compatible wallet
					such as{" "}
					<a
						href="https://metamask.io/"
						target="_blank"
						className="link"
						rel="noreferrer"
					>
						MetaMask
					</a>{" "}
					or the developer version of{" "}
					<a
						className="link"
						href="https://alfajores.celowallet.app/setup"
						target="_blank"
						rel="noreferrer"
					>
						Celo wallet
					</a>{" "}
					installed so you can sign into this site.
				</p>

				<p>
					If you need some free test funds, you can{" "}
					<a href="https://celo.org/developers/faucet" target="_blank" rel="noreferrer">
						visit this link
					</a>
					.
				</p>

				<p>
					To register your interest and setup a tutorial with the Refound team, please
					email us at hello@refound.app”
				</p>
			</div>
		</div>
	);
};

export const SignInView: NextPage = () => {
	const router = useRouter();
	const { address, hasProfile, login, status } = useAccount();

	useEffect(() => {
		if (address && !hasProfile) {
			router.push("/sign-up");
			return;
		}

		if (address) {
			router.push("/discover");
		}
	}, [address, hasProfile]);

	return (
		<ContentSection width="xs" className="flex flex-col items-center gap-12">
			<ul className="steps">
				<li className={`step step-neutral`}>
					<span className="text-xs font-bold tracking-wide px-[1em]">
						Connect Your Wallet
					</span>
				</li>
				<li className={`step`}>
					<span className="text-xs font-bold tracking-wide px-[1em]">
						Create Your Profile
					</span>
				</li>
			</ul>

			<h1 className="text-2xl font-bold">Welcome to Refound</h1>

			<div className="w-full">
				<SignInButton
					size="lg"
					className="w-full rounded-md"
					signInLabel="Connect Your Wallet"
				/>
				<p className="w-full text-sm text-center pt-[1em]">
					This site is running on Celo&apos;s Alfajores network.
				</p>
			</div>

			{/* <div className="leading-tight prose-sm prose bg-base-100 rounded-box">
				<div className="p-contentPadding">
					<p className="font-bold">
						This site is running on Celo&apos;s Alfajores network.
					</p>
				</div>

				<HowToDropdown />
			</div> */}

			{/* <HelperItems /> */}

			<div className="shadow-lg alert">
				<div>
					<div className="leading-tight prose-sm prose">
						<h3>What&apos;s a Wallet?</h3>
						<p>
							In web3, your identity is linked to your wallet, think of it like your
							email address, but with the ability to hold your crypto currency and NFT
							assets.
						</p>

						<h3>Installing a Wallet</h3>
						<p>
							To signup with Refound, make sure you have a Celo/Alfajores compatible
							wallet such as{" "}
							<a
								href="https://metamask.io/"
								target="_blank"
								className="link"
								rel="noreferrer"
							>
								MetaMask
							</a>{" "}
							or the developer version of{" "}
							<a
								className="link"
								href="https://alfajores.celowallet.app/setup"
								target="_blank"
								rel="noreferrer"
							>
								Celo wallet
							</a>{" "}
							installed so you can sign into this site.
						</p>

						<h3>Funding Your Wallet</h3>
						<p>
							If you need some free test funds, you can{" "}
							<a
								href="https://celo.org/developers/faucet"
								target="_blank"
								rel="noreferrer"
							>
								visit this link
							</a>
							.
						</p>

						<h3>Reach Out</h3>
						<p>
							To register your interest and setup a tutorial with the Refound team,
							please email us at hello@refound.app
						</p>
					</div>
				</div>
			</div>
		</ContentSection>
	);
};
