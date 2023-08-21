import { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v10';

export const definition: RESTPostAPIChatInputApplicationCommandsJSONBody = {
	name: 'weeknr',
	description: 'weeknr',
};

export async function handle(cmd: Command): Promise<Response> {
	const currentDate = new Date();
	const startDate = new Date(currentDate.getFullYear(), 0, 1);
	var days = Math.floor((currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
	var weekNumber = Math.ceil(days / 7);

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				content: `\`\`\` weeknr: ${weekNumber}\`\`\``,
			},
		}),
		{ headers: { 'content-type': 'application/json' } },
	);
}

export default handle;
