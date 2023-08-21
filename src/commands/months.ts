import { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v10';

export const definition: RESTPostAPIChatInputApplicationCommandsJSONBody = {
	name: 'months',
	description: 'stingalleman command',
};

const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

export async function handle(cmd: Command): Promise<Response> {
	const content = '```' + months.map((x, i) => `${i + 1}) ${x}`).join('\n') + '```';

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				content,
			},
		}),
		{ headers: { 'content-type': 'application/json' } },
	);
}

export default handle;
