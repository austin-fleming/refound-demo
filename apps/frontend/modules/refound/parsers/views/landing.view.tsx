import type { NextPage } from "next";
import * as React from "react";
import { PolyButton } from "@components/poly-button/poly-button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom'
import {
  Divider,
  Grid,
  Typography,
  ButtonGroup,
  Button,
  CircularProgress,
} from "@mui/material";

export const LandingView: NextPage = () => {
	return (
	<>
		<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginTop:"5%"}}>
			<Grid item sm={12}  md={6} style={{padding:"5%"}}>
				<h1 className="font-bold" style={{fontSize: "3em"}}>Your platform for empowering journalism on the blockchain</h1>
				<p>Refound is an NFT marketplace where journalists and photographers can share first person, creative content from the frontlines swiftly, raise awareness, and sell directly to businesses, with sale proceeds going to customizable beneficiaries. Refound leverages blockchain technology to create a decentralized platform helping conflict zone journalists and photographers to directly sell their content to the public and news media at higher margins and with greater financial control, helping regenerate their economic cycle.</p>
				<div className="flex flex-row items-center justify-left w-full gap-2" style={{marginTop:"20px"}}>
					<a href="/"><PolyButton as="button"
					size="md" 
					label="Get Started"
					color="secondary"
					align="center"/></a>

					<a href="/learn-more"><PolyButton 
					as="button"
					size="md" 
					label="Learn More"
					align="center"/></a>
				</div>
			</Grid>
			<Grid item sm={12} md={6}>
				<img src="https://drive.google.com/uc?export=view&id=1Aaa1NqyNnAlxFtEAD0N7ch-T44d8KLzg" style={{width:"100%"}} alt="Love and respect everyone ! by alisdare1 is licensed under CC BY-SA 2.0. File:Oil Wars, Global Warming, Climate Wars (15133025720).jpg by Eden, Janine and Jim from New York City is licensed under CC BY 2.0."></img>
			</Grid>
		</Grid>

	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginTop:"5%", padding:"5%"}}>
		<h1 className="font-bold" style={{fontSize: "3em"}}>Mint the art of journalism back to life.</h1>
		<p>Our decentralized application provides journalists a platform to share their content, monetize it, and maintain anonymity and safety by using a wallet sign-in.</p>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginTop:"5%"}}>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
					Immutable and Decentralized
					</Typography>
					<Typography variant="body2" color="text.secondary">
					The immutability of the blockchain allows the journalists to post content that is wrapped in utility NFTs and reducing the risk of censorship and later modification of their original works, since the blockchain will always have a record of the original photograph or article when it was uploaded by the journalist.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"300px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1rmyR7oMANOLUSNDp8__CK_1lCJImsdn2"
				/>
			</Card>
		</Grid>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
					NFT smart contracts
					</Typography>
					<Typography variant="body2" color="text.secondary">
					Journalists benefit from the utility of the NFT smart contracts, publishing their work as an NFT, allowing journalists greater control of their intellectual property and greater revenue visibility. NFTs on Refound are used for their utility to direct content monetization, licensing, royalties, and ownership.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"300px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1cy3_NZqn4POkjs1RQ-y_H-A0xB28GWiL"
				/>
			</Card>
		</Grid>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
					In app camera capability
					</Typography>
					<Typography variant="body2" color="text.secondary">
					to capture live photos for NFTs.  This helps store the meta data of time and place directly on the blockchain on IPFS and helping viewers and newsrooms know that the image is not altered or doctored. 
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"300px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1OyjFHs0szQmIIvPi6jOP9c1VQmbrR0tT"
				/>
			</Card>
		</Grid>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
					Cryptocurrency benefits
					</Typography>
					<Typography variant="body2" color="text.secondary">
					Ease of payment to journalists and their local sources, fixers, and contacts in war zones and conflict zones via stable coin using a an easy setup crypto wallet on Celo. Cryptocurrency provides a transfer of value that is much faster than banks, and much cheaper even in cases of international transfers. Account transactions are publicly auditable and secure, and easily accessible with a smartphone. 
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"260px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1cKrxJuvUyB1Ams0hA-rr4srP-cGpz3gU"
				/>
			</Card>
		</Grid>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
					Decentralized content moderation and on-chain governance
					</Typography>
					<Typography variant="body2" color="text.secondary">
					On chain governance is utilized for content moderation which promotes credibility in a decentralized manner. Centralized platforms try to moderate content with a one size fits all approach banning users and deleting posts that only a small subsection of users find offensive. However, Refound allows users to adjust content filters so that they don't see some content rather than removing it for everyone. Refound allows users to downvote content they view as being misinformation making it less likely to be shown to others.  There is also an option to flag content which is then reviewed by community moderators to make a mulit-signatory decision as to its viability on the platform. 
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"140px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1IFzD8lq10J6ebLdnkpXqqWkocz3AgV7s"
				/>
			</Card>
		</Grid>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
					Beneficiary wallet
					</Typography>
					<Typography variant="body2" color="text.secondary">
					Having a beneficiary wallet where proceeds can go to a chosen beneficiary or family member in case of journalist going MIA or their demise.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"300px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1GHZkVxh1IfipGI-A7aYDT80rB7lzYmzf"
				/>
			</Card>
		</Grid>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
					Wallet based subscriptions feature
					</Typography>
					<Typography variant="body2" color="text.secondary">
					The Refound subscriptions feature allows viewers to subscribe to any Refound journalist with their wallets and receive email notifications when new content is posted. For journalists, web3 subscriptions establish the link to a wallet-based community that can support the journalist as they create more content.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"300px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=12kAwXMD0CcHXEEJGnFedKf_L5NwXd4Cx"
				/>
			</Card>
		</Grid>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
					Support for journalists: Funding pools and bonus payments
					</Typography>
					<Typography variant="body2" color="text.secondary">
					Funding pools allow the community to direct tokens to commission topics they want journalists to photograph and write about and for journalists to raise funds for initiatives they want to report on.  Refound also offers the ability for users to support journalists in areas affected by war and conflict by sending them a bonus payment when viewing their content.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"250px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1jEJpL7rEfUX6COlgjW7UglmzeUzgOHAk"
				/>
			</Card>
		</Grid>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
					An on-chain SOS alert feature
					</Typography>
					<Typography variant="body2" color="text.secondary">
					which allows journalists in a geographically focused conflict zone to communicate with each other and send verified alerts of any escalating danger or risk in the area they are in, with alerts posting on a decentralized ledger. (To be developed in next phase)
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"300px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1V-wSwFgnvVMOcV8GXlvR-KmGjRf8qi49"
				/>
			</Card>
		</Grid>
		<Grid item sm={12}  md={6} style={{padding:"3%"}}>
			<Card sx={{ maxWidth: 600 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
					Identity solutions
					</Typography>
					<Typography variant="body2" color="text.secondary">
					With blockchain technology, information about identity is linked to a wallet, and journalists can choose to remain anonymous if needed. Individuals can also curate their own profiles and control the level of data and identity.  Refound offers the ability for journalists to verify their profiles with press ID card or journalism credentials if they choose to as well.
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					style={{maxWidth:"280px", margin: "0 auto"}}
					image="https://drive.google.com/uc?export=view&id=1puFStVwrGnr8vWYNQN8h0JoQCeRi6Y9O"
				/>
			</Card>
		</Grid>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto"}}>
		<h1 className="font-bold" style={{fontSize:"2em"}}>Start publishing in seconds.</h1>
	</Grid>
	<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginBottom:"5%"}}>
	<PolyButton as="button"
					size="md" 
					label="Connect Wallet"
					color="secondary"
					align="center"/>
	</Grid>
	</>
	);
 };
