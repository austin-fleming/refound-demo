import NextImage from "next/image";

export const CardImage = ({ src, alt }: { src: string; alt: string }) => (
	<figure className="relative w-full pb-[75%] rounded-md overflow-hidden">
		<img
			src={src}
			alt={alt}
			className="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full"
		/>
	</figure>
);
