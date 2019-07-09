// API/srv/Discord/index.ts
import 'reflect-metadata';
import { Client, Discord, On } from '@typeit/discord';
import { Message } from 'discord.js';

export const discordClient = new Client();

@Discord
abstract class MyDiscordApp {
  @On('message')
  private onMessage(message: Message) {
  }
}
