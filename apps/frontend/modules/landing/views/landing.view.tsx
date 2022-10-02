import type { NextPage } from "next";
import * as React from "react";
import { useEffect } from "react";
import { PolyButton } from "@components/poly-button/poly-button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import { PhotographCard } from "../../discover/components/cards/photograph-card";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "@services/toast/toast";

export const LandingView: NextPage = () => {
	const [posts, setPosts] = useState<any>();
	const { getAllImagePosts } = useRefoundContracts();

	useEffect(() => {
		if (!posts) {
			loadImages();
		}
	}, [posts]);

	const loadImages = async () => {
		(await getAllImagePosts()).match({
			ok: (posts) => {
				setPosts(posts);
			},
			fail: (err) => {
				console.error(err);
				toast.error("Could not load images.");
			},
		});
	};

	return (
		<div className="pb-24 mt-12">
			<Grid container justifyContent="center" sm={8} style={{ margin: "0 auto" }}>
				<Grid item sm={12} md={8} style={{ padding: "5%", paddingTop: "2%" }}>
					<h1
						style={{ fontSize: "3em", color: "#01A0B0" }}
						className="font-bold leading-tight"
					>
						Your platform for empowering journalism on the blockchain
					</h1>
					<p className="py-[2em]">
						Refound is an NFT marketplace and publishing platform where journalists and
						photographers can share first person, creative content from the frontlines
						swiftly, raise awareness, and sell directly to businesses, with sale
						proceeds going to customizable beneficiaries. Refound uses decentralization
						to offer groundbreaking protections for free speech, with content always
						protected by a censorship-resistant design.
					</p>
					<div
						className="flex flex-row items-center w-full gap-2 justify-left"
						style={{ marginTop: "20px" }}
					>
						<a
							href="/sign-up"
							className="btn min-w-[8em] btn-lg border-[#017984] bg-[#017984]"
						>
							Sign Up
						</a>
						<a
							href="/learn-more"
							className="btn min-w-[8em] btn-lg btn-outline text-[#017984] border-[#017984]"
						>
							Refound 101
						</a>
					</div>
				</Grid>
				<Grid item sm={12} md={4} style={{ paddingTop: "3%" }}>
					<img
						src="https://drive.google.com/uc?export=view&id=1o3Fy4e2RuLWnFJDe3H5C_RKRQjANUPOT"
						style={{ width: "100%" }}
						alt="Refound iPhone Mockup"
					></img>
				</Grid>
			</Grid>

			<Grid
				container
				justifyContent="center"
				sm={8}
				className="mx-auto mt-12 prose"
				style={{ padding: "5%", paddingTop: "2%" }}
			>
				<h1
					className="font-bold text-center max-w-[20ch] leading-tight"
					style={{ fontSize: "3em", color: "#01A0B0" }}
				>
					Mint the art of journalism back to life.
				</h1>
				<p className="text-center">
					Refound&apos;s mission is part of the Regenerative Finance (ReFi) movement,
					specifically to leverage blockchain technology to help the community of conflict
					zone journalists and photographers to directly sell their content to the public
					and news media at higher margins and with greater financial control, helping
					regenerate their economic cycle. Our decentralized application provides
					journalists a platform to share their content, monetize it, and maintain
					anonymity and safety by using a wallet sign-in.
				</p>
			</Grid>

			<section className="w-full max-w-screen-lg mx-auto mb-16 p-contentPadding">
				<div className="divider" />
				<div className="mx-auto mt-10 leading-tight prose text-center mb-14">
					<h2 className="text-3xl text-[#01A0B0]">See How Refound Works</h2>
					<p className="max-w-[30ch] mx-auto">
						Watch the video for a quick overview of Refound&apos;s features and how to
						get started.
					</p>
				</div>
				<figure className="relative pb-[56.25%] h-0 rounded-md overflow-hidden shadow-md">
					<iframe
						src="https://www.loom.com/embed/66fa1dcac53d45f19ec5c325e7e04dc2"
						frameBorder="0"
						webkitallowfullscreen="true"
						mozallowfullscreen="true"
						allowFullScreen
						className="absolute top-0 left-0 w-full h-full"
					></iframe>
				</figure>
			</section>

			<Grid container justifyContent="center" sm={8} style={{ margin: "0 auto" }}>
				<Grid item sm={12} md={6} style={{ padding: "3%" }}>
					<Card sx={{ maxWidth: 600, height: 400 }}>
						<CardContent className="prose-sm prose">
							<h3 className="text-2xl text-[#01A0B0]">Immutable and Decentralized</h3>

							<p>
								The immutability of the blockchain allows the journalists to post
								content that is wrapped in utility NFTs and reducing the risk of
								censorship and later modification of their original works, since the
								blockchain will always have a record of the original photograph or
								article when it was uploaded by the journalist.
							</p>
						</CardContent>
						<CardMedia
							component="img"
							style={{ maxWidth: "200px", margin: "0 auto" }}
							image="https://drive.google.com/uc?export=view&id=1AIa2MzZwM9aVZxAKL_C1srYwK4jR2VXv"
						/>
					</Card>
				</Grid>
				<Grid item sm={12} md={6} style={{ padding: "3%" }}>
					<Card sx={{ maxWidth: 600, height: 400 }}>
						<CardContent className="prose-sm prose">
							<h3 className="text-2xl text-[#01A0B0]">NFT smart contracts</h3>
							<p>
								Journalists benefit from the utility of the NFT smart contracts,
								publishing their work as an NFT, allowing journalists greater
								control of their intellectual property and greater revenue
								visibility. NFTs on Refound are used for their utility to direct
								content monetization, licensing, royalties, and ownership.
							</p>
						</CardContent>
						<CardMedia
							component="img"
							style={{ maxWidth: "200px", margin: "0 auto" }}
							image="https://drive.google.com/uc?export=view&id=1bEspbn-09HkoZX8TknAFgY5o5eXgXhIl"
						/>
					</Card>
				</Grid>
			</Grid>
			<Grid container justifyContent="center" sm={8} style={{ margin: "0 auto" }}>
				<Grid item sm={12} md={6} style={{ padding: "3%" }}>
					<Card sx={{ maxWidth: 600, height: 400 }}>
						<CardContent className="prose-sm prose">
							<h3 className="text-2xl text-[#01A0B0]">In app camera capability</h3>
							<p>
								to capture live photos for NFTs. This helps store the meta data of
								time and place directly on the blockchain on IPFS and helping
								viewers and newsrooms know that the image is not altered or
								doctored.
							</p>
						</CardContent>
						<CardMedia
							component="img"
							style={{ maxWidth: "200px", margin: "0 auto", marginTop: "5%" }}
							image="https://drive.google.com/uc?export=view&id=1if2YgQXUDxuwbaPwRkQYLRY1qXZ8W8JZ"
						/>
					</Card>
				</Grid>
				<Grid item sm={12} md={6} style={{ padding: "3%" }}>
					<Card sx={{ maxWidth: 600, height: 400 }}>
						<CardContent className="prose-sm prose">
							<h3 className="text-2xl text-[#01A0B0]">Cryptocurrency benefits</h3>
							<p>
								Ease of payment to journalists and their local sources, fixers, and
								contacts in war zones and conflict zones via stable coin using a an
								easy setup crypto wallet on Celo. Cryptocurrency provides a transfer
								of value that is much faster than banks, and much cheaper even in
								cases of international transfers. Account transactions are publicly
								auditable and secure, and easily accessible with a smartphone. 
							</p>
						</CardContent>
						<CardMedia
							component="img"
							style={{ maxWidth: "200px", margin: "0 auto" }}
							image="https://drive.google.com/uc?export=view&id=1FledxyrcSA8YO1m8nwP3vP78I5s4Fwcu"
						/>
					</Card>
				</Grid>
			</Grid>
			<Grid container justifyContent="center" sm={8} style={{ margin: "0 auto" }}>
				<Grid item sm={12} md={6} style={{ padding: "3%" }}>
					<Card sx={{ maxWidth: 600, height: 550 }}>
						<CardContent className="prose-sm prose">
							<h3 className="text-2xl text-[#01A0B0]">
								Decentralized content moderation
							</h3>
							<p>
								Community governance is utilized for content moderation which
								promotes credibility in a decentralized manner. Centralized
								platforms try to moderate content with a one size fits all approach
								banning users and deleting posts that only a small subsection of
								users find offensive. However, Refound allows users to adjust
								content filters so that they don&apos;t see some content rather than
								removing it for everyone. Refound allows users to downvote content
								they view as being misinformation making it less likely to be shown
								to others. There is also an option to flag content which is then
								reviewed by community moderators to make a mulit-signatory decision
								as to its viability on the platform.
							</p>
						</CardContent>
						<CardMedia
							component="img"
							style={{ maxWidth: "140px", margin: "0 auto" }}
							image="https://drive.google.com/uc?export=view&id=1AIa2MzZwM9aVZxAKL_C1srYwK4jR2VXv"
						/>
					</Card>
				</Grid>
				<Grid item sm={12} md={6} style={{ padding: "3%" }}>
					<Card sx={{ maxWidth: 600, height: 550 }}>
						<CardContent className="prose-sm prose">
							<h3 className="text-2xl text-[#01A0B0]">Beneficiary wallet</h3>
							<p>
								Having a beneficiary wallet where proceeds can go to a chosen
								beneficiary or family member in case of journalist going MIA or
								their demise.
							</p>
						</CardContent>
						<CardMedia
							component="img"
							style={{ maxWidth: "200px", margin: "0 auto", marginTop: "15%" }}
							image="https://drive.google.com/uc?export=view&id=1MkX4U53XFu2fLpmKFS_452dv9kLPuLfb"
						/>
					</Card>
				</Grid>
			</Grid>
			<Grid container justifyContent="center" sm={8} style={{ margin: "0 auto" }}>
				<Grid item sm={12} md={6} style={{ padding: "3%" }}>
					<Card sx={{ maxWidth: 600, height: 450 }}>
						<CardContent className="prose-sm prose">
							<h3 className="text-2xl text-[#01A0B0]">
								Wallet based subscriptions feature
							</h3>
							<p>
								The Refound subscriptions feature allows viewers to subscribe to any
								Refound journalist with their wallets and receive email
								notifications when new content is posted. For journalists, web3
								subscriptions establish the link to a wallet-based community that
								can support the journalist as they create more content.
							</p>
						</CardContent>
						<CardMedia
							component="img"
							style={{ maxWidth: "200px", margin: "0 auto" }}
							image="https://drive.google.com/uc?export=view&id=12kAwXMD0CcHXEEJGnFedKf_L5NwXd4Cx"
						/>
					</Card>
				</Grid>
				<Grid item sm={12} md={6} style={{ padding: "3%" }}>
					<Card sx={{ maxWidth: 600, height: 450 }}>
						<CardContent className="prose-sm prose">
							<h3 className="text-2xl text-[#01A0B0]">
								Support for journalists: Funding pools and bonus payments
							</h3>
							<p>
								Funding pools and bonus payments: Funding pools allow the community
								to direct tokens to commission topics they want journalists to
								photograph and write about and for journalists to raise funds for
								initiatives they want to report on. Refound also offers the ability
								for users to support journalists in areas affected by war and
								conflict by sending them a bonus payment when viewing their content.
							</p>
						</CardContent>
						<CardMedia
							component="img"
							style={{ maxWidth: "160px", margin: "0 auto" }}
							image="https://drive.google.com/uc?export=view&id=1za8Aqy87MRCFO-9C-zQ6TNm09kru4TyM"
						/>
					</Card>
				</Grid>
			</Grid>
			<Grid container justifyContent="center" sm={8} style={{ margin: "0 auto" }}>
				<Grid item sm={12} md={6} style={{ padding: "3%" }}>
					<Card sx={{ maxWidth: 600, height: 400 }}>
						<CardContent className="prose-sm prose">
							<h3 className="text-2xl text-[#01A0B0]">
								An on-chain SOS alert feature
							</h3>
							<p>
								which allows journalists in a geographically focused conflict zone
								to communicate with each other and send verified alerts of any
								escalating danger or risk in the area they are in, with alerts
								posting on a decentralized ledger(To be developed in next phase).
							</p>
						</CardContent>
						<CardMedia
							component="img"
							style={{ maxWidth: "200px", margin: "0 auto" }}
							image="https://drive.google.com/uc?export=view&id=1452x4aUtPiezOASIrOLfCIrxs0nwkewx"
						/>
					</Card>
				</Grid>
				<Grid item sm={12} md={6} style={{ padding: "3%" }}>
					<Card sx={{ maxWidth: 600, height: 400 }}>
						<CardContent className="prose-sm prose">
							<h3 className="text-2xl text-[#01A0B0]">Identity solutions</h3>
							<p>
								With blockchain technology, information about identity is linked to
								a wallet, and journalists can choose to remain anonymous if needed.
								Individuals can also curate their own profiles and control the level
								of data and identity. Refound offers the ability for journalists to
								verify their profiles with press ID card or journalism credentials
								if they choose to as well.
							</p>
						</CardContent>
						<CardMedia
							component="img"
							style={{ maxWidth: "182px", margin: "0 auto" }}
							image="https://drive.google.com/uc?export=view&id=1eyBawxYwVsArDp80Qwd0k4u5KdNqCmbk"
						/>
					</Card>
				</Grid>
			</Grid>

			<Grid container justifyContent="left" sm={10} style={{ margin: "0 auto" }}>
				<h1
					className="font-bold"
					style={{ fontSize: "2em", padding: "2%", color: "#01A0B0" }}
				>
					Highlights
				</h1>
			</Grid>

			<Grid container justifyContent="center" sm={12} style={{ margin: "0 auto" }}>
				{posts &&
					posts.slice(0, 5).map((post: any) => (
						<>
							<Grid item xs={6} md={2} style={{ padding: "1%" }}>
								<a href="/posts/" {...post.postId} className="hover:animate-pulse">
									<PhotographCard key={post.postId} photoData={post} />
								</a>
							</Grid>
						</>
					))}
			</Grid>

			<section className="flex flex-col justify-center w-full max-w-screen-lg gap-12 mx-auto py-18 p-contentPadding">
				<div className="divider" />
				<h3
					className="font-bold max-w-[25ch] mx-auto"
					style={{
						fontSize: "3em",
						color: "#01A0B0",
						textAlign: "center",
					}}
				>
					Mint the art of journalism back to life and start publishing.
				</h3>

				<a href="/sign-up" className="mx-auto btn btn-lg btn-wide">
					Sign Up
				</a>
			</section>
		</div>
	);
};
