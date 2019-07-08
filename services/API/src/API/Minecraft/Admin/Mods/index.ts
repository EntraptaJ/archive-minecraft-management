// API/src/API/Minecraft/Admin/Mods/index.ts
import { Resolver, Mutation, Arg } from 'type-graphql';
import { remove, rename } from 'fs-extra';
import { getMods } from './getMods';
import { ApolloError } from 'apollo-server-koa';
import { fstat } from 'fs';

const MCPath = process.env.MCPath || '/minecraft';

@Resolver()
export default class AdminModResolver {
  @Mutation(returns => Boolean)
  public async deleteMod(@Arg('modName') modName: string): Promise<boolean> {
    const mods = await getMods();
    const mod = mods.find(({ fileName }) => fileName === modName);
    if (!mod) throw new ApolloError('MOD NOT FOUND', 'INVALID MOD');
    await remove(`${MCPath}/mods/${modName}`);
    return true;
  }

  @Mutation(returns => Boolean)
  public async toggleMod(@Arg('modName') modName: string): Promise<boolean> {
    const mods = await getMods();
    const mod = mods.find(({ name }) => name === modName);
    if (!mod) throw new ApolloError('MOD NOT FOUND', 'INVALID MOD');
    const { fileName } = mod
    const newFileName = fileName.includes('.disabled') ? fileName.replace('.disabled', '') : `${fileName}.disabled`
    await rename(`${MCPath}/mods/${fileName}`, `${MCPath}/mods/${newFileName}`)
    return true;
  }
}
