// API/src/API/Minecraft/Admin/Mods/index.ts
import { Resolver, Mutation, Arg } from 'type-graphql'
import { remove } from 'fs-extra'
import { getMods } from './getMods';
import { ApolloError } from 'apollo-server-koa';


const MCPath = process.env.MCPath || '/minecraft';

@Resolver()
export default class AdminModResolver {
  @Mutation(returns => Boolean)
  public async deleteMod(@Arg('modName') modName: string): Promise<boolean> {
    const mods = await getMods()
    const mod = mods.find(({ fileName }) => fileName === modName)
    if (!mod) throw new ApolloError('MOD NOT FOUND', 'INVALID MOD')
    console.log(`Delete ${modName}`)
    await remove(`${MCPath}/mods/${modName}`)
    return true
  }
}