import * as chokidar from 'chokidar';
import { Request, Response } from 'express';
import 'isomorphic-unfetch';
import { readJSON } from 'fs-extra';
import { resolve } from 'path'

/*
async function getUiServer() {
  const stf = 'dist/server/parcel-manifest.json';
  const uiManifest = await readJSON(stf);
  return import(`.${uiManifest['server.tsx']}`);
} */

async function getUiServer() {
  const stf = `${__dirname}/../server/parcel-manifest.json`
  const uiManifest = await readJSON(stf)
  const serverFilename = resolve(`${__dirname}/../server/${uiManifest['server.tsx']}`)
  return import(serverFilename)
}

export async function hotUiServer(req: Request, res: Response) {
  let { uiServer } = await getUiServer();

  if (process.env.NODE_ENV === 'development')
    chokidar
      .watch(`dist/server/parcel-manifest.json`, {
        ignoreInitial: true,
        awaitWriteFinish: { stabilityThreshold: 100 },
      })
      .on('all', async () => {
        process.stdout.write('Reloading UI Server...');
        uiServer = (await getUiServer()).uiServer;
        process.stdout.write('✅\n');
      });

  return uiServer(req, res);
}
