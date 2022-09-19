import type { NextPage } from "next";
import * as React from "react";
import { PolyButton } from "@components/poly-button/poly-button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useDiscover } from "@modules/discover/state/use-discover/discover.provider";
import NextLink from "next/link";
import { PhotographCard } from "../../../discover/components/cards/photograph-card";
import {
  Divider,
  Grid,
  Typography,
  ButtonGroup,
  Button,
  CircularProgress,
} from "@mui/material";

export const LandingView: NextPage = () => {
	const { photos } = useDiscover();

	return (
	<>
		<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
			<Grid item sm={12}  md={8} style={{padding:"5%", paddingTop:"2%"}}>
				<h1 className="font-bold" style={{fontSize: "3em", color:"#01A0B0"}}>Your platform for empowering journalism on the blockchain</h1>
				<p>Refound is an NFT marketplace and publishing platform where journalists and photographers can share first person, creative content from the frontlines swiftly, raise awareness, and sell directly to businesses, with sale proceeds going to customizable beneficiaries. Refound uses decentralization to offer groundbreaking protections for free speech, with content always protected by a censorship-resistant design.</p>
				<div className="flex flex-row items-center justify-left w-full gap-2" style={{marginTop:"20px"}}>
					<a href="/sign-up" className="bg-[#01A0B0] hover:bg-[#017984]" style={{padding: "8px 30px", borderRadius:"5px", color:"white"}} ><div>Sign Up</div></a>
					<a href="/learn-more"><PolyButton 
					as="button"
					size="lg" 
					label="Refound 101"
					align="center" fullWidth color="secondary"/></a>
				</div>
			</Grid>
			<Grid item sm={12} md={4} style={{paddingTop:"1%"}}>
				<img src="https://drive.google.com/uc?export=view&id=1Aaa1NqyNnAlxFtEAD0N7ch-T44d8KLzg" style={{width:"100%"}} alt="Love and respect everyone ! by alisdare1 is licensed under CC BY-SA 2.0. File:Oil Wars, Global Warming, Climate Wars (15133025720).jpg by Eden, Janine and Jim from New York City is licensed under CC BY 2.0."></img>
			</Grid>
		</Grid>

	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", padding:"5%", paddingTop:"2%"}}>
		<h1 className="font-bold" style={{fontSize: "3em", color:"#01A0B0"}}>Mint the art of journalism back to life.</h1>
		<p>Refound’s mission is part of the Regenerative Finance (ReFi) movement, specifically to leverage blockchain technology to help the community of conflict zone journalists and photographers to directly sell their content to the public and news media at higher margins and with greater financial control, helping regenerate their economic cycle. Our decentralized application provides journalists a platform to share their content, monetize it, and maintain anonymity and safety by using a wallet sign-in.</p>
	</Grid>


	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600, height: 400 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
					Immutable and Decentralized
					</Typography>
					<Typography variant="body2" color="text.secondary">
					The immutability of the blockchain allows the journalists to post content that is wrapped in utility NFTs and reducing the risk of censorship and later modification of their original works, since the blockchain will always have a record of the original photograph or article when it was uploaded by the journalist. 
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"200px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1AIa2MzZwM9aVZxAKL_C1srYwK4jR2VXv"
				/>
			</Card>
		</Grid>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600, height: 400 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
					NFT smart contracts
					</Typography>
					<Typography variant="body2" color="text.secondary">
					Journalists benefit from the utility of the NFT smart contracts, publishing their work as an NFT, allowing journalists greater control of their intellectual property and greater revenue visibility. NFTs on Refound are used for their utility to direct content monetization, licensing, royalties, and ownership.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"200px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1bEspbn-09HkoZX8TknAFgY5o5eXgXhIl"
				/>
			</Card>
		</Grid>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600, height: 350 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
					In app camera capability
					</Typography>
					<Typography variant="body2" color="text.secondary">
					to capture live photos for NFTs.  This helps store the meta data of time and place directly on the blockchain on IPFS and helping viewers and newsrooms know that the image is not altered or doctored.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"200px", margin: "0 auto", marginTop:"5%"}}
					image="https://drive.google.com/uc?export=view&id=1if2YgQXUDxuwbaPwRkQYLRY1qXZ8W8JZ"
				/>
			</Card>
		</Grid>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600, height: 350 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
					Cryptocurrency benefits
					</Typography>
					<Typography variant="body2" color="text.secondary">
					Ease of payment to journalists and their local sources, fixers, and contacts in war zones and conflict zones via stable coin using a an easy setup crypto wallet on Celo. Cryptocurrency provides a transfer of value that is much faster than banks, and much cheaper even in cases of international transfers. Account transactions are publicly auditable and secure, and easily accessible with a smartphone. 
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"200px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1FledxyrcSA8YO1m8nwP3vP78I5s4Fwcu"
				/>
			</Card>
		</Grid>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600, height: 450 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
					Decentralized content moderation and on-chain governance
					</Typography>
					<Typography variant="body2" color="text.secondary">
					  On chain governance is utilized for content moderation which promotes credibility in a decentralized manner. Centralized platforms try to moderate content with a one size fits all approach banning users and deleting posts that only a small subsection of users find offensive. However, Refound allows users to adjust content filters so that they don't see some content rather than removing it for everyone. Refound allows users to downvote content they view as being misinformation making it less likely to be shown to others.  There is also an option to flag content which is then reviewed by community moderators to make a mulit-signatory decision as to its viability on the platform.  
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"140px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1AIa2MzZwM9aVZxAKL_C1srYwK4jR2VXv"
				/>
			</Card>
		</Grid>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600, height: 450  }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
					Beneficiary wallet
					</Typography>
					<Typography variant="body2" color="text.secondary">
					Having a beneficiary wallet where proceeds can go to a chosen beneficiary or family member in case of journalist going MIA or their demise.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"200px", margin: "0 auto", marginTop:"15%"}}
					image="https://drive.google.com/uc?export=view&id=1MkX4U53XFu2fLpmKFS_452dv9kLPuLfb"
				/>
			</Card>
		</Grid>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600, height: 400 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
					Wallet based subscriptions feature
					</Typography>
					<Typography variant="body2" color="text.secondary">
					The Refound subscriptions feature allows viewers to subscribe to any Refound journalist with their wallets and receive email notifications when new content is posted. For journalists, web3 subscriptions establish the link to a wallet-based community that can support the journalist as they create more content.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"200px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=12kAwXMD0CcHXEEJGnFedKf_L5NwXd4Cx"
				/>
			</Card>
		</Grid>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600, height: 400 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
					Support for journalists: Funding pools and bonus payments
					</Typography>
					<Typography variant="body2" color="text.secondary">
					Funding pools and bonus payments:  Funding pools allow the community to direct tokens to commission topics they want journalists to photograph and write about and for journalists to raise funds for initiatives they want to report on.  Refound also offers the ability for users to support journalists in areas affected by war and conflict by sending them a bonus payment when viewing their content.  
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"160px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1za8Aqy87MRCFO-9C-zQ6TNm09kru4TyM"
				/>
			</Card>
		</Grid>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600, height: 350 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
					An on-chain SOS alert feature
					</Typography>
					<Typography variant="body2" color="text.secondary">
					which allows journalists in a geographically focused conflict zone to communicate with each other and send verified alerts of any escalating danger or risk in the area they are in, with alerts posting on a decentralized ledger(To be developed in next phase).
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"200px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1452x4aUtPiezOASIrOLfCIrxs0nwkewx"
				/>
			</Card>
		</Grid>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600, height: 350 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
					Identity solutions
					</Typography>
					<Typography variant="body2" color="text.secondary">
					With blockchain technology, information about identity is linked to a wallet, and journalists can choose to remain anonymous if needed. Individuals can also curate their own profiles and control the level of data and identity.  Refound offers the ability for journalists to verify their profiles with press ID card or journalism credentials if they choose to as well.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"182px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1eyBawxYwVsArDp80Qwd0k4u5KdNqCmbk"
				/>
			</Card>
		</Grid>
	</Grid>
	<Grid container justifyContent="left" sm={8} style={{margin:"0 auto"}}>
		<h1 className="font-bold" style={{fontSize:"2em", padding:"2%", color:"#01A0B0"}}>Highlights</h1>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<Grid item sm={6} md={2} style={{padding:"1%"}}>
			<a href="/">
				<Card sx={{ maxWidth: 600 }} style={{padding:"5%"}}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
						Ukraine
						</Typography>
					</CardContent>
					<CardMedia
						component="img"
						style={{maxWidth:"200px", margin: "0 auto"}}
						image="https://drive.google.com/uc?export=view&id=1oxvovcI1GvZr8KKlfiNyA1OVnEaXd_ux"
					/>
					<Typography gutterBottom variant="p" component="div" color="#01A0B0">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</Typography>
				</Card>
			</a>
		</Grid>
		<Grid item sm={6} md={2} style={{padding:"1%"}}>
			<a href="/">
				<Card sx={{ maxWidth: 600 }} style={{padding:"5%"}}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
						Lorem
						</Typography>
					</CardContent>
					<CardMedia
						component="img"
						style={{maxWidth:"200px", margin: "0 auto"}}
						image="https://drive.google.com/uc?export=view&id=1oxvovcI1GvZr8KKlfiNyA1OVnEaXd_ux"
					/>
					<Typography gutterBottom variant="p" component="div" color="#01A0B0">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</Typography>
				</Card>
			</a>
		</Grid>
		<Grid item sm={6} md={2}  style={{padding:"1%"}}>
			<a href="/">
				<Card sx={{ maxWidth: 600 }} style={{padding:"5%"}}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
						Lorem
						</Typography>
					</CardContent>
					<CardMedia
						component="img"
						style={{maxWidth:"200px", margin: "0 auto"}}
						image="https://drive.google.com/uc?export=view&id=1oxvovcI1GvZr8KKlfiNyA1OVnEaXd_ux"
					/>
					<Typography gutterBottom variant="p" component="div" color="#01A0B0">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</Typography>
				</Card>
				</a>
		</Grid>
		<Grid item sm={6} md={2} style={{padding:"1%"}}>
			<a href="/">
				<Card sx={{ maxWidth: 600 }} style={{padding:"5%"}}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
						Lorem
						</Typography>
					</CardContent>
					<CardMedia
						component="img"
						style={{maxWidth:"200px", margin: "0 auto"}}
						image="https://drive.google.com/uc?export=view&id=1oxvovcI1GvZr8KKlfiNyA1OVnEaXd_ux"
					/>
					<Typography gutterBottom variant="p" component="div" color="#01A0B0">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</Typography>
				</Card>
			</a>
		</Grid>
		<Grid item sm={6} md={2} style={{padding:"1%"}}>
			<a href="/">
				<Card sx={{ maxWidth: 600 }} style={{padding:"5%"}}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
						Lorem
						</Typography>
					</CardContent>
					<CardMedia
						component="img"
						style={{maxWidth:"200px", margin: "0 auto"}}
						image="https://drive.google.com/uc?export=view&id=1oxvovcI1GvZr8KKlfiNyA1OVnEaXd_ux"
					/>
					<Typography gutterBottom variant="p" component="div" color="#01A0B0">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</Typography>
				</Card>
			</a>
		</Grid>
		<Grid item sm={6} md={2} style={{padding:"1%"}}>
			<a href="/">
				<Card sx={{ maxWidth: 600 }} style={{padding:"5%"}}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div" color="#01A0B0">
						Lorem
						</Typography>
					</CardContent>
					<CardMedia
						component="img"
						style={{maxWidth:"200px", margin: "0 auto"}}
						image="https://drive.google.com/uc?export=view&id=1oxvovcI1GvZr8KKlfiNyA1OVnEaXd_ux"
					/>
					<Typography gutterBottom variant="p" component="div" color="#01A0B0">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
						</Typography>
				</Card>
			</a>
		</Grid>
	</Grid>
	<Grid container justifyContent="center" sm={12} style={{margin:"0 auto"}}>
		<h1 className="font-bold" style={{fontSize:"3em", padding:"2%", color:"#01A0B0"}}>Mint the art of journalism back to life and start publishing.</h1>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginBottom:"5%"}}>
	{<a href="/sign-up"><PolyButton as="button"
					size="md" 
					label="Connect Wallet"
					color="secondary"
					align="center"/></a>}
	</Grid>
	
	{photos.loadingState === "LOADING" && <h1>{photos.loadingState}</h1>}

	{photos.loadingState === "SUCCESS" && photos.content.map((photo) => (
		<PhotographCard key={photo.postId} photoData={photo} />
	))}
	{photos && console.log(photos)}
	</>
	);
 };
