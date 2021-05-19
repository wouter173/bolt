export default async (cmd: Command): Promise<Response> => {
	var love = 0;
	const name1: string = cmd.data.options[0].value as string;
	const name2: string = cmd.data.options[1].value as string;
	const points = ['L', 'O', 'V', 'E', 'Y', 'C', 'U', 'I', 'A', 'W', 'T', 'K'];

	(name1 + name2).split('').forEach(item => {
		if (points.includes(item.toUpperCase())) love += 1;
	});

	const percentage = Math.floor((love / (name1.length + name2.length)) * 100);
	const hearts = [
		':black_heart:',
		':broken_heart:',
		':brown_heart:',
		':yellow_heart:',
		':orange_heart:',
		':heart:',
		':heart_exclamation:',
		':two_hearts:',
		':revolving_hearts:',
		':cupid:',
		':sparkling_heart:',
	];
	let heart = hearts[+(percentage + '').slice(0, -1)];
	heart = heart ? heart : ':black_heart:';

	const embed: Embed = {
		title: ':heartpulse: **Love tester** :heartpulse:',
		description: `\`${name1}\` ${heart} \`${name2}\`\n\n${heart} A **${percentage}%** match! ${heart}`,
		color: 16753847,
	};

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				content: '',
				embeds: [embed],
			},
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
};
