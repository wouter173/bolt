import {build} from 'esbuild';
import watPlugin from 'esbuild-plugin-wat';

build({
  entryPoints: ['data/create.ts'],
  bundle: true,
  outfile: 'dist/create.js',
  platform: 'node',
  target: 'node18',
  packages: 'external',
  plugins: [watPlugin()],
});