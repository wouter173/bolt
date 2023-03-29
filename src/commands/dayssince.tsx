import { generateImage } from '../lib/image';
import { RESTPostAPIChatInputApplicationCommandsJSONBody, ApplicationCommandOptionType } from 'discord-api-types/v10';
import React from 'react';

export const definition: RESTPostAPIChatInputApplicationCommandsJSONBody = {
	name: 'dayssince',
	description: 'days since uit de hand gelopen gesprek in maishond',
	options: [
		{
			name: 'reset',
			type: ApplicationCommandOptionType.Boolean,
			description: 'reset de teller',
		},
	],
};

export async function handle(cmd: Command): Promise<Response> {
	const timestamp = await SCORE.get('dayssince', 'text');
	const now = new Date();
	let dayssince = 0;

	if (timestamp) {
		const then = new Date(+timestamp);
		const diff = now.getTime() - then.getTime();
		dayssince = Math.floor(diff / (1000 * 60 * 60 * 24));
	}

	const reset = Boolean(cmd.data.options?.find(o => o.name === 'reset')?.value);
	let imgurl = S3_BUCKET + (reset ? '/dayssincereset.png' : '/dayssince.png');

	if (reset) await SCORE.put('dayssince', now.getTime().toString());

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
