import satori from 'satori';
import { ReactNode } from 'react';
import { loadGoogleFont } from './font';
import { Resvg, ResvgRenderOptions, initWasm } from '@resvg/resvg-wasm';
// @ts-expect-error .wasm files are not typed
import resvgWasm from '../vendors/index_bg.wasm';

let wasmInited = false;
export async function generateImage(node: ReactNode, options: { width: number; height: number }) {
	if (!wasmInited) {
		await initWasm(resvgWasm);
		wasmInited = true;
	}

	const svg = await satori(node, {
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
	});

	const opts: ResvgRenderOptions = {
		fitTo: {
			mode: 'zoom' as const,
			value: 1,
		},
	};
	const resvg = new Resvg(svg, opts);
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return pngBuffer;
}
