export default async (cmd: Command): Promise<Response> => {
	const embed: Embed = {
		title: ':8ball: **8ball**',
		description: `
            \`\`\`${cmd.data.options[0].value}\`\`\`
            \`\`\`${answers[Math.floor(Math.random() * answers.length)]}\`\`\`
        `,
		color: 15958048,
	};

	const emoji: Emoji = {
		name: '🔂',
		animated: false,
	};

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				embeds: [embed],
				content: '',
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 1,
								label: 'Reroll',
								custom_id: 'reroll',
								emoji,
							},
						],
					},
				],
			},
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);
};

export const reroll = async (component: Component): Promise<Response> => {
	const embed: Embed = {
		title: ':8ball: **8ball**',
		description: `
            \`\`\`${component.message.embeds[0].description!.split('```')[1]}\`\`\`
            \`\`\`${answers[Math.floor(Math.random() * answers.length)]}\`\`\`
        `,
		color: 15958048,
	};

	return new Response(
		JSON.stringify({
			type: 7,
			data: {
				embeds: [embed],
				components: [],
			},
		}),
		{
			headers: { 'content-type': 'application/json' },
		},
	);
};

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
