import { ApplicationCommandOptionType, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { setMOTD } from '../lib/motd';

const daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'default'] as const;

export const definition: RESTPostAPIChatInputApplicationCommandsJSONBody = {
	name: 'motd',
	description: 'set motd of the channel',
	options: [
		{
			name: 'day',
			description: 'day of the week',
			required: true,
			type: ApplicationCommandOptionType.String,
			choices: daysOfTheWeek.map(day => ({ name: day, value: day })),
		},
		{
			name: 'message',
			description: 'message to set',
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	],
};

export const handle = async (command: Command) => {
	const day = command.data.options[0].value as typeof daysOfTheWeek[number];
	const message = command.data.options[1].value as string;

	await setMOTD(command.channel_id, day, message);

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				content: 'set motd on `' + day + '` to `' + message + '`',
				ephemeral: true,
			},
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);
};

export default handle;
