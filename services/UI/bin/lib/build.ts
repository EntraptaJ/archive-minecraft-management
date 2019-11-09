import { copy, mkdir, remove, writeJSON } from 'fs-extra';
import ParcelBundler from 'parcel-bundler';
import run from './run';
import { entryPointHandler, CSS } from './CSSManifest';
import { generateFragement } from './ApolloFragement';
import resizer from 'node-image-resizer'

export async function build(watch: boolean = false) {
  await remove('dist');
  await mkdir('dist');

  await copy('public', 'dist/public')

  await copy('package.json', 'dist/package.json');
  await copy('package-lock.json', 'dist/package-lock.json');

  const bundler = new ParcelBundler('ui/client.tsx', {
    outDir: 'dist/public',
    watch,
    target: 'browser',
    contentHash: true,
    cache: false,
    sourceMaps: false,
  });

  bundler.on('bundled', bundle =>
    // @ts-ignore
    bundler.options.entryFiles.length > 1 ? bundle.childBundles.forEach(entryPointHandler) : entryPointHandler(bundle),
  );

  await bundler.bundle();

  process.env['BABEL_ENV'] = 'server';
  const serverbundler = new ParcelBundler(['server/index.ts', 'server/server.urls'], {
    outDir: 'dist/server',
    watch,
    target: 'node',
    contentHash: true,
    sourceMaps: false,
    cache: false,
  });

  serverbundler.on('bundled', bundle =>
    // @ts-ignore
    bundler.options.entryFiles.length > 1 ? bundle.childBundles.forEach(entryPointHandler) : entryPointHandler(bundle),
  );

  await serverbundler.bundle();
  await writeJSON('dist/CSS.json', CSS);
  await generateIcons()
}

async function generateIcons() {
  const setup = {
    all: {
      path: 'dist/public/',
      quality: 100
    },
    versions: [
      {
        prefix: '192',
        width: 192,
        height: 192
      },
      {
        quality: 100,
        prefix: '512',
        width: 512,
        height: 512
      }
    ]
  };

  const thumbs = await resizer('icons/main.png', setup);
};
