import { Prettify } from '../types/utils';

const daysOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
type DaysOfTheWeek = typeof daysOfTheWeek[number];

const defaultData: Prettify<Omit<MOTDData, 'guildId'>> = {
	default: 'default motd, change with `/motd default`',
};

type MOTDData = Prettify<
	{ default: string; guildId: string } & {
		[key in DaysOfTheWeek]?: string;
	}
>;

export function getCurrentDay() {
	const dayOfTheWeek = new Date().getDay();
	return daysOfTheWeek[dayOfTheWeek];
}

export async function updateAllMOTD() {
	const day = getCurrentDay();
	const { keys } = await MOTD.list();

	console.log('updating: ', keys.map(key => key.name).join(', '));

	for (const key of keys) await updateMOTD(key.name, day);
}

export async function updateMOTD(channelId: string, day: DaysOfTheWeek) {
	const val = JSON.parse((await MOTD.get(channelId))!) as MOTDData;
	if (!val) return;
	let topic = val[day] ? val[day]! : val.default;

	const scoreChannelId = await SCORE.get('scorechannel-' + val.guildId);
	console.log(scoreChannelId, channelId);
	if (scoreChannelId === channelId) {
		const timestamp = await SCORE.get('dayssince-' + val.guildId);

		if (timestamp) {
			const then = new Date(+timestamp);
			const diff = new Date().getTime() - then.getTime();
			const dayssince = Math.floor(diff / (1000 * 60 * 60 * 24));

			topic += '\n\n| dagen sinds laatste uit de hand gelopen gesprek in maishond: ' + dayssince;
		}
	}

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

export async function setMOTD(guildId: string, channelId: string, day: DaysOfTheWeek | 'default', message: string) {
	const res = await MOTD.get(channelId);
	const motdData = (res ? JSON.parse(res) : defaultData) as MOTDData;
	motdData[day] = message;
	motdData['guildId'] = guildId;

	await MOTD.put(channelId, JSON.stringify(motdData));
	await updateMOTD(channelId, getCurrentDay());
}
