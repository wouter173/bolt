import { RESTPostAPIChatInputApplicationCommandsJSONBody, ApplicationCommandOptionType } from 'discord-api-types/v10';
import * as cheerio from 'cheerio';

export const definition: RESTPostAPIChatInputApplicationCommandsJSONBody = {
	name: 'zorgtoeslag',
	description: 'zorgtoeslag data',
};

export async function handle(cmd: Command): Promise<Response> {
	const res = await fetch('https://www.belastingdienst.nl/wps/wcm/connect/nl/home/content/betaaldatums-toeslagen');
	const body = await res.text();

	const dom = cheerio.load(body);
	const days = dom('#bld-main-content > ul:nth-child(4) > li')
		.map((i, el) => dom(el).text())
		.get();

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				content: '```' + days.join('\n') + '```',
			},
		}),
		{ headers: { 'content-type': 'application/json' } },
	);
}

export default handle;
