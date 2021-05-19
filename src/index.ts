import verify from './middleware/verify';
import calc from './commands/calc';
import urban from './commands/urban';
import ball from './commands/8ball';
import clap from './commands/clap';
import love from './commands/love';
import sparkles from './commands/sparkles';

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(req: Request) {
	const body = await req.text();

	const res = await verify(req, body);
	if (res != null) return res;

	const cmd: Command = JSON.parse(body);
	if (cmd.type == 1) {
		return new Response(JSON.stringify({ type: 1 }), {
			headers: { 'content-type': 'application/json' },
		});
	}

	switch (cmd.data.name) {
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

		default:
			console.log(cmd);
			return new Response();
	}
}
