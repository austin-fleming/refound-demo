export const HomeIcon = ({
	className = "",
	filled = false,
}: {
	className?: string;
	filled?: boolean;
}) => {
	// https://fluenticons.co/ - home
	return filled ? (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10.55 2.533a2.25 2.25 0 0 1 2.9 0l6.75 5.695c.508.427.8 1.056.8 1.72v9.802a1.75 1.75 0 0 1-1.75 1.75h-3a1.75 1.75 0 0 1-1.75-1.75v-5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0-.75.75v5a1.75 1.75 0 0 1-1.75 1.75h-3A1.75 1.75 0 0 1 3 19.75V9.947c0-.663.292-1.292.8-1.72l6.75-5.694Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24">
			<path
				d="M10.55 2.532a2.25 2.25 0 0 1 2.9 0l6.75 5.692c.507.428.8 1.057.8 1.72v9.803a1.75 1.75 0 0 1-1.75 1.75h-3.5a1.75 1.75 0 0 1-1.75-1.75v-5.5a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25v5.5a1.75 1.75 0 0 1-1.75 1.75h-3.5A1.75 1.75 0 0 1 3 19.747V9.944c0-.663.293-1.292.8-1.72l6.75-5.692Zm1.933 1.147a.75.75 0 0 0-.966 0L4.767 9.37a.75.75 0 0 0-.267.573v9.803c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-5.5c0-.967.784-1.75 1.75-1.75h3.5c.966 0 1.75.783 1.75 1.75v5.5c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25V9.944a.75.75 0 0 0-.267-.573l-6.75-5.692Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const BellIcon = ({
	className = "",
	filled = false,
}: {
	className?: string;
	filled?: boolean;
}) => {
	// https://fluenticons.co/ - alert
	return filled ? (
		<svg className={className} viewBox="0 0 24 24">
			<path
				d="M9.042 19.003h5.916a3 3 0 0 1-5.916 0Zm2.958-17a7.5 7.5 0 0 1 7.5 7.5v4l1.418 3.16A.95.95 0 0 1 20.052 18h-16.1a.95.95 0 0 1-.867-1.338l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24">
			<path
				d="M12 1.996a7.49 7.49 0 0 1 7.496 7.25l.004.25v4.097l1.38 3.156a1.25 1.25 0 0 1-1.145 1.75L15 18.502a3 3 0 0 1-5.995.177L9 18.499H4.275a1.251 1.251 0 0 1-1.147-1.747L4.5 13.594V9.496c0-4.155 3.352-7.5 7.5-7.5ZM13.5 18.5l-3 .002a1.5 1.5 0 0 0 2.993.145l.006-.147ZM12 3.496c-3.32 0-6 2.674-6 6v4.41L4.656 17h14.697L18 13.907V9.509l-.004-.225A5.988 5.988 0 0 0 12 3.496Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const PlusIcon = ({
	className = "",
	filled = false,
}: {
	className?: string;
	filled?: boolean;
}) => {
	// https://fluenticons.co/ - add
	return filled ? (
		<svg className={className} viewBox="0 0 24 24">
			<path
				d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24">
			<path
				d="M11.75 3a.75.75 0 0 1 .743.648l.007.102.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const MoreIcon = ({
	className = "",
	filled = false,
}: {
	className?: string;
	filled?: boolean;
}) => {
	// https://fluenticons.co/ - more horizontal
	return filled ? (
		<svg className={className} viewBox="0 0 24 24">
			<path
				d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM18 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24">
			<path
				d="M7.75 12a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0ZM13.75 12a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0ZM18 13.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const MoreVerticalIcon = ({
	className = "",
	filled = false,
}: {
	className?: string;
	filled?: boolean;
}) => {
	// https://fluenticons.co/ - more vertical
	return filled ? (
		<svg className={className} viewBox="0 0 24 24">
			<path
				d="M12 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24">
			<path
				d="M12 7.75a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM12 13.75a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM10.25 18a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0Z"
				fill="currentColor"
			/>
		</svg>
	);
};

/* export const MenuIcon = ({
	className = "",
	filled = false,
}: {
	className?: string;
	filled?: boolean;
}) => {
	// https://fluenticons.co/ - list
	// https://fluenticons.co/ - navigation
	// https://fluenticons.co/ - more
	return filled ? (
		<svg className={className} viewBox="0 0 30 30">
			<path
				fill="currentColor"
				d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 30 30">
			<path
				d="M10.55 2.532a2.25 2.25 0 0 1 2.9 0l6.75 5.692c.507.428.8 1.057.8 1.72v9.803a1.75 1.75 0 0 1-1.75 1.75h-3.5a1.75 1.75 0 0 1-1.75-1.75v-5.5a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25v5.5a1.75 1.75 0 0 1-1.75 1.75h-3.5A1.75 1.75 0 0 1 3 19.747V9.944c0-.663.293-1.292.8-1.72l6.75-5.692Zm1.933 1.147a.75.75 0 0 0-.966 0L4.767 9.37a.75.75 0 0 0-.267.573v9.803c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-5.5c0-.967.784-1.75 1.75-1.75h3.5c.966 0 1.75.783 1.75 1.75v5.5c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25V9.944a.75.75 0 0 0-.267-.573l-6.75-5.692Z"
				fill="currentColor"
			/>
		</svg>
	);
}; */

export const CompassIcon = ({
	className = "",
	filled = false,
}: {
	className?: string;
	filled?: boolean;
}) => {
	// https://fluenticons.co/ - compass northwest
	return filled ? (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="currentColor"
				d="M3.25 11h-1.2A10.003 10.003 0 0 1 11 2.05v1.2a.75.75 0 0 0 1.5 0V2.013c4.957.244 8.965 4.097 9.451 8.987h-1.2a.75.75 0 0 0 0 1.5h1.237a10 10 0 0 1-9.488 9.488V20.75a.75.75 0 0 0-1.5 0v1.201c-4.89-.486-8.743-4.494-8.987-9.45H3.25a.75.75 0 0 0 0-1.5Zm11.404.526a4 4 0 0 0-2.196-2.14L8.43 7.781a.5.5 0 0 0-.65.65l1.606 4.028a4 4 0 0 0 2.14 2.195l4.325 1.854a.5.5 0 0 0 .657-.656l-1.854-4.326Z"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M8.707 7.084c-1.02-.407-2.03.604-1.624 1.624l1.606 4.028a4.75 4.75 0 0 0 2.541 2.607l4.325 1.854c1.038.445 2.086-.604 1.642-1.641l-1.854-4.326a4.75 4.75 0 0 0-2.607-2.541L8.707 7.084Zm1.375 5.096-1.39-3.488 3.488 1.39a3.25 3.25 0 0 1 1.784 1.74l1.608 3.75-3.751-1.607a3.25 3.25 0 0 1-1.739-1.785Z"
				fill="currentColor"
			/>
			<path
				d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-7.75 9h-.692A8.504 8.504 0 0 1 11 3.558v.692a.75.75 0 0 0 1.5 0v-.736A8.502 8.502 0 0 1 20.442 11h-.692a.75.75 0 0 0 0 1.5h.735a8.501 8.501 0 0 1-7.985 7.985v-.735a.75.75 0 0 0-1.5 0v.692A8.502 8.502 0 0 1 3.514 12.5h.736a.75.75 0 0 0 0-1.5Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const ChatIcon = ({
	className = "",
	filled = false,
}: {
	className?: string;
	filled?: boolean;
}) => {
	// https://fluenticons.co/ - comment
	return filled ? (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.25 18A3.25 3.25 0 0 1 2 14.75v-8.5A3.25 3.25 0 0 1 5.25 3h13.5A3.25 3.25 0 0 1 22 6.25v8.5A3.25 3.25 0 0 1 18.75 18h-5.785l-5.387 3.817A1 1 0 0 1 6 21.002V18h-.75Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.25 18A3.25 3.25 0 0 1 2 14.75v-8.5A3.25 3.25 0 0 1 5.25 3h13.5A3.25 3.25 0 0 1 22 6.25v8.5A3.25 3.25 0 0 1 18.75 18h-5.738L8 21.75a1.25 1.25 0 0 1-1.999-1V18h-.75Zm7.264-1.5h6.236a1.75 1.75 0 0 0 1.75-1.75v-8.5a1.75 1.75 0 0 0-1.75-1.75H5.25A1.75 1.75 0 0 0 3.5 6.25v8.5c0 .966.784 1.75 1.75 1.75h2.249v3.75l5.015-3.75Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const CommunityIcon = ({
	className = "",
	filled = false,
}: {
	className?: string;
	filled?: boolean;
}) => {
	// https://fluenticons.co/ - people community
	return filled ? (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M14.75 15c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297-2.91 0-4.567-1.09-4.567-3.259v-1c0-.966.784-1.75 1.75-1.75h5.5Zm-11-5h4.376a4.007 4.007 0 0 0 1.067 3.85l.162.151L9.25 14a2.75 2.75 0 0 0-2.649 2.008l-.034.001C3.657 16.009 2 14.919 2 12.75v-1c0-.966.784-1.75 1.75-1.75Zm16.5 0c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297l-.169-.002a2.756 2.756 0 0 0-2.451-2L14.75 14l-.105.001a3.99 3.99 0 0 0 1.229-4L20.25 10ZM12 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM6.5 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm11 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M14.75 15c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297-2.91 0-4.567-1.09-4.567-3.259v-1c0-.966.784-1.75 1.75-1.75h5.5Zm0 1.5h-5.5a.25.25 0 0 0-.25.25v1c0 1.176.887 1.759 3.067 1.759 2.168 0 2.995-.564 2.933-1.757V16.75a.25.25 0 0 0-.25-.25Zm-11-6.5h4.376a4.007 4.007 0 0 0-.095 1.5H3.75a.25.25 0 0 0-.25.25v1c0 1.176.887 1.759 3.067 1.759.462 0 .863-.026 1.207-.077a2.743 2.743 0 0 0-1.173 1.576l-.034.001C3.657 16.009 2 14.919 2 12.75v-1c0-.966.784-1.75 1.75-1.75Zm16.5 0c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297l-.169-.002a2.755 2.755 0 0 0-1.218-1.606c.387.072.847.108 1.387.108 2.168 0 2.995-.564 2.933-1.757V11.75a.25.25 0 0 0-.25-.25h-4.28a4.05 4.05 0 0 0-.096-1.5h4.376ZM12 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM6.5 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm11 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm-11 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm11 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
				fill="currentColor"
			/>
		</svg>
	);
};
