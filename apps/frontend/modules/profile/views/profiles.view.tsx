import { PolyButton } from "@components/poly-button/poly-button";
import { useAccount } from "@modules/account/state/use-account";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { Post } from "@modules/refound/models/post.model";
import type { Profile } from "@modules/refound/models/profile.model";
import { toast } from "@services/toast/toast";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

export const ProfilesView: NextPage = () => {
	const { account } = useAccount();
	const { getAllProfiles } = useRefoundContracts();
	const [profiles, setProfiles] = useState<Profile[]>([]);

	useEffect(() => {
		getAllProfiles().then((maybeProfiles) =>
			maybeProfiles.match({
				ok: (profiles) => {
					setProfiles(profiles);
				},
				fail: (err) => {
					console.error(err);
					toast.error("Could not load profiles.");
				},
			}),
		);
	}, [account.address]);

	return (
		<section>
			<h1 className="font-bold">Profiles</h1>
			<pre>{JSON.stringify(profiles, null, "\t")}</pre>
		</section>
	);
};
