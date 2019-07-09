// API/src/Models/Config.ts
import { prop, Typegoose, pre, instanceMethod, InstanceType } from 'typegoose';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ForbiddenError, ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Config extends Typegoose {
  @prop({ max: 1, min: 0 })
  ID: number;

  @prop({ required: true })
  @Field()
  MCURI: string;

  @prop({ required: false })
  @Field({ nullable: true })
  DISCORDAPI?: string;
}

export const ConfigModel = new Config().getModelForClass(Config);

export const loadConfig = async (): Promise<InstanceType<Config>> => {
  const config = await ConfigModel.findOne({ ID: 1 });
  // @ts-ignore
  if (!config) return { MCURI: '' };
  return config;
};

export const isConfigured = async () => {
  const config = await ConfigModel.estimatedDocumentCount({ ID: 1 });
  if (config < 1) return false;
  else return true;
};

interface SaveConfigParams {
  MCURI: string;
  DISCORDAPI?: string
}

export const saveConfig = async (config: SaveConfigParams): Promise<InstanceType<Config>> => {
  const isConfiged = await isConfigured();
  if (isConfiged) {
    await ConfigModel.updateOne({ ID: 1 }, config);
    return loadConfig();
  } else {
    const configDoc = new ConfigModel({ ...config, ID: 1 });
    await configDoc.save();
    return loadConfig();
  }
};
