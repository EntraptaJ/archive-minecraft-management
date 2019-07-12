// Launcher/app/main/Java/findJava.ts
// Finds the Java binary by reccursively searching file system
import klaw from 'klaw';
import pEvent from 'p-event';
import { parse } from 'path';

export const findJavaBinary = async (folderPath: string) => {
  // Reccursively walk the /zones folder
  const walk = klaw(folderPath);

  // Convert the walk into an AsyncIterableIterator
  const files: AsyncIterableIterator<klaw.Item> = pEvent.iterator(walk, 'data', {
    resolutionEvents: ['end'],
  });

  for await (const file of files) {
    // We don't want the directories themselves only files
    if (file.stats.isDirectory()) continue;
    // if file then parse the path and extract the filename as base
    let { base: fileName } = parse(file.path);
    if (fileName.includes('java')) return file.path;
  }
};
