// API/src/API/Minecraft/Admin/Configs/index.ts
import { Resolver, Query, Authorized, Arg } from 'type-graphql'
import klaw from 'klaw';
import { parse } from 'path';
import pEvent from 'p-event';
import { parseINI } from './parser'
import { readFile } from 'fs-extra';

const MCPath = process.env.MCPath || '/minecraft'

@Resolver()
export default class MCAdminConfigResolver {
  @Authorized(['Admin'])
  @Query(returns => String)
  public async getConfig(@Arg('config') configName: string) {
    const file = await readFile(`${MCPath}/config/${configName}`)
    var configObject = parseINI(file.toString())
    return JSON.stringify(configObject)

  }

  @Authorized(['Admin'])
  @Query(returns => [String])
  public async getConfigs() {
    const walk = klaw(`${MCPath}/config`);

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
    let configs: string[] = [];
    for await (const file of files) {
      // We don't want the directories themselves only files
      if (file.stats.isDirectory()) continue;
      // if file then parse the path and extract the filename as base
      let { base: fileName } = parse(file.path);
      configs.push(fileName);
    }

    return configs
  }



}