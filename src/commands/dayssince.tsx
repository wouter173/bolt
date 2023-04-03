import { generateImage } from '../lib/image';
import { RESTPostAPIChatInputApplicationCommandsJSONBody, ApplicationCommandOptionType } from 'discord-api-types/v10';
import React from 'react';

export const definition: RESTPostAPIChatInputApplicationCommandsJSONBody = {
	name: 'dayssince',
	description: 'days since uit de hand gelopen gesprek in maishond',
	options: [
		{
			name: 'reset',
			description: 'reset de teller',
			type: ApplicationCommandOptionType.Subcommand,
			required: false,
		},
		{
			name: 'scorechannel',
			description: 'set de channel waar de score in wordt bijgehouden',
			type: ApplicationCommandOptionType.Subcommand,
			required: false,
			options: [
				{
					name: 'channel',
					description: 'de channel',
					type: ApplicationCommandOptionType.Channel,
					required: true,
				},
			],
		},
	],
};

export async function handle(cmd: Command): Promise<Response> {
	if (cmd.data.options?.filter(o => o.name === 'scorechannel').length > 0) {
		let channelId = '0';
		try {
			channelId = cmd.data.options[0]!.options![0]!.value.toString();
		} catch (e) {
			return new Response(
				JSON.stringify({
					type: 4,
					data: {
						content: 'insufficient channel',
						flags: (1 << 6).toString(), // ephemeral
					},
				}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
		}

		SCORE.put('scorechannel-' + cmd.guild_id, channelId);

		return new Response(
			JSON.stringify({
				type: 4,
				data: {
					content: 'updated scoreboard channel',
					flags: (1 << 6).toString(), // ephemeral
				},
			}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	}

	const key = 'dayssince-' + cmd.guild_id;
	const timestamp = await SCORE.get(key, 'text');
	const now = new Date();
	let dayssince = 0;

	if (timestamp) {
		const then = new Date(+timestamp);
		const diff = now.getTime() - then.getTime();
		dayssince = Math.floor(diff / (1000 * 60 * 60 * 24));
	}

	const reset = Boolean(cmd.data.options?.filter(o => o.name === 'reset').length > 0 ?? false);
	let imgurl = S3_BUCKET + (reset ? '/dayssincereset.png' : '/dayssince.png');

	if (reset) await SCORE.put(key, now.getTime().toString());

	console.log(imgurl);

	const template = (
		<div
			style={{
				display: 'flex',
				width: '100vw',
				height: '100vh',
				position: 'relative',
				background: `url("${imgurl}")`,
				backgroundSize: '612px 477px',
			}}
		>
			<span
				style={{
					position: 'absolute',
					display: 'flex',
					top: '100px',
					left: '180px',
					fontSize: '32px',
					textDecoration: reset ? 'line-through' : '',
				}}
			>
				{dayssince}
			</span>
		</div>
	);

	console.log('yus');
	const img = await generateImage(template, { width: 612, height: 477 });
	const data = {
		content: '',
		attachments: [
			{
				id: 0,
			},
		],
	};

	const body = JSON.stringify({
		type: 4,
		data,
	});

	const formData = new FormData();
	formData.append('payload_json', body);
	const blob = new Blob([img], { type: 'image/png' });
	formData.append('files[0]', blob, 'image2.png');

	return new Response(formData);
}

export default handle;
