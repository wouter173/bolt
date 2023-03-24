import { generateImage } from '../lib/image';

export default async (cmd: Command): Promise<Response> => {
	const img = await generateImage({ width: 612, height: 477 });
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

	const formData = new FormData();
	formData.append('payload_json', body);
	formData.append('files[0]', new Blob([img]), 'image.png');

	return new Response(formData);
};
