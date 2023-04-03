const daysOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
type DaysOfTheWeek = typeof daysOfTheWeek[number];

const defaultData = {
	default: 'default motd, change with `/motd default`',
};

type MOTDData = Prettify<
	{ default: string } & {
		[key in DaysOfTheWeek]?: string;
	}
>;

function getCurrentDay() {
	const dayOfTheWeek = new Date().getDay();
	return daysOfTheWeek[dayOfTheWeek];
}

export async function updateAllMOTD() {
	const day = getCurrentDay();
	const { keys } = await MOTD.list();

	console.log('updating: ', keys.map(key => key.name).join(', '));

	for (const key of keys) await updateMOTD(key.name, day);
}

async function updateMOTD(channelId: string, day: DaysOfTheWeek) {
	const val = JSON.parse((await MOTD.get(channelId))!) as MOTDData;
	if (!val) return;
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

export async function setMOTD(channelId: string, day: DaysOfTheWeek | 'default', message: string) {
	const res = await MOTD.get(channelId);
	const motdData = (res ? JSON.parse(res) : defaultData) as MOTDData;
	motdData[day] = message;

	await MOTD.put(channelId, JSON.stringify(motdData));
	await updateMOTD(channelId, getCurrentDay());
}
