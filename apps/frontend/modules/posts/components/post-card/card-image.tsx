import NextImage from "next/image";

export const CardImage = ({ src, alt }: { src: string; alt: string }) => (
	<figure className="relative w-full pb-[75%] rounded-md overflow-hidden">
		<NextImage src={src} alt={alt} layout="fill" objectFit="cover" objectPosition="center" />
	</figure>
);
