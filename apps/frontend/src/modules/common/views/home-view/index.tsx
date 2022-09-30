import { useUI } from "@modules/common/hooks/ui-context";
import HeroImage from "../../../../../public/assets/printing-machine-etching.jpg";
import NextImage from "next/image";

export const HomeView = () => (
	<>
		<section className="relative w-full h-[110vh] pt-headerTopHeight">
			<div className="relative w-full h-full max-w-screen-2xl p-contentPadding">
				<div className="relative z-[10] text-stone-800 flex flex-col h-full justify-between pb-[10vh]">
					<h1 className="text-[10vw] max-w-[80%] leading-[10vw] font-bold text-stone-800">
						{/* Toward A Freer
							<br />
							Journalism */}
						<span className="text-[8vw] font-normal italic">the</span> Platform
						<br />
						<span className="text-[8vw] font-normal italic">for the</span> Frontline
						{/* Own the Stories You Share with the World */}
					</h1>

					<p className="relative text-xl">Empowered and Protected on the Blockchain</p>

					<div className="flex flex-row gap-4">
						<a href="/sign-in" className="btn btn-lg">
							Sign Up
						</a>
						<button className="btn btn-lg btn-outline">Learn More</button>
					</div>
				</div>

				<figure className="absolute top-0 bottom-0 right-0 w-[100%] z-0">
					<NextImage src={HeroImage} layout="fill" objectFit="cover" />
					<span className="relative block w-full h-full bg-gradient-to-l from-background/80 to-background" />
				</figure>
			</div>
		</section>
		<section className="h-[200vh] w-full max-w-screen-lg mx-auto"></section>
	</>
);
