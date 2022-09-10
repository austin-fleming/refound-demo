import { PoolCard } from "@modules/posts/components/pool-card";
import { useProfileContext } from "@modules/api/profile-context";
import { useEffect } from "react";

export const PoolsTab = () => {
	const { pools, loadPools } = useProfileContext();

	useEffect(() => {
		console.log("pools tab");
		loadPools();
	}, []);

	return (
		<div>
			{pools?.map((pool) => (
				<PoolCard key={pool.slug} poolData={pool} />
			))}
		</div>
	);
};
