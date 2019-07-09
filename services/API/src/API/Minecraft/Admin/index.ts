// API/src/API/Minecraft/Admin/index.ts
import { Resolver, Authorized, Root, Mutation, Arg, Subscription, Query, Int } from 'type-graphql';
import { GraphQLUpload } from 'apollo-server-koa';
import { pubSub } from './RCONPubSub';
import { createWriteStream } from 'fs-extra';
import { Readable } from 'stream';
import { FileInput } from './FileType';
import { findContainer, execRCON } from '../../../Utils/Docker';
import { mcRCON } from '../../../Utils/RCON';
import pEvent from 'p-event';

const MCPath = process.env.MCPath || '/minecraft';

interface FileSave {
  stream: Readable;
  filename: string;
}

type storeFile = (File: FileSave) => Promise<void>;

const storeFSNew: storeFile = async ({ stream, filename }) => {
  stream.pipe(createWriteStream(`${MCPath}/mods/${filename}`));
  return pEvent(stream, 'open');
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
    const { createReadStream, filename } = await file;
    const stream = createReadStream();
    await storeFSNew({ stream, filename });
    return true;
  }

  @Authorized(['Admin'])
  @Mutation(returns => Boolean)
  public async startServer() {
    const cont = await findContainer();
    await cont.start();
    return true;
  }

  @Authorized(['Admin'])
  @Mutation(returns => Boolean)
  public async stopServer() {
    const cont = await findContainer();
    await cont.stop();

    return true;
  }

  @Authorized(['Admin'])
  @Mutation(returns => Boolean)
  public async sendFMLConfirm() {
    const cont = await findContainer();
    var attach_opts = {
      stream: true,
      hijack: true,
      stdin: true,
      stdout: true,
      stderr: true,
    };

    const attch = await cont.attach(attach_opts);

    attch.write('/fml confirm\n');
    const log = (await (<unknown>cont.logs({ follow: false, tail: 50, stdout: true }))) as string;
    return log.includes('[FML]: confirmed');
  }

  @Authorized(['Admin'])
  @Query(returns => Boolean)
  public async testFML() {
    const line =
      'Alternatively start the server with -Dfml.queryResult=confirm or -Dfml.queryResult=cancel to preselect the answer.';
    const cont = await findContainer();
    const test = (await (<unknown>cont.logs({ follow: false, tail: 200, stdout: true }))) as string;
    return true;
  }

  @Authorized(['Admin'])
  @Query(returns => String)
  public async getLogs(@Arg('lines', type => Int, { defaultValue: 500 }) lines: number) {
    const cont = await findContainer();
    return cont.logs({ follow: false, tail: lines, stdout: true });
  }

  @Authorized(['Admin'])
  @Mutation(returns => Boolean)
  public async tellRaw(@Arg('text') text: string, @Arg('color') color: string) {
    const MSG = { text, color };
    if (mcRCON) mcRCON.send(`/tellraw @a ${JSON.stringify(MSG)}`);
    return true;
  }
}
