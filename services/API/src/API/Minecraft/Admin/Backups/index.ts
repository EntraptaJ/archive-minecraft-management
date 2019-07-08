// API/src/API/Minecraft/Admin/Backups/index.ts
import { Resolver, Query, Mutation, Authorized, Arg } from 'type-graphql';
import { outputJSON, remove } from 'fs-extra';
import { zip } from 'zip-a-folder';
import moment from 'moment';
import { Backup } from './BackupType';
import { getBackups } from './getBackups';
import { ApolloError } from 'apollo-server-koa';
import { Open } from 'unzipper';

const MCPath = process.env.MCPath || '/minecraft';
const MCBackups = `${MCPath}/backups`;

@Resolver()
export default class BackupsResovler {
  @Authorized(['Admin'])
  @Mutation(returns => Backup, { description: 'Creates a backup of the Minecraft World' })
  public async createBackup(@Arg('name', { nullable: true, defaultValue: 'World Backup' }) name: string): Promise<Backup> {
    const date = moment().format();

    const folderName = date;
    const backupPath = `${MCBackups}/${folderName}`;
    // @ts-ignore
    const backupOBJ: Backup = { name, date: new Date(folderName), folderName };
    await outputJSON(`${backupPath}/backup.json`, backupOBJ);
    await zip(`${MCPath}/world`, `${backupPath}/${name}.zip`);
    return backupOBJ;
  }

  @Authorized(['Admin'])
  @Query(returns => [Backup], { description: 'Get all backups on the server' })
  public async getBackups(): Promise<Backup[]> {
    const backups = await getBackups();
    return backups;
  }

  @Authorized(['Admin'])
  @Mutation(returns => Boolean)
  public async restoreBackup(@Arg('folderName') folderName: string): Promise<Boolean> {
    const backups = await getBackups();
    const backup = backups.find(bck => bck.folderName === folderName);
    if (!backup) throw new ApolloError('INVALID BACKUP', 'BACKUP_INVALID');
    const zip = await Open.file(`${MCPath}/backups/${folderName}/${backup.name}.zip`);
    // @ts-ignore
    await zip.extract({ path: `${MCPath}/world` });
    await remove(`${MCPath}/world/session.lock`);

    return true;
  }
}
