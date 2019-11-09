// MC-Launcher/app/main/Minecraft/InstallGame.ts
import {
  Forge,
  ForgeWebPage,
  MinecraftFolder,
  Version,
  Installer,
} from '@xmcl/minecraft-launcher-core';
import { pathExists, pathExistsSync } from 'fs-extra';
import {
  GetVersionIndex,
  GetVersionManifest,
  GetVersionMeta,
  Install,
  MinecraftFolder as MCFolder,
} from 'libminecraft';
import { sendStatus } from '../main';
import { install as installJDK } from './JDK';
import ForgeInstaller from '@xmcl/forge-installer';

export const gameFolderPath = `${process.resourcesPath}/minecraft`;
const gameFolder = new MinecraftFolder(gameFolderPath);

export const checkInstalled = () => pathExistsSync(gameFolderPath);

export const installJava = async () => {
  sendStatus({ stage: 'Java', progress: 0.5 });
  const exists = await pathExists(
    `${process.resourcesPath}/jre/jdk8u212-b04-jre`,
  );
  if (exists) return `${process.resourcesPath}/jre`;
  else return installJDK(8, { type: 'jre' });
};

export const installMinecraft = async () => {
  let manifest = await GetVersionManifest(); // all functions are exported in index.ts
  let index = GetVersionIndex(manifest); // may be useful in some cases, creates id-version object

  let folder = new MCFolder(gameFolderPath);
  let meta = await GetVersionMeta(folder, index['1.12.2']);

  // install using the meta we selected
  return Install(folder, meta, ({ percent }) =>
    sendStatus({ stage: 'Minecraft', progress: percent }),
  );
};

export const installForge = async () => {
  sendStatus({ stage: 'Forge', progress: 0.9 });
  const page = await ForgeWebPage.getWebPage({ mcversion: '1.12.2' });

  const firstVersionOnPage: ForgeWebPage.Version = page.versions[0];
  await ForgeInstaller.install(firstVersionOnPage, gameFolder);
};

export const installGame = async () => {
  const path = await installJava();
  await installMinecraft();
  await installForge();

  return path;
};

export const installMods = async () => {
  console.log('Installing missing mods from MC Manager');
};
