// API/src/API/Minecraft/Twitch/index.ts
import { Resolver, Query, Arg, ObjectType, Field, Int, Mutation, ForbiddenError } from 'type-graphql';
import got from 'got';
import { CurseMod } from './TwitchTypes'
import download from 'download'

const MCPath = process.env.MCPath || '/minecraft';

@Resolver()
export class TwitchResolver {
  @Query(returns => [CurseMod])
  public async searchMods(@Arg('search') search: string) {
    const res = await got.get<CurseMod[]>(
      `https://addons-ecs.forgesvc.net/api/v2/addon/search?categoryId=0&gameId=432&gameVersion=1.12.2&index=0&pageSize=25&searchFilter=${search}&sectionId=6&sort=0`,
      { json: true },
    );
    return res.body;
  }

  @Mutation(returns => CurseMod)
  public async downloadCurseMod(@Arg('modID', type => Int) modID: number) {
    const res = await got.get<CurseMod>(`https://addons-ecs.forgesvc.net/api/v2/addon/${modID}`,{ json: true})
    const mod = res.body.latestFiles.find(({ gameVersion }) => gameVersion.includes('1.12.2'))
    if (!mod) throw new ForbiddenError()
    await download(mod.downloadUrl, `${MCPath}/mods`)
    return res.body
  }
}
