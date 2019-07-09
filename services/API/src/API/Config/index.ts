// API/src/API/Config/index.ts
import { Resolver, Query, Mutation, Authorized, Arg, InputType, Field } from 'type-graphql';
import { Config, loadConfig, saveConfig } from '../../Models/Config';

@InputType()
class ConfigInput {
  @Field({ nullable: true })
  DISCORDAPI?: string;

  @Field({ nullable: true })
  DISCORDCHANNEL?: string;

  @Field()
  MCURI: string;
}

@Resolver()
export default class ConfigResolver {
  @Authorized(['Admin'])
  @Query(type => Config)
  public async getSettings() {
    return loadConfig();
  }

  @Authorized(['Admin'])
  @Mutation(type => Config)
  public async updateSettings(@Arg('config', type => ConfigInput) config: ConfigInput) {
    return saveConfig(config);
  }
}
