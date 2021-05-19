export default async (cmd: Command): Promise<Response> => {
	const res = await fetch(new Request('http://api.urbandictionary.com/v0/define?term=' + cmd.data.options[0].value));
	const data = await res.json();
	const article: Article = data.list[0];

	const embed: Embed = {
		title: `:books: **${article.word}**`,
		color: 3092790,
		fields: [
			{
				name: 'definition',
				value: article.definition,
				inline: false,
			},
			{
				name: 'example',
				value: article.example,
				inline: false,
			},
		],
	};

	return new Response(JSON.stringify({ type: 4, data: { content: '', embeds: [embed] } }), {
		headers: { 'Content-Type': 'application/json' },
	});
};
