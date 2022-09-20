import PuffLoader from "react-spinners/PuffLoader";

export const LoadingPage = () => (
	<div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center w-full h-screen bg-background ">
		<PuffLoader size="80px" speedMultiplier={0.5} color="#aeaeae" />
	</div>
);
