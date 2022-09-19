/* eslint-disable security/detect-object-injection */
import type { ButtonHTMLAttributes, ReactElement } from "react";
import NextLink from "next/link";
import S from "./poly-button.module.css";
import { RightArrowIcon } from "@components/icons/arrow-icons";

type ButtonColor = "primary" | "secondary" | "inverted" | "accent";
type ButtonStyle = "solid" | "outline" | "ghost" | "text";
type ButtonKind = "link" | "button" | "pseudo";
type ButtonSize = "sm" | "base" | "lg";
type ButtonIcon = "rightArrow";

type BaseProps = {
	label: string;
	color?: ButtonColor;
	style?: ButtonStyle;
	size?: ButtonSize;
	isDisabled?: boolean;
	icon?: ButtonIcon;
	fullWidth?: boolean;
	align?: "center" | "left";
	className?: string;
};

type LinkProps = {
	as: "link";
	to: string;
	isExternal: boolean;
	preload?: boolean;
};

type AsButtonProps = BaseProps &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
		as: "button";
	};

type AsLinkProps = BaseProps &
	Omit<LinkProps, keyof BaseProps> & {
		as: "link";
		to: string;
		isExternal: boolean;
		preload?: boolean;
	};

type AsPseudoProps = BaseProps & { as: "pseudo" };

type PolyButtonProps = AsButtonProps | AsLinkProps | AsPseudoProps;

// TABLES
const sizeClasses: Record<ButtonSize, string> = {
	sm: S.sizeSm,
	base: S.sizeBase,
	lg: S.sizeLg,
};
const colorClasses: Record<ButtonColor, string> = {
	primary: S.colorPrimary,
	secondary: S.colorSecondary,
	inverted: S.colorInverted,
	accent: S.colorAccent,
};

export const PolyButton = ({
	label,
	color = "primary",
	style = "solid",
	size = "base",
	align = "left",
	isDisabled = false,
	icon,
	fullWidth,
	className = "",
	...rest
}: PolyButtonProps) => {
	const { as } = rest;

	const classNames = `${S.btn} ${sizeClasses[size]} ${colorClasses[color]} ${
		isDisabled && S.isDisabled
	} ${fullWidth && S.fullWidth} ${align === "left" && S.alignLeft} ${
		align === "center" && S.alignCenter
	} ${className}`;

	if (as === "link") {
		const { to, isExternal, preload, ...linkRest } = rest;

		return (
			<NextLink href={to}>
				<a className={classNames} {...linkRest}>
					{label}
					{icon === "rightArrow" && <RightArrowIcon className="h-[0.85em] w-[0.85em]" />}
				</a>
			</NextLink>
		);
	}

	if (as === "button") {
		const { ...buttonRest } = rest;

		return (
			<button className={classNames} {...buttonRest}>
				<span className="w-full">{label}</span>
				{icon === "rightArrow" && <RightArrowIcon className="h-[0.85em] w-[0.85em]" />}
			</button>
		);
	}

	return <div className={classNames}>{label}</div>;
};
