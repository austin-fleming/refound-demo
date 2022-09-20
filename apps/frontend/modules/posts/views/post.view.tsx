import { LoadingPage } from "@components/loading-page/loading-page";
import type { PostAggregate } from "@modules/refound/models/post.aggregate";
import { PostType } from "@modules/refound/models/post.model";
import { queries } from "@modules/refound/repo/refound-post-contract.repo";
import { isNothing } from "@utils/monads";
import { config } from "config/config";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Web3 from "web3";
import NextImage from "next/image";
import { LicensePost } from "../components/license-post/license-post";
import { PostInteractions } from "../components/post-interactions/post-interactions";
import NextHead from "next/head";

export const getStaticPaths: GetStaticPaths<{ postId: string }> = async () => {
	return {
		fallback: true,
		paths: [
			{
				params: { postId: "0" },
			},
		],
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	if (isNothing(context.params?.postId)) return { notFound: true };

	const web3 = new Web3(config.contracts.rpcUrl);
	const coreContract = new web3.eth.Contract(
		config.contracts.coreContract.abi,
		config.contracts.coreContract.address,
	);
	const postContract = new web3.eth.Contract(
		config.contracts.postContract.abi,
		config.contracts.postContract.address,
	);

	return (
		await queries.getPost(coreContract, postContract, context.params!.postId as string)
	).match({
		ok: (post) => ({
			props: {
				post: JSON.parse(JSON.stringify(post)),
			},
			revalidate: 10,
		}),
		fail: () => ({
			notFound: true,
		}),
	});
};

const PostView: NextPage<{ post: PostAggregate }> = ({ post }) => {
	const router = useRouter();

	if (router.isFallback) return <LoadingPage />;

	return (
		<>
			<NextHead>
				<title>{`Refound | ${post.title}`}</title>
				<link rel="canonical" href={`https://refound.app/posts/${post.postId}`} />
				<meta property="og:url" content={`https://refound.app/posts/${post.postId}`} />
				<meta property="og:type" content="article" />

				<meta property="og:title" content={post.title} />
				{post.postType === PostType.IMAGE && post.description && (
					<meta property="og:description" content={post.description} />
				)}
				{post.postType === PostType.IMAGE && (
					<meta property="og:image" content={post.imageSource} />
				)}
				{post.postType === PostType.ARTICLE && post.coverImage?.imageSource && (
					<meta property="og:image" content={post.coverImage.imageSource} />
				)}
			</NextHead>
			<section className="flex flex-col w-full max-w-screen-lg gap-8 py-8 mx-auto px-contentPadding">
				<h1 className="text-4xl font-bold">{post.title}</h1>

				<div className="flex flex-row flex-wrap justify-between w-full gap-2">
					<PostInteractions post={post} />
					<LicensePost post={post} />
				</div>

				{post.postType === PostType.IMAGE && (
					<figure className="w-full overflow-hidden rounded-lg">
						<NextImage
							src={post.imageSource}
							width={post.width}
							height={post.height}
							alt={post.title}
							layout="responsive"
						/>

						{post.description && (
							<p className="text-base max-w-[50ch] mt-4">{post.description}</p>
						)}
					</figure>
				)}

				{post.postType === PostType.ARTICLE && (
					<div className="prose" dangerouslySetInnerHTML={{ __html: post.body }} />
				)}

				<div className="flex flex-row flex-wrap gap-8">
					{post.tags.length > 0 && (
						<div>
							<p className="text-sm font-bold mb-[0.5em]">Tags</p>
							<div>
								{post.tags.map((tag) => (
									<span
										key={tag}
										className="border-[1px] border-solid border-black text-black inline-block text-sm rounded-full px-[0.9em] pt-[0.25em] pb-[0.4em] leading-none mr-[0.5em]"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					)}
					{post.location && (
						<div>
							<p className="text-sm font-bold mb-[0.5em]">Location</p>
							<span className="border-[1px] border-solid border-black text-black inline-block text-sm rounded-full px-[0.9em] pt-[0.25em] pb-[0.4em] leading-none mr-[0.5em]">
								{post.location}
							</span>
						</div>
					)}
					<div>
						<p className="text-sm font-bold mb-[0.5em]">By</p>
						<a
							href={`/u/${post.creator.username}`}
							className="border-[1px] font-bold border-transparent underline border-black text-black inline-block text-sm pt-[0.25em] pb-[0.4em] leading-none mr-[0.5em]"
						>
							@{post.creator.username}
						</a>
					</div>
				</div>
			</section>
		</>
	);
};

export default PostView;
