import { useProfileContext } from "@modules/mocks/profile-context";
import { useEffect } from "react";

export const AboutTab = () => {
	const { profileData } = useProfileContext();

	return (
		<div>
			<h2 className="font-bold">Bio</h2>
			<div className="text-lg">{profileData?.bio}</div>
		</div>
	);
};
