import { readJSON } from 'fs-extra';
import klaw from 'klaw';
import { parse } from 'path';
import pEvent from 'p-event';

const MCPath = process.env.MCPath || '/minecraft';

export const listConfigs = async () => {
  const walk = klaw(`${MCPath}/config`);

  // Convert the walk into an AsyncIterableIterator
  const files: AsyncIterableIterator<klaw.Item> = pEvent.iterator(walk, 'data', {
    resolutionEvents: ['end'],
  });

  /**
   * Array of zone files within the /zones folder of the filesystem
   */
  let configs: string[] = [];
  for await (const file of files) {
    // We don't want the directories themselves only files
    if (file.stats.isDirectory()) continue;
    // if file then parse the path and extract the filename as base
    let { base: fileName } = parse(file.path);
    configs.push(fileName);
  }

  return configs.sort();
}