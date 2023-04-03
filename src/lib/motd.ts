const daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
type DaysOfTheWeek = typeof daysOfTheWeek[number];

export async function updateAllMOTD() {
	const dayOfTheWeek = new Date().getDay();
	const day = daysOfTheWeek[dayOfTheWeek];
	const prefix = day + '-';
	console.log(prefix);

	const { keys } = await MOTD.list({ prefix });
	console.log('updating: ', keys.map(key => key.name).join(', '));

	for (const key of keys) {
		const val = await MOTD.get(key.name);
		if (val == null) continue;

		const [_, channelId] = key.name.split('-');

		const res = await fetch('https://discord.com/api/v10/channels/' + channelId, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bot ' + TOKEN,
			},
			body: JSON.stringify({
				topic: val,
			}),
		});

		console.log(res.status, 'updated:', channelId, val);
	}
}

export async function setMOTD(channelId: string, day: DaysOfTheWeek, message: string) {
	await MOTD.put(day + '-' + channelId, message);
}
