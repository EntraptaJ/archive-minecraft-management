import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import { readJSON } from 'fs-extra';

const port = 81;

const loadServer = async () => {
  const manifest = await readJSON(`dist/server/parcel-manifest.json`);
  return import(`${__dirname}${manifest['server.tsx']}`) as Promise<typeof import('./server')>;
};

const startServer = async () => {
  const server = new Koa();
  const router = new Router();

  router.get('*', serve('dist/public'));

  router.get('*', async ctx => {
    let { uiServer } = await loadServer();
    if (process.env.NODE_ENV === 'development') {
      const chokidar = await import('chokidar');
      chokidar
        .watch(`${__dirname}/parcel-manifest.json`, {
          ignoreInitial: true,
          awaitWriteFinish: { stabilityThreshold: 100 },
        })
        .on('all', async () => {
          process.stdout.write('Reloading UI Server...');
          uiServer = (await loadServer()).uiServer;
          process.stdout.write('✅\n');
        });
    }
    return uiServer(ctx, { baseUrl: process.env.APIURL as string });
  });

  server.use(router.routes()).use(router.allowedMethods());

  server.listen(port, () => console.log(`Server listening on port ${port}`));
};

startServer();
