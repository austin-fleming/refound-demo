import { useDiscover } from "@modules/discover/state/use-discover/discover.provider";
import NextLink from "next/link";
import { TabFailed } from "./tab-failed";
import { TabLoading } from "./tab-loading";

export const PoolsTab = () => {
	const { pools } = useDiscover();

	if (pools.loadingState === "LOADING") return <TabLoading />;
	if (pools.loadingState === "FAIL") return <TabFailed />;
	if (pools.loadingState === "SUCCESS")
		return (
			<>
				{pools.content.map((pool) => (
					<NextLink key={pool.id} href={`/pools/${pool.id}`}>
						<a>{JSON.stringify(pool, null, "\t")}</a>
					</NextLink>
				))}
			</>
		);

	return null;
};
