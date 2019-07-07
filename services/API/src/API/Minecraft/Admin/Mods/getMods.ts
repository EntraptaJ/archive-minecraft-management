// API/src/API/Minecraft/Admin/Mods/getMods.ts
import { ModType } from '../../ModType';
import klaw from 'klaw';
import pEvent from 'p-event';
import path from 'path';

const MCPath = process.env.MCPath || '/minecraft';

export const getMods = async (): Promise<ModType[]> => {
  // Reccursively walk the /zones folder
  const walk = klaw(`${MCPath}/mods`);

  // Convert the walk into an AsyncIterableIterator
  const files: AsyncIterableIterator<klaw.Item> = pEvent.iterator(walk, 'data', {
    resolutionEvents: ['end'],
  });

  /**
   * Array of zone files within the /zones folder of the filesystem
   */
  let mods: ModType[] = [];
  for await (const file of files) {
    // We don't want the directories themselves only files
    if (file.stats.isDirectory()) continue;
    // if file then parse the path and extract the filename as base
    let { base: fileName } = path.parse(file.path);
    if (fileName.includes('.jar') && !fileName.includes('.meta'))
      mods.push({ name: /(.*)(?=(\.jar(\.disabled)?))/.exec(fileName)![1], disabled: fileName.includes('disabled'), fileName });
  } 

  return mods.sort(({ name: A }, { name: B }) => {
    if(A < B) { return -1; }
    if(A > B) { return 1; }
    return 0;
  });
};