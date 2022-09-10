import { useEffect } from "react";

export const SubscriberFeedTab = () => {
	useEffect(() => {
		console.log("subscriber feed tab");
	}, []);

	return (
		<div>
			<p>Subscribe to access this special feed.</p>
		</div>
	);
};
