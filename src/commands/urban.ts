export default async (cmd: Command): Promise<Response> => {
	const keyword = cmd.data.options[0].value;
	if (keyword == 'maishond') {
		const embed: Embed = {
			title: `:books: **maishond**`,
			color: 15958048,
			fields: [
				{
					name: 'definition',
					value:
						"Maishond is the most toxic and wholesome place on the internet. If you are a member of maishond you are vouching to create a gay people - safe space - for the retarded, called 'maiscrib.'",
					inline: false,
				},
				{
					name: 'example',
					value: 'Dude, I just had the worst day of my life and now some people on the internet are making fun of me.\nBro, thats [maishond]',
					inline: false,
				},
			],
		};

		return new Response(JSON.stringify({ type: 4, data: { content: '', embeds: [embed] } }), {
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const res = await fetch(new Request('http://api.urbandictionary.com/v0/define?term=' + cmd.data.options[0].value));
	const data = await res.json();
	const article: Article = data.list[0];

	const embed: Embed = {
		title: `:books: **${article.word}**`,
		color: 15958048,
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
