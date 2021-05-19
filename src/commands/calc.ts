import { Parser } from 'expr-eval';

export default async (cmd: Command): Promise<Response> => {
	const expr = cmd.data.options[0].value;
	const answer = Parser.parse(expr as string).evaluate(undefined);

	const embed: Embed = {
		title: ':abacus: **Calc**',
		description: `\`\`\`js\n${expr} = ${answer}\n\`\`\``,
		color: 3092790,
	};

	return new Response(JSON.stringify({ type: 4, data: { content: '', embeds: [embed] } }), {
		headers: { 'Content-Type': 'application/json' },
	});
};
