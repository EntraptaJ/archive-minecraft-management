// API/src/API/Minecraft/Admin/Backups/index.ts
import { Resolver, Query, Mutation, Authorized, Arg } from 'type-graphql'
import { outputJSON } from 'fs-extra';
import { zip } from 'zip-a-folder';
import moment from 'moment'
import { Backup } from './BackupType';
import { getBackups } from './getBackups'

const MCPath = process.env.MCPath || '/minecraft';
const MCBackups = `${MCPath}/backups`

@Resolver()
export default class BackupsResovler {
  @Authorized(['Admin'])
  @Mutation(returns => Backup, { description: 'Creates a backup of the Minecraft World'})
  public async createBackup(@Arg('name', { nullable: true, defaultValue: 'World Backup' }) name: string): Promise<Backup> {
    const date = moment().format()
    
    const folderName = date;
    const backupPath = `${MCBackups}/${folderName}`
    // @ts-ignore
    const backupOBJ: Backup = { name, date: new Date(folderName), folderName }
    await outputJSON(`${backupPath}/backup.json`, backupOBJ)
    await zip(`${MCPath}/world`, `${backupPath}/${name}.zip`)
    console.log(`${MCBackups}/${folderName}`)
    return backupOBJ
    

  }

  @Query(returns => [Backup], { description: 'Get all backups on the server' })
  public async getBackups(): Promise<Backup[]> {
    //const backups: Backup[] = [{ name: 'Minecraft Backup', date: new Date() }]

    const backups = await getBackups()
    console.log(backups)
    return backups

  }

}