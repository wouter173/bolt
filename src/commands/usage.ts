export default async (cmd: Command): Promise<Response> => {
	const url = new URL('https://api.openai.com/dashboard/billing/usage');

	const date = new Date();
	const currentMonth = date.getMonth() + 1;
	const currentYear = date.getFullYear();

	url.searchParams.append('start_date', `${currentYear}-${currentMonth}-01`);
	url.searchParams.append('end_date', `${currentYear}-${currentMonth + 1}-01`);

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${OPENAI_APIKEY}`,
			'Content-Type': 'application/json',
		},
	});

	const data = await res.json();
	const usage = Math.ceil(data.total_usage);

	const subscriptionResponse = await fetch('https://api.openai.com/dashboard/billing/subscription', {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			authorization: 'Bearer ' + OPENAI_APIKEY,
		},
	});

	const subscriptionData = await subscriptionResponse.json();
	const rawLimit = subscriptionData.hard_limit_usd as number;
	const limit = Math.ceil(rawLimit * 100) / 100;

	const embed: Embed = {
		title: `:bar_chart: **usage**`,
		color: 15958048,
		footer: {
			text: 'sponsored by Wouter de Droog',
		},
		fields: [
			{
				name: 'jullie hebben me:',
				value: `\`€${(usage / 100).toLocaleString('nl-NL', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})}\` / \`€${limit.toLocaleString('nl-NL', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})}\` gekost`,
				inline: false,
			},
		],
	};

	return new Response(JSON.stringify({ type: 4, data: { content: '', embeds: [embed] } }), {
		headers: { 'Content-Type': 'application/json' },
	});
};
