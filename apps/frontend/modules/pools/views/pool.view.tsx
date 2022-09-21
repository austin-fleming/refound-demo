import { LoadingPage } from "@components/loading-page/loading-page";
import { queries as poolQueries } from "@modules/refound/repo/refound-pool-contract.repo";
import { isNothing } from "@utils/monads";
import { config } from "config/config";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Web3 from "web3";
import type { PoolAggregate } from "@modules/refound/models/pool.aggregate";

export const getStaticPaths: GetStaticPaths<{ poolId: string }> = async () => {
	return {
		fallback: true,
		paths: [
			{
				params: { poolId: "0" },
			},
		],
	};
};

export const getStaticProps: GetStaticProps<{ pool: PoolAggregate }> = async (context) => {
	if (isNothing(context.params?.poolId)) return { notFound: true };

	const web3 = new Web3(config.contracts.rpcUrl);
	const coreContract = new web3.eth.Contract(
		config.contracts.coreContract.abi,
		config.contracts.coreContract.address,
	);
	const poolContract = new web3.eth.Contract(
		config.contracts.poolContract.abi,
		config.contracts.poolContract.address,
	);

	return (
		await poolQueries.getPool(coreContract, poolContract, context.params!.poolId as string)
	).match({
		ok: (pool) => ({
			props: {
				pool: JSON.parse(JSON.stringify(pool)),
			},
			revalidate: 10,
		}),
		fail: () => ({
			notFound: true,
		}),
	});
};

const PoolView: NextPage<{ pool: PoolAggregate }> = ({ pool }) => {
	const router = useRouter();

	if (router.isFallback) return <LoadingPage />;

	return null;
};

export default PoolView;
