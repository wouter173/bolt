interface Embed {
	title?: string;
	type?: string;
	url?: string;
	description?: string;
	timestamp?: string;
	color?: number;
	footer?: Footer;
	image?: Image;
	thumbnail?: Image;
	video?: Image;
	author?: Author;
	provider?: Provider;
	fields?: Field[];
}

interface Footer {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

interface Image {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

interface Provider {
	name?: string;
	url?: string;
}

interface Author {
	name?: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

interface Field {
	name: string;
	value: string;
	inline: boolean;
}
