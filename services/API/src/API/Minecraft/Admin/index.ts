// API/src/API/Minecraft/Admin/index.ts
import { Resolver, Authorized, Root, Mutation, Arg, PubSubEngine, Subscription, Field, ObjectType } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { pubSub } from './RCONPubSub';
import fs from 'fs';
import { Stream } from 'stream';
import { FileInput } from './FileType';
import { findContainer } from '../../../Utils/Docker'

const MCPath = process.env.MCPath || '/minecraft';

const storeFS = ({ stream, filename }: { stream: Stream; filename: string }) => {
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        // @ts-ignore
        if (stream.truncated)
          // @ts-ignore
          fs.unlinkSync(filename);
        reject(error);
      })
      // @ts-ignore
      .pipe(fs.createWriteStream(`${MCPath}/mods/${filename}`))
      .on('error', error => reject(error))
      // @ts-ignore
      .on('finish', () => resolve()),
  );
};

@Resolver()
export default class MinecraftAdminResolver {
  @Authorized(['Admin'])
  @Mutation(returns => Boolean)
  public async sendCommand(@Arg('command') command: string) {
    pubSub.publish('Game', command);
    return true;
  }

  @Authorized(['Admin'])
  @Subscription(type => String, { topics: 'Game', nullable: true })
  public RCON(@Root() RCON: String): String {
    return RCON;
  }

  @Authorized(['Admin'])
  @Mutation(returns => Boolean)
  public async uploadMod(
    @Arg('file', type => GraphQLUpload)
    file: FileInput,
  ): Promise<boolean> {
    // @ts-ignore
    const { createReadStream, filename } = await file;
    const stream = createReadStream();
    await storeFS({ stream, filename: filename });
    return true;
  }

  @Authorized(['Admin'])
  @Mutation(returns => Boolean)
  public async restartServer() {
    const cont = await findContainer()
    await cont.restart()
    return true;
  }

  @Authorized(['Admin'])
  @Mutation(returns => Boolean)
  public async startServer() {
    const cont = await findContainer()
    await cont.start()
    return true;
  }
}
