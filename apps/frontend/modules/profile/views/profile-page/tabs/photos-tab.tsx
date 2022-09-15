import { PhotographCard } from "@modules/posts/components/photograph-card";
import { ProfileContext, useProfileContext } from "@modules/mocks/profile-context";
import { useEffect } from "react";

export const PhotosTab = () => {
	const { loadPhotographs, photographs } = useProfileContext();

	useEffect(() => {
		console.log("photos tab");
		loadPhotographs();
	}, []);

	return (
		<div className="flex flex-col gap-8">
			{photographs?.map((photo) => (
				<PhotographCard key={photo.id} photoData={photo} />
			))}
		</div>
	);
};
