import type { NextPage } from "next";
import * as React from "react";
import { PolyButton } from "@components/poly-button/poly-button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
  Divider,
  Grid,
  Typography,
  Link,
  ButtonGroup,
  Button,
  CircularProgress,
} from "@mui/material";

export const LearnMoreView: NextPage = () => {
	return (
	<div className="sm:bg-cover bg-no-repeat" priority={true} style={{backgroundPositionY:"40%", marginTop:"-1%", backgroundPositionX:"center", backgroundBlendMode:"", backgroundAttachment:"fixed", backgroundImage: "url('https://drive.google.com/uc?export=view&id=17x666m3k2svn-L7jHODzvInlJ1vVTs_n')"}}>
		<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", height:"100vh", color:"white"}}>
			<Grid item sm={12}  style={{padding:"5%", fontFamily:"Andale Mono"}}>
				<h1 className="font-bold" style={{marginTop:"15%", fontSize:"2.5em", textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>Hello! Welcome to Refound Journalism!</h1>
				<h1 className="font-bold" style={{fontSize:"2.5em",textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>We are glad you are here!</h1>
				<p style={{fontSize:"1.5em", textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>We invite you to join our global community and monetize your photographs and writing!</p>
				<p style={{fontSize:"1.5em",textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>Sign up here for your unique Refound name handle!</p>
				<div className="flex flex-row items-center justify-left w-full gap-2" style={{marginTop:"20px"}}>
					<a href="/sign-up"><PolyButton 
					as="button"
					size="md" 
					label="Sign Up"
					align="center"
					color="secondary"/>
					</a>
				</div>
			</Grid>
			
		</Grid>

		<Grid container justifyContent="center" sm={12} style={{margin:"0 auto", marginTop:"5%", backgroundColor:"#E7E5E4"}}>
			<Grid item sm={12}  md={6} style={{padding:"3%"}}>
				<div style={{maxWidth:"300px", margin:"0 auto"}}><img src="https://bafybeickydgz2jvdiooqv4gzpvu5newc4qtbhzo7e42g5obesjffpallpq.ipfs.w3s.link/11173964734_b9d7f61849_b-modified-min.png" alt="'Netting a trade and an income in northern Lebanon' by DFID - UK Department for International Development is licensed under CC BY 2.0."></img></div>
			</Grid>
			<Grid item sm={12}  md={6} style={{padding:"3%"}}>
				<h1 className="font-bold" style={{fontSize: "2em"}}>ABOUT REFOUND</h1>
				<p style={{marginBottom:"20px"}}>Our goal is to bring the power of storytelling back to the creators. Refound’s platform solves the compensation, inheritance, freedom of expression and privacy problems creators face using decentralized technologies, so creators' content has greater monetization potential and is resistant to takedowns and censorship.</p>
				<p style={{marginBottom:"20px"}}>Refound is a decentralized NFT marketplace and publishing platform. It enables a wide variety of journalists, including freelance and citizen journalists, to create, publish, distribute, and monetize. Decentralization allows creators to fully own their work, allowing better monetization of their hard work.</p>
				<p style={{marginBottom:"20px"}}>The user experience is easy to use, allowing on-boarding of those not familiar with crypto swiftly with the ease of use of the Celo wallet connect.</p>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginTop:"5%", color:"white"}}>
			<Grid item sm={12}  style={{padding:"5%"}}>
				<h1 className="font-bold" style={{fontSize: "2em", textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>HOW DO I JOIN?</h1>
				<p style={{textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>It's very simple.</p>
				<p style={{textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>You sign up on the sign-up tab, connect to the Celo wallet , and upload your photos or articles to be made into NFTs.</p>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" sm={12} style={{margin:"0 auto", marginTop:"5%", backgroundColor:"#E7E5E4"}}>
			<Grid item sm={12}  md={6} style={{padding:"3%"}}>
				<div style={{maxWidth:"300px", margin:"0 auto"}}><img src="https://bafybeihvlpctyczp3jecmnyzcimr5typ72oqzpz2tbugia4ejmu7us2pla.ipfs.w3s.link/WhyRefound-modified.png" alt="'Netting a trade and an income in northern Lebanon' by DFID - UK Department for International Development is licensed under CC BY 2.0."></img></div>
			</Grid>
			<Grid item sm={12}  md={6} style={{padding:"3%", marginTop:"4%"}}>
				<h1 className="font-bold" style={{fontSize: "2em"}}>WHY SHOULD I PUBLISH ON REFOUND?</h1>
				<p style={{marginBottom:"20px"}}>Refound allows journalists to get better compensation for their work and sell to both the news and a global audience. Journalists then have a clear path to fair compensation, licensing, and revenue for their work. A beneficiary wallet function allows revenues to be passed on to selected benefiaries. Funding pools on Refound allow for journalists to raise funds to produce integral content.</p>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginTop:"5%"}}>
			<Grid  item sm={12}  md={6} style={{padding:"3%", color:"white"}}>
				<h1 className="font-bold" style={{fontSize: "2em", textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>HOW DOES IT WORK? HOW DO I SETUP A BENEFICIARY?</h1>
				<p style={{textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>Journalists on Refound benefit from the community as well which has the ability to support content creators by sending them a bonus. Refound stores all data on IPFS as decentralized storage.</p>
				<p style={{textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>A beneficiary is selected when creating your profile on Refound in the sign-up section.</p>
			</Grid>
			<Grid item sm={12}  md={6} style={{padding:"3%"}}>
				<div><img style={{maxWidth:"300px", margin:"0 auto"}} src="https://drive.google.com/uc?export=view&id=1TjYmWOADgh6rTbh34B8wF3HZiPqJWU5b"></img></div>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" sm={12} style={{margin:"0 auto", marginTop:"5%", backgroundColor:"#E7E5E4"}}>
			<Grid item sm={12}  md={6} style={{padding:"3%"}}>
				<div style={{maxWidth:"300px", margin:"0 auto"}}><img src="https://drive.google.com/uc?export=view&id=1jGT3htJ6eiMCS_oDBNtKPytMEUFKVKuE" alt="Dude, where is my rainforest? #Melbourneclimatestrike IMG_5389 by John Englart (Takver) is licensed under CC BY-SA 2.0."></img></div>
			</Grid>
			<Grid item sm={12}  md={6} style={{padding:"3%"}}>
				<h1 className="font-bold" style={{fontSize: "2em"}}>WHAT ARE THE BENEFITS OF MAKING MY WORK INTO AN NFT?</h1>
				<p style={{marginBottom:"20px"}}>Content minted as a non-fungible token (NFT) benefits from the utility of the NFT smart contracts: journalists who publish their work wrapped in an NFT have full control of their intellectual property and greater revenue visibility from licensing NFTs. An NFT is like a digital fingerprint and contract for the use for your photo. Journalists can also reduce the emails and contractual back and forth required for selling their content and have a seamless smart contract to protect their intellectual property and revenue streams.  When your NFT is created it is called minting, basically the process of the NFT contract being created and recorded in the blockchain, making it non-fungible (i.e. it cannot be replaced or duplicated).</p>
				<p>Content minted as a non-fungible token (NFT) benefits from the utility of the NFT smart contracts: journalists who publish their work wrapped in an NFT have full control of their intellectual property and greater revenue visibility from licensing NFTs. An NFT is token which functions like a digital fingerprint and contract for the use for your photo (the asset). Journalists can also reduce the emails and contractual back and forth required for selling their content and have a seamless smart contract to protect their intellectual property and revenue streams.</p>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginTop:"5%", color:"white"}}>
			<Grid item sm={12}  style={{padding:"5%"}}>
				<h1 className="font-bold" style={{fontSize: "2em", textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>WHAT WILL I EARN AND WILL MY CRYPTO CURRENCY EARNINGS BE STABLE?</h1>
				<p style={{textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>As you create the NFT, you will be able to set your price as well as select licensing types.  This will allow you more clarity in how your work is setup for sale.  You will receive 99% of your NFT sale or licensing proceeds, with Refound only taking 1% as a platform fee.  Compare this to other photo and content aggregating sites in Web 2, which keep 75% to 85% of revenue proceeds for themselves and only share 15% to 25% with the creators. Refound will help regenerate your financial standing as a creator of content by giving you greater monetization proceeds of your content. You will be able to use CUSD and CEuro for earnings, which are stable coins tied to the US dollar and Euro, respectively.</p>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" sm={12} style={{margin:"0 auto", marginTop:"5%", backgroundColor:"#E7E5E4"}}>
			<Grid item sm={12}  md={6} style={{padding:"3%"}}>
				<div style={{maxWidth:"300px", margin:"0 auto"}}><img src="https://drive.google.com/uc?export=view&id=1SEWGU4NKSAlQhSkLE9ICz76YmD1Hna1X" alt="Dude, where is my rainforest? #Melbourneclimatestrike IMG_5389 by John Englart (Takver) is licensed under CC BY-SA 2.0."></img></div>
			</Grid>
			<Grid item sm={12}  md={6} style={{padding:"3%", marginTop:"5%"}}>
				<h1 className="font-bold" style={{fontSize: "2em"}}>SUBMITTING CONTENT - LEGAL</h1>
				<p style={{marginBottom:"20px"}}>All contributors must ensure that the content they submit does not contain copyrighted materials. Refound will not accept content that is a violation of the exclusive rights of a creator.</p>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginTop:"5%", color:"white"}}>
			<Grid item sm={12}  style={{padding:"5%"}}>
				<h1 className="font-bold" style={{fontSize: "2em", textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>Funding Pools</h1>
				<p style={{textShadow:"2px 4px 3px rgba(0,0,0,0.3)"}}>Funding pools allow the community to direct crypto tokens to commission topics they want journalists to photograph and write about and for journalists to raise funds for initiatives they want to report on.</p>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" sm={12} style={{margin:"0 auto", marginTop:"5%", backgroundColor:"#E7E5E4"}}>
			<Grid item sm={12}  md={6} style={{padding:"3%"}}>
				<div style={{maxWidth:"300px", margin:"0 auto"}}><img src="https://drive.google.com/uc?export=view&id=15adYUl63SfqSg_yvWH_7mrA9n-o-oP9W" alt="Dude, where is my rainforest? #Melbourneclimatestrike IMG_5389 by John Englart (Takver) is licensed under CC BY-SA 2.0."></img></div>
			</Grid>
			<Grid item sm={12}  md={6} style={{padding:"3%", marginTop:"5%"}}>
				<h1 className="font-bold" style={{fontSize: "2em"}}>DO I RETAIN COPYRIGHT OF MY WORK?</h1>
				<p style={{marginBottom:"20px"}}>Absolutely. Any work uploaded is fully yours and the NFT smart contracts and their immutability ensure that as well. You can register as an individual or a business as long as you are at least 18 years of age.</p>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginTop:"5%", color:"white"}}>
			<Grid item sm={12}  style={{padding:"5%"}}>
				<h1 className="font-bold" style={{fontSize: "2em", textShadow:"2px 4px 3px rgba(0,0,0,0.3)" ,textAlign:"center"}}>WE LOOK FORWARD TO WORKING WITH YOU!</h1>
			</Grid>
		</Grid>
		<Grid container justifyContent="center" sm={8} style={{margin:"0 auto", marginBottom:"5%"}}>
		{<a href="/sign-up"><PolyButton as="button"
						size="md" 
						label="Sign Up Today"
						color="secondary"
						align="center"/></a>}
		</Grid>
		<Grid container justifyContent="center" sm={12} style={{margin:"0 auto", marginTop:"5%", backgroundColor:"#E7E5E4", paddingBottom:"5%"}}>
			<Grid item sm={8} md={6} xs={8} style={{padding:"1%"}}>
				<h1 className="font-bold" style={{fontSize: "2em"}}>HELPFUL LINKS</h1>
				<a className="hover:underline" href="https://medium.com/defi-for-the-people/how-to-set-up-metamask-with-celo-912d698fcafe" target="_blank">How To Set Up Metamask With Celo</a>
				<div style={{marginTop:"20px", maxWidth:"800", height:"25vh"}}>
					<iframe 
					 className="w-full h-full"
					src={`https://www.youtube.com/embed/p_Y-oAEBk9c`}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title="Embedded youtube"
					/>
					</div>
			</Grid>
		</Grid>
	</div>
	);
 };
