export default async (cmd: Command): Promise<Response> => {
    let k = cmd.data.options[0].value as string;
    let v = await SCORE.get(k);
    console.log(v)
    let real_v = (v == null? '1': (parseInt(v as unknown as string) +1) + '')
    await SCORE.put(k, real_v);

    const embed: Embed = {
		title: `:cold_face: **${k}** score`,
		description: `\`\`\`${real_v}\`\`\``,
	};

    return new Response(JSON.stringify({
        type: 4,
        data: {
            content: '',
            embeds: [embed]
        }
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}