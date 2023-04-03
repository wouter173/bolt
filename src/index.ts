import verify from './middleware/verify';
import calc from './commands/calc';
import urban from './commands/urban';
import ball from './commands/8ball';
import clap from './commands/clap';
import love from './commands/love';
import sparkles from './commands/sparkles';
import poll, { vouch } from './commands/poll';
import plusplus from './commands/plusplus';
import sparkleclap from './commands/sparkleclap';
import score from './commands/score';
import timer from './commands/timer';
import usage from './commands/usage';
import dayssince from './commands/dayssince';
import { updateAllMOTD } from './lib/motd';
import motd from './commands/motd';

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event));
});

addEventListener('scheduled', async event => {
	console.log('ayo');
	await updateAllMOTD();
});

async function handleRequest(event: FetchEvent) {
	const req = event.request;
	const url = new URL(req.url);

	const res = await verify(req);
	if (res != null) return res;

	const interaction: Interaction = await req.json();
	if (interaction.type == 1) {
		return new Response(JSON.stringify({ type: 1 }), {
			headers: { 'content-type': 'application/json' },
		});
	}

	if (interaction.type == 2) {
		const cmd = interaction as Command;
		switch (cmd.data.name) {
			case 'motd':
				return motd(cmd);
			case 'dayssince':
				return dayssince(cmd);

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

			case 'usage':
				return usage(cmd);
		}
	} else if (interaction.type == 3) {
		const comp = interaction as Component;
		switch (comp.data.custom_id) {
			case 'vouch':
				return vouch(comp, false);

			case 'unvouch':
				return vouch(comp, true);
		}
	}

	console.log(JSON.stringify(interaction));
	return new Response();
}
