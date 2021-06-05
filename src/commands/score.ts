export default async (cmd: Command): Promise<Response> => {
    let embed: Embed

    if(cmd.data.options){
        let k = cmd.data.options[0].value
        let v = await SCORE.get(k as string)

        embed = {
			title: `:hot_face: ${k} score`,
			description: `\`\`\` ${v} \`\`\``,
		};
    } else {
        let k = await SCORE.list()

        embed = {
			title: `:hot_face: all scores`,
			description: `\`\`\` ${k.keys.map(b => b.name + '\n')} \`\`\``,
		};
    }

    return new Response(JSON.stringify({
        type: 4,
        data: {
            content: '',
            embeds: [embed]
        }
    }),{
        headers: {'Content-Type': 'application/json'}
    })
}