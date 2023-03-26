import { generateImage } from '../lib/image';
import React from 'react';

export default async (cmd: Command, url: URL): Promise<Response> => {
	const timestamp = await SCORE.get('dayssince', 'text');
	const now = new Date();
	let dayssince = 0;

	if (timestamp) {
		const then = new Date(+timestamp);
		const diff = now.getTime() - then.getTime();
		dayssince = Math.floor(diff / (1000 * 60 * 60 * 24));
	}

	const imgurl = S3_BUCKET + (dayssince == 0 ? '/dayssince.png' : '/dayssincereset.png');
	console.log(imgurl);
	await SCORE.put('dayssince', now.getTime().toString());

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
					textDecoration: dayssince == 0 ? '' : 'line-through',
				}}
			>
				{dayssince}
			</span>
		</div>
	);

	console.log('yus');
	const img = await generateImage(template, { width: 612, height: 477 });
	const body = JSON.stringify({
		type: 4,
		data: {
			attachments: [
				{
					id: 0,
				},
			],
		},
	});
	console.log(body);

	const formData = new FormData();
	formData.append('payload_json', body);
	const blob = new Blob([img]);
	console.log(blob.size);
	formData.append('files[0]', blob, 'image2.png');

	return new Response(formData);
};
