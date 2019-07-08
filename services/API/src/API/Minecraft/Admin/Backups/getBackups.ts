// API/src/API/Minecraft/Admin/Backups/getBackup.ts
// Kristian Jones <me@kristianjones.xyz>
import 'reflect-metadata';
import { readJSON } from 'fs-extra';
import klaw from 'klaw';
import { parse } from 'path';
import pEvent from 'p-event';
import { Backup } from './BackupType'

const MCPath = process.env.MCPath || '/minecraft';
const MCBackups = `${MCPath}/backups`

/**
 * Iterate through API looking for API.json to load Type-GraphQL Resolvers.
 */
export async function getBackups(): Promise<Backup[]> {
  let walk = klaw(MCBackups);
  const files: AsyncIterableIterator<klaw.Item> = pEvent.iterator(walk, 'data', {
    resolutionEvents: ['end'],
  });

  let backups: Backup[] = []

  for await (const file of files) {
    const parsed = parse(file.path);
    const fileName = parsed.base;
    if (fileName === 'backup.json') {
      const backup = await readJSON(file.path) as Backup;
      backups.push({ ...backup, date: new Date(backup.date)  })
    }
  }

  return backups;
}
