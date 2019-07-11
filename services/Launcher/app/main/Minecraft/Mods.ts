// Launcher/app/main/Minecraft/Mods.ts
import klaw from 'klaw';
import pEvent from 'p-event';
import path from 'path';
import { apolloClient } from '../lib/initApollo';
import download from 'download'

import GETMODSGQL from './listMods.graphql';
import { gameFolderPath } from './InstallGame';
import { loadConfig } from '../App/Settings';

interface Mod {
  name: string;
  fileName: string;
}
export const listServerMods = async () => {
  const { data } = await apolloClient.query<{ listMods: Mod[] }>({ query: GETMODSGQL });
  return data.listMods.map(({ name, fileName}) => ({ name, fileName }));
};

export const listClientMods = async (): Promise<Mod[]> => {
  // Reccursively walk the /zones folder
  const walk = klaw(`${gameFolderPath}/mods`);

  // Convert the walk into an AsyncIterableIterator
  const files: AsyncIterableIterator<klaw.Item> = pEvent.iterator(walk, 'data', {
    resolutionEvents: ['end'],
  });

  /**
   * Array of zone files within the /zones folder of the filesystem
   */
  let mods: Mod[] = [];
  for await (const file of files) {
    // We don't want the directories themselves only files
    if (file.stats.isDirectory()) continue;
    // if file then parse the path and extract the filename as base
    let { base: fileName } = path.parse(file.path);
    if (fileName.includes('.jar') && !fileName.includes('.meta'))
      mods.push({ name: /(.*)(?=(\.jar(\.disabled)?))/.exec(fileName)![1], fileName });
  }

  return mods.sort((a, b) => a.name.localeCompare(b.name));
};


export const getMissingMods = async () => {
  const serverMods = await listServerMods();
  const clientMods = await listClientMods();
  return serverMods.filter((sMod) => !clientMods.some((cMod) => JSON.stringify(cMod) === JSON.stringify(sMod)))
}

export const installMissingMods = async () => {
  const { serverURL } = await loadConfig()
  const missingMods = await getMissingMods()
  for (const mod of missingMods) {
    console.log(`Download URL: ${serverURL}/downloadMod/${mod.fileName}\nDownload to: ${gameFolderPath}/mods`)
    await download(`${serverURL}/downloadMod/${mod.fileName}`, `${gameFolderPath}/mods`)
    
  }

}