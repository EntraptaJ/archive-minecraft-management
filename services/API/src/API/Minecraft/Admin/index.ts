// API/src/API/Minecraft/Admin/index.ts
import { Resolver, Authorized, Root, Mutation, Arg, Subscription, Query, Int } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { pubSub } from './RCONPubSub';
import fs from 'fs';
import { Stream } from 'stream';
import { FileInput } from './FileType';
import { findContainer, execRCON } from '../../../Utils/Docker';
import { discordClient } from '../../../Discord';
import { mcRCON } from '../../../RCON';
import { TextChannel } from 'discord.js';
import {} from 'dockerode';
import { Writable } from 'stream';
import MemoryStream from 'memorystream';

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
    const cont = await findContainer();
    const message = 'Minecraft Server restarting in 5 minutes';
    const rawMessage = { text: message, color: 'red' };
    if (discordClient.token) {
      console.log('Test')
      const channel = discordClient.channels.find(
        // @ts-ignore
        test => test.type === 'text' && test.name === 'minecraft-gang',
      ) as TextChannel;
      if (channel) await channel.send(message);
    }
    if (mcRCON) mcRCON.send(`/tellraw @p ${JSON.stringify(rawMessage)}`);
    setTimeout(() => {
      cont.restart();
    }, 300000);
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
    const test = (await (<unknown>cont.logs({ follow: false, tail: 50, stdout: true }))) as string;
    console.log(test);
    console.log(test.includes(line));
    return true;
  }

  @Authorized(['Admin'])
  @Query(returns => String)
  public async getLogs(@Arg('lines', type => Int, { defaultValue: 500 }) lines: number) {
    const cont = await findContainer();
    return cont.logs({ follow: false, tail: lines, stdout: true });
  }
}
