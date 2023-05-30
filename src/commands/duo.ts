import { RESTPostAPIChatInputApplicationCommandsJSONBody, ApplicationCommandOptionType } from 'discord-api-types/v10';
import * as cheerio from 'cheerio';

export const definition: RESTPostAPIChatInputApplicationCommandsJSONBody = {
	name: 'duo',
	description: 'duo dagen',
};

const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

export async function handle(cmd: Command): Promise<Response> {
	const res = await fetch('https://duo.nl/particulier/betaaldatums.jsp');
	const body = await res.text();

	const dom = cheerio.load(body);
	const days = dom('.content-background > div:nth-child(1) > ul:nth-child(3) > li')
		.map((i, el) => dom(el).text())
		.get()
		.map(s => {
			const elements = s.split(' ');
			const date = new Date();
			date.setDate(+elements[0]);
			date.setMonth(months.indexOf(elements[1]));
			return date;
		});

	const now = new Date().getTime();
	const offset = days.map(d => d.getTime() - now).filter(x => x > 0).length;

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				content:
					'```' + days.map((d, i) => d.getDate() + ' ' + months[d.getMonth()] + (days.length - offset == i ? '\t< volgende' : '')).join('\n') + '```',
			},
		}),
		{ headers: { 'content-type': 'application/json' } },
	);
}

export default handle;
