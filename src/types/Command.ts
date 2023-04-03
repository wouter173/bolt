interface Component extends Interaction {
	data: ComponentData;
	message: Message;
}

interface Command extends Interaction {
	data: CommandData;
}

interface Interaction {
	id: string;
	guild_id: string;
	channel_id: string;
	application_id: string;
	type: number;
	token: string;
	version: number;
	member: Member;
}

interface Member {
	nick: string | null;
	avatar: string | null;
	mute: boolean;
	deaf: boolean;
	pending: boolean;
	is_pending: boolean;
	joined_at: string;
	premium_since: string | null;
	permissions: string;
	roles: string[];
	user: User;
}

interface Message {
	type: number;
	id: string;
	webhook_id: string;
	application_id: string;
	channel_id: string;
	content: string;
	author: User;
	edited_timestamp: string;
	timestamp: string;
	components: MessageComponent[];
	interaction: {
		id: number;
		type: number;
		name: string;
		user: User;
	};
	embeds: Embed[];
	flags: number;
	pinned: boolean;
	tts: boolean;
	mention_everyone: boolean;
	mention_roles: string[];
	mentions: string[];
}

interface MessageComponent {
	type: number;
	style?: number;
	label?: string;
	emoji?: string;
	custom_id?: string;
	url?: string;
	disabled?: boolean;
}

interface User {
	id: string;
	avatar: string;
	username: string;
	discriminator: string;
	public_flags?: number;
	bot?: boolean;
}

interface CommandData {
	id: string;
	name: string;
	options: Option[];
}

interface ComponentData {
	component_type: number;
	custom_id: string;
}

interface Option {
	type: number;
	name: string;
	value: string | boolean | number;
	options?: Option[];
}

interface Emoji {
	name?: string;
	id?: string;
	animated: boolean;
}
