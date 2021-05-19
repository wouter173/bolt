interface Command {
	id: string;
	guild_id: string;
	channel_id: string;
	application_id: string;
	type: number;
	token: string;
	version: number;
	member: Member;
	data: Data;
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

interface User {
	id: string;
	avatar: string;
	username: string;
	discriminator: string;
	public_flags: number;
}

interface Data {
	id: string;
	name: string;
	options: Option[];
}

interface Option {
	type: number;
	name: string;
	value: string | boolean | number;
}
