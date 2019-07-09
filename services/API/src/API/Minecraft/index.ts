import { Resolver, Query, Mutation } from 'type-graphql';
import { zip } from 'zip-a-folder';
import MCQuery from 'minecraft-query';
import { MinecraftStatus } from './ServerStatus';
import { StatusType } from './StatusType';
import { findContainer } from '../../Utils/Docker';
import { ModType } from './ModType';
import { getMods } from './Admin/Mods/getMods';
import { loadConfig } from '../../Models/Config';

const MCPath = process.env.MCPath || '/minecraft';

@Resolver()
export default class MinecraftResolver {
  @Query(returns => [ModType])
  public async listMods(): Promise<ModType[]> {
    return getMods();
  }

  @Query(returns => MinecraftStatus)
  public async getMCStatus() {
    const config = await loadConfig();
    const q = new MCQuery({ host: config.MCURI, port: 25565 });
    return q.fullStat();
  }

  @Query(returns => StatusType)
  public async getStatus(): Promise<StatusType> {
    const config = await loadConfig();
    const MCState = new MCQuery({ host: config.MCURI, port: 25565 });
    const cont = await findContainer();
    const { State } = await cont.inspect();
    const fmlline = 'Run the command /fml confirm or or /fml cancel to proceed.';
    const log = (await (<unknown>cont.logs({ follow: false, tail: 200, stdout: true }))) as string;

    // @ts-ignore
    const health =
      // @ts-ignore
      log.includes(fmlline) && !log.includes('[FML]: confirmed') ? 'FMLConfirm' : State && State.Health && State.Health.Status;
    return { online: State.Status === 'running', MCState: MCState.fullStat() as MinecraftStatus, health };
  }

  @Mutation(returns => Boolean)
  public async generateModsZip(): Promise<boolean> {
    await zip(`${MCPath}/mods`, 'mods.zip');
    return true;
  }
}
