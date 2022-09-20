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

export const ThumbsUpIcon = ({
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
				d="M15.057 9.004c.46-1.427.693-2.676.693-3.753 0-2.399-.939-4.248-2.5-4.248-.847 0-1.109.505-1.437 1.747.017-.065-.163.634-.215.821-.101.36-.277.97-.527 1.831a.247.247 0 0 1-.03.065L8.175 9.953A5.885 5.885 0 0 1 5.32 12.28l-1.257.481a1.75 1.75 0 0 0-1.092 1.968l.686 3.538a2.25 2.25 0 0 0 1.673 1.757l8.25 2.022a4.75 4.75 0 0 0 5.733-3.44l1.574-6.173a2.75 2.75 0 0 0-2.665-3.429h-3.165Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M16.5 5.202c0-2.442-1.14-4.199-3.007-4.199-1.026 0-1.378.602-1.746 2-.075.289-.112.43-.151.568-.101.359-.277.97-.527 1.831a.25.25 0 0 1-.03.065L8.174 9.953a5.885 5.885 0 0 1-2.855 2.326l-.473.181a2.75 2.75 0 0 0-1.716 3.092l.404 2.086a3.25 3.25 0 0 0 2.417 2.538l7.628 1.87a4.75 4.75 0 0 0 5.733-3.44l1.415-5.55a3.25 3.25 0 0 0-3.15-4.052h-1.822c.496-1.633.746-2.893.746-3.802ZM4.6 15.267a1.25 1.25 0 0 1 .78-1.406l.474-.18a7.385 7.385 0 0 0 3.582-2.92l2.867-4.486c.09-.141.159-.294.205-.455.252-.865.428-1.479.53-1.843.044-.153.085-.308.159-.592.19-.722.283-.882.295-.882.868 0 1.507.984 1.507 2.7 0 .884-.326 2.335-.984 4.314a.75.75 0 0 0 .711.987h2.85a1.751 1.751 0 0 1 1.696 2.182l-1.415 5.55a3.25 3.25 0 0 1-3.923 2.353l-7.628-1.87a1.75 1.75 0 0 1-1.301-1.366L4.6 15.267Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const ThumbsDownIcon = ({
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
				d="M15.057 14.183c.46 1.427.693 2.676.693 3.753 0 2.399-.939 4.248-2.5 4.248-.8 0-1.078-.45-1.383-1.547l-.27-1.021c-.1-.359-.276-.97-.526-1.831a.246.246 0 0 0-.03-.065l-2.866-4.486a5.886 5.886 0 0 0-2.855-2.327l-1.257-.48A1.75 1.75 0 0 1 2.97 8.458l.686-3.539A2.25 2.25 0 0 1 5.33 3.163l8.25-2.022a4.75 4.75 0 0 1 5.733 3.44l1.574 6.173a2.75 2.75 0 0 1-2.665 3.429h-3.165Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M16.5 17.985c0 2.442-1.14 4.198-3.007 4.198-.975 0-1.341-.542-1.69-1.795l-.207-.772c-.101-.359-.277-.97-.527-1.831a.249.249 0 0 0-.03-.065l-2.866-4.486a5.886 5.886 0 0 0-2.855-2.327l-.473-.18A2.75 2.75 0 0 1 3.13 7.634l.404-2.087A3.25 3.25 0 0 1 5.95 3.011l7.628-1.87a4.75 4.75 0 0 1 5.733 3.44l1.415 5.55a3.25 3.25 0 0 1-3.15 4.052h-1.822c.496 1.633.746 2.893.746 3.802ZM4.6 7.92a1.25 1.25 0 0 0 .78 1.405l.474.182a7.385 7.385 0 0 1 3.582 2.92l2.867 4.485c.09.14.159.294.205.454l.552 1.92.212.792c.14.488.21.605.22.605.868 0 1.507-.984 1.507-2.698 0-.885-.326-2.336-.984-4.315a.75.75 0 0 1 .711-.987h2.85a1.751 1.751 0 0 0 1.696-2.182l-1.415-5.55a3.25 3.25 0 0 0-3.923-2.353l-7.628 1.87a1.75 1.75 0 0 0-1.301 1.366L4.6 7.92Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const CircleArrowUpIcon = ({
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
				d="M22 12.001c0-5.523-4.476-10-10-10-5.522 0-10 4.477-10 10s4.478 10 10 10c5.524 0 10-4.477 10-10Zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.085 4-4a.75.75 0 0 1 .977-.073l.085.073 4 4.001a.75.75 0 0 1-.977 1.133l-.084-.072-2.72-2.722v6.691a.75.75 0 0 1-.649.744L12 17a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.073l-.084-.073Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="m7.47 12.281.084.073a.75.75 0 0 0 .977-.073l2.72-2.72v6.69l.006.102a.75.75 0 0 0 .743.648l.102-.006a.75.75 0 0 0 .648-.744V9.56l2.72 2.722.085.072a.75.75 0 0 0 .977-1.133l-4-4.001-.085-.073a.75.75 0 0 0-.976.073l-4.001 4-.073.085a.75.75 0 0 0 .073.976Z"
				fill="currentColor"
			/>
			<path
				d="M22 12.001c0-5.523-4.476-10-10-10-5.522 0-10 4.477-10 10s4.478 10 10 10c5.524 0 10-4.477 10-10Zm-18.5 0a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const CircleArrowDownIcon = ({
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
				d="M1.999 12c0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.524-4.477-10-10-10s-10 4.476-10 10Zm14.53-.28a.75.75 0 0 1 .073.976l-.072.084-4.001 4a.75.75 0 0 1-.977.073l-.084-.073-4-4.001a.75.75 0 0 1 .977-1.133l.084.073 2.72 2.722V7.748a.75.75 0 0 1 .649-.743l.101-.007a.75.75 0 0 1 .743.648l.007.102v6.69l2.72-2.72a.75.75 0 0 1 .977-.072l.084.072Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="m16.53 11.72-.084-.074a.75.75 0 0 0-.977.073l-2.72 2.72v-6.69l-.007-.102A.75.75 0 0 0 12 6.999l-.101.007a.75.75 0 0 0-.649.743v6.692l-2.72-2.722-.084-.073a.75.75 0 0 0-.977 1.133l4 4.002.084.072a.75.75 0 0 0 .977-.072l4-4.001.073-.084a.75.75 0 0 0-.072-.977ZM1.999 12c0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.524-4.477-10-10-10s-10 4.476-10 10Zm18.5 0a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const FlagIcon = ({
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
				d="M3 3.747a.75.75 0 0 1 .75-.75h16.504a.75.75 0 0 1 .6 1.2L16.69 9.748l4.164 5.552a.75.75 0 0 1-.6 1.2H4.5v4.749a.75.75 0 0 1-.648.743L3.75 22a.75.75 0 0 1-.743-.648L3 21.249V3.747Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M3 3.747a.75.75 0 0 1 .75-.75h16.504a.75.75 0 0 1 .6 1.2L16.69 9.748l4.164 5.552a.75.75 0 0 1-.6 1.2H4.5v4.749a.75.75 0 0 1-.648.743L3.75 22a.75.75 0 0 1-.743-.648L3 21.249V3.747Zm15.754.75H4.5V15h14.254l-3.602-4.802a.75.75 0 0 1 0-.9l3.602-4.8Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const UpArrowIcon = ({
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
				d="m7.293 8.293 3.995-4a1 1 0 0 1 1.32-.084l.094.083 4.006 4a1 1 0 0 1-1.32 1.499l-.094-.083-2.293-2.291v11.584a1 1 0 0 1-.883.993L12 20a1 1 0 0 1-.993-.884L11 19.001V7.41L8.707 9.707a1 1 0 0 1-1.32.084l-.094-.084a1 1 0 0 1-.084-1.32l.084-.094 3.995-4-3.995 4Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="m6.72 8.715 4.494-4.495a.75.75 0 0 1 .976-.073l.085.072 4.504 4.495a.75.75 0 0 1-.975 1.134l-.084-.072-3.223-3.217v12.696a.75.75 0 0 1-.648.743l-.101.007a.75.75 0 0 1-.743-.648l-.007-.102-.001-12.698L7.78 9.775a.75.75 0 0 1-.976.073l-.084-.073a.75.75 0 0 1-.073-.976l.073-.084 4.494-4.495L6.72 8.715Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const DownArrowIcon = ({
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
				d="M11.883 4.01 12 4.003a1 1 0 0 1 .993.884l.007.116v11.584l2.293-2.294a1 1 0 0 1 1.32-.084l.094.084a1 1 0 0 1 .084 1.32l-.084.094-3.996 4a1 1 0 0 1-1.32.084l-.094-.084-4.004-4a1 1 0 0 1 1.32-1.498l.094.084L11 16.582V5.003a1 1 0 0 1 .883-.993L12 4.003l-.117.007Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="m11.65 4.007.1-.007a.75.75 0 0 1 .744.648l.007.102-.001 12.696 3.22-3.221a.75.75 0 0 1 .976-.073l.084.072a.75.75 0 0 1 .073.977l-.072.084-4.497 4.5a.75.75 0 0 1-.976.073l-.084-.073-4.504-4.5a.75.75 0 0 1 .976-1.133l.084.072L11 17.442V4.75a.75.75 0 0 1 .65-.743l.1-.007-.1.007Z"
				fill="currentColor"
			/>
		</svg>
	);
};
