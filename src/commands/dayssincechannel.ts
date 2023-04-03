import { ApplicationCommandOptionType, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { getCurrentDay, updateMOTD } from '../lib/motd';

export const definition: RESTPostAPIChatInputApplicationCommandsJSONBody = {
	name: 'dayssincechannel',
	description: 'set motd of the channel',
	default_member_permissions: (1 << 3).toString(), // Administrator
	options: [
		{
			name: 'channel',
			description: 'channel to set',
			required: true,
			type: ApplicationCommandOptionType.Channel,
		},
	],
};

export async function handle(cmd: Command) {
	const channelId = cmd.data.options[0].value.toString();
	console.log('channelId', channelId);
	if (!channelId) {
		return new Response(
			JSON.stringify({
				type: 4,
				data: {
					content: 'insufficient channel',
					flags: (1 << 6).toString(), // ephemeral
				},
			}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	}

	SCORE.put('scorechannel-' + cmd.guild_id, channelId);
	await updateMOTD(channelId, getCurrentDay());

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				content: 'updated scoreboard channel',
				flags: (1 << 6).toString(), // ephemeral
			},
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
}

export default handle;
