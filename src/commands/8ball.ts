export default async (cmd: Command): Promise<Response> => {
	const answers = [
		'yes',
		'no',
		'perhaps',
		'maybe',
		'definetly',
		'hell no',
		'obviously',
		'no you dumb fuck',
		'are you litteraly retarded?',
		'why the fuck would you say that',
		'NOO',
		'lmao, sometimes',
		'only on saturdays',
		'if she is okay with it.',
		'I digress but you do you',
		'fuck no',
		'bruh',
		'are you kidding me?',
		'fuck you',
		'shut the fuck up dumb cunt.',
		'hou je domme kanker bek',
		'suck my cock you',
		'eat ass',
		'you are gay',
		'skullfucked gremlin',
		'shitass bitch',
		'fuck you',
		'dumb fucking moron',
	];

	const embed: Embed = {
		title: ':8ball: **8ball**',
		description: `
            \`\`\`${cmd.data.options[0].value}\`\`\`
            \`\`\`${answers[Math.floor(Math.random() * answers.length)]}\`\`\`
        `,
		color: 3092790,
	};

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				embeds: [embed],
				content: '',
			},
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);
};
