import NextImage from "next/image";

export const AccountIcon = ({
	avatarSource,
	className = "",
}: {
	avatarSource?: string;
	className?: string;
}) => {
	avatarSource = avatarSource || "/assets/avatar-placeholder.png";
	return (
		<div className={`rounded-full overflow-hidden relative ${className}`}>
			<NextImage
				src={avatarSource}
				alt=""
				layout="fill"
				objectFit="cover"
				objectPosition="center"
			/>
		</div>
	);
};
