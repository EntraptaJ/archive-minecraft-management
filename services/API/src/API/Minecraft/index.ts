import { Resolver, Query, Mutation } from 'type-graphql';
import klaw from 'klaw';
import pEvent from 'p-event';
import path from 'path';
import { zip } from 'zip-a-folder';
import MCQuery from 'minecraft-query';
import { MinecraftStatus } from './ServerStatus';
import { StatusType } from './StatusType';
import { findContainer } from '../../Utils/Docker';

const MCPath = process.env.MCPath || '/minecraft';

const getMods = async () => {
  // Reccursively walk the /zones folder
  const walk = klaw(`${MCPath}/mods`);

  // Convert the walk into an AsyncIterableIterator
  const files: AsyncIterableIterator<klaw.Item> = pEvent.iterator(walk, 'data', {
    resolutionEvents: ['end'],
  });

  /**
   * Array of zone files within the /zones folder of the filesystem
   */
  let mods: string[] = [];
  for await (const file of files) {
    // We don't want the directories themselves only files
    if (file.stats.isDirectory()) continue;
    // if file then parse the path and extract the filename as base
    let { base: fileName } = path.parse(file.path);
    if (fileName.includes('.jar')) mods.push(fileName);
  }

  return mods.sort().reverse();
};
@Resolver()
export default class MinecraftResolver {
  @Query(returns => [String])
  public async listMods() {
    return getMods();
  }

  @Query(returns => MinecraftStatus)
  public async getMCStatus() {
    const q = new MCQuery({ host: 'mc.kristianjones.dev', port: 25565 });
    return q.fullStat();
  }

  @Query(returns => StatusType)
  public async getStatus(): Promise<StatusType> {
    const MCState = new MCQuery({ host: 'mc.kristianjones.dev', port: 25565 });
    const cont = await findContainer();
    const { State } = await cont.inspect();
    return { online: State.Status === 'running', MCState: MCState.fullStat() as MinecraftStatus };
  }

  @Mutation(returns => Boolean)
  public async generateModsZip() {
    await zip(`${MCPath}/mods`, 'mods.zip');
    return true;
  }
}
