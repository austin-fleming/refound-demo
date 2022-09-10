import { useProfileContext } from "@modules/api/profile-context";
import { useEffect } from "react";

export const AboutTab = () => {
	const { profileData } = useProfileContext();

	useEffect(() => {
		console.log("about tab");
	}, []);

	return (
		<div>
			<h2 className="font-bold">Bio</h2>
			<div className="text-lg">{profileData?.bio}</div>
		</div>
	);
};
