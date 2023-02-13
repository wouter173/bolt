import verify from './middleware/verify';
import calc from './commands/calc';
import urban from './commands/urban';
import ball, { reroll } from './commands/8ball';
import clap from './commands/clap';
import love from './commands/love';
import sparkles from './commands/sparkles';
import poll, { vouch } from './commands/poll';
import plusplus from './commands/plusplus';
import sparkleclap from './commands/sparkleclap';
import score from './commands/score';
import timer from './commands/timer';

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(req: Request) {
	const body = await req.text();

	const res = await verify(req, body);
	if (res != null) return res;

	const interaction: Interaction = JSON.parse(body);
	if (interaction.type == 1) {
		return new Response(JSON.stringify({ type: 1 }), {
			headers: { 'content-type': 'application/json' },
		});
	}

	if (interaction.type == 2) {
		const cmd = interaction as Command;
		switch (cmd.data.name) {
			case 'timer':
				return timer(cmd);

			case 'calc':
				return calc(cmd);

			case 'urban':
				return urban(cmd);

			case '8ball':
				return ball(cmd);

			case 'clap':
				return clap(cmd);

			case 'love':
				return love(cmd);

			case 'sparkles':
				return sparkles(cmd);

			case 'poll':
				return poll(cmd);

			case 'pp':
				return plusplus(cmd);

			case 'sparkleclap':
				return sparkleclap(cmd);

			case 'score':
				return score(cmd);
		}
	} else if (interaction.type == 3) {
		const comp = interaction as Component;
		switch (comp.data.custom_id) {
			case 'reroll':
				return reroll(comp);

			case 'vouch':
				return vouch(comp, false);

			case 'unvouch':
				return vouch(comp, true);
		}
	}

	console.log(JSON.stringify(interaction));
	return new Response();
}
