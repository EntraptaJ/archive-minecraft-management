// API/src/Utils/Discord.ts
import { discordClient } from '../Discord';
import { TextChannel } from 'discord.js';
import { loadConfig } from '../Models/Config';

const findChannel = async (channelName: string): Promise<TextChannel | undefined> => {
  if (discordClient.token) {
    const channel = discordClient.channels.find(
      // @ts-ignore
      channel => channel.type === 'text' && channel.name === channelName,
    ) as TextChannel;
    return channel;
  } else return undefined;
};

export const sendMessage = async (message: string) => {
  const config = await loadConfig()
  if (!config.DISCORDCHANNEL) return false;
  const channel = await findChannel(config.DISCORDCHANNEL);
  if (!channel) return false;
  return channel.send(message);
};

export const sendFile = async (message: string, filePath: string) => {
  const config = await loadConfig()
  if (!config.DISCORDCHANNEL) return false;
  const channel = await findChannel(config.DISCORDCHANNEL);
  if (!channel) return false;
  return channel.send(message, { files: [filePath] });
};
