import { copy, mkdir, remove, writeJSON } from 'fs-extra';
import ParcelBundler from 'parcel-bundler';
import run from './run';
import { entryPointHandler, CSS } from './CSSManifest';
import { generateFragement } from './ApolloFragement';


export async function build(watch: boolean = false) {
  await remove('dist');
  await mkdir('dist');

  await copy('package.json', 'dist/package.json');
  await copy('package-lock.json', 'dist/package-lock.json');

  await run('tsc --build src/tsconfig.json');

  const json = await generateFragement('https://mc.kristianjones.dev')
  await writeJSON('ui/fragmentTypes.json', json)

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

  const serverbundler = new ParcelBundler(['ui/server.urls'], {
    outDir: 'dist/server',
    watch,
    target: 'node',
    contentHash: true,
    cache: false,
    bundleNodeModules: true,
    sourceMaps: false,
  });

  serverbundler.on('bundled', bundle =>
    // @ts-ignore
    bundler.options.entryFiles.length > 1 ? bundle.childBundles.forEach(entryPointHandler) : entryPointHandler(bundle),
  );

  await bundler.bundle();
  await serverbundler.bundle();
  await writeJSON('dist/CSS.json', CSS);
}
