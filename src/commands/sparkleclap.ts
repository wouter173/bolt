export default async (cmd: Command): Promise<Response> => {
    const msg = (cmd.data.options[0].value as string).split(' ').filter(Boolean);
	const skintone = Math.floor(Math.random() * 6);
	const clap = ' :clap:' + (skintone ? `:skin-tone-${skintone}: ` : ' ');

	const out = msg.join(clap) + clap;

    return new Response(JSON.stringify({
        type: 4,
        data: {
            content: `:sparkles: _${out}_ :sparkles:`,
        }
    }), {
        headers: {'Content-Type': 'application/json'}
    })
}