import { Resolver, Query, Mutation } from 'type-graphql'
import klaw from 'klaw';
import pEvent from 'p-event';
import path from 'path';
import Docker from 'dockerode';
import { zip } from 'zip-a-folder'
import MCQuery from 'minecraft-query'
import { MinecraftStatus } from './ServerStatus'

const findContainer = async () => {
  let docker = new Docker({
    socketPath: '/var/run/docker.sock',
    version: 'v1.39'
  });
  let opts = {
    filters: `{"label": ["com.docker.compose.service=test-minecraft"]}`
  };
  const conts = await docker.listContainers(opts);
  console.log(conts)
}

const getMods = async () => {
    // Reccursively walk the /zones folder
    const walk = klaw('/minecraft/mods');

    // Convert the walk into an AsyncIterableIterator
    const files: AsyncIterableIterator<klaw.Item> = pEvent.iterator(
      walk,
      'data',
      {
        resolutionEvents: ['end']
      }
    );
  
    /**
     * Array of zone files within the /zones folder of the filesystem
     */
    let mods: string[] = [];
    for await (const file of files) {
      // We don't want the directories themselves only files
      if (file.stats.isDirectory()) continue;
      // if file then parse the path and extract the filename as base
      let { base: fileName } = path.parse(file.path);
      if (fileName.includes('.jnl')) continue;
      mods.push(fileName);
    }
  
    return mods.sort().reverse();
}
@Resolver()
export default class MinecraftResolver {
  @Query(returns => [String])
  public async listMods() {
    return getMods()
  }

  @Query(returns => MinecraftStatus)
  public async getStatus() {
    const q = new MCQuery({ host: 'mc.kristianjones.dev', port: 25565 });
    return q.fullStat()
    
  }

  @Mutation(returns => Boolean)
  public async generateModsZip() {
    await zip('/minecraft/mods', 'mods.zip')
    return true;
  }

}