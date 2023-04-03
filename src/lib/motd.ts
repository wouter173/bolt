const daysOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
type DaysOfTheWeek = typeof daysOfTheWeek[number];

const defaultData = {
	default: 'default motd, change with `/motd default`',
};

type Prettify<T> = {
	[key in keyof T]: T[key];
} & {};

type MOTDData = Prettify<
	{ default: string } & {
		[key in DaysOfTheWeek]?: string;
	}
>;

export async function updateAllMOTD() {
	const dayOfTheWeek = new Date().getDay();
	const day = daysOfTheWeek[dayOfTheWeek];

	const { keys } = await MOTD.list();
	console.log('updating: ', keys.map(key => key.name).join(', '));

	for (const key of keys) {
		const channelId = key.name;

		const val = JSON.parse((await MOTD.get(channelId))!) as MOTDData;
		if (!val) continue;
		const topic = val[day] ? val[day]! : val.default;

		const res = await fetch('https://discord.com/api/v10/channels/' + channelId, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bot ' + TOKEN,
			},
			body: JSON.stringify({
				topic,
			}),
		});

		console.log(res.status, 'updated:', channelId, val);
	}
}

export async function setMOTD(channelId: string, day: DaysOfTheWeek | 'default', message: string) {
	const res = await MOTD.get(channelId);
	const motdData = (res ? JSON.parse(res) : defaultData) as MOTDData;
	motdData[day] = message;

	await MOTD.put(channelId, JSON.stringify(motdData));
}
