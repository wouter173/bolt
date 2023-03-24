import satori from 'satori';
import { loadGoogleFont } from './font';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
// @ts-expect-error .wasm files are not typed
import resvgWasm from '../vendors/index_bg.wasm';

let wasmInited = false;

export async function generateImage(options: { width: number; height: number }) {
	if (!wasmInited) {
		await initWasm(resvgWasm);
		wasmInited = true;
	}

	const svg = await satori(
		{
			type: 'div',
			props: {
				children: 'hello, world',
				style: { color: 'black' },
			},
		},
		{
			width: options.width,
			height: options.height,
			fonts: [
				{
					name: 'inter',
					data: await loadGoogleFont({
						family: 'Inter',
						weight: 400,
					}),
					weight: 400,
					style: 'normal',
				},
			],
		},
	);

	const opts = {
		// background: "rgba(238, 235, 230, .9)",
		fitTo: {
			mode: 'width' as const,
			value: options.width,
		},
		font: {
			loadSystemFonts: false, // It will be faster to disable loading system fonts.
		},
	};
	const resvg = new Resvg(svg, opts);
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return pngBuffer;
}
