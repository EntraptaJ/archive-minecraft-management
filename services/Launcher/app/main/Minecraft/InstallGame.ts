// MC-Launcher/app/main/Minecraft/InstallGame.ts
import { pathExistsSync, pathExists } from 'fs-extra';
import { ipcMain, ipcRenderer } from 'electron'
import { ForgeWebPage, Forge, MinecraftFolder, Version } from 'ts-minecraft';
import { Install, MinecraftFolder as MCFolder, GetVersionManifest, GetVersionIndex, GetVersionMeta } from 'libminecraft';
import { install as installJDK } from './JDK';
import { sendWindow, sendStatus } from '../main';

export const gameFolderPath = `${process.resourcesPath}/minecraft`;
const gameFolder = new MinecraftFolder(gameFolderPath);

export const checkInstalled = () => pathExistsSync(gameFolderPath);

export const installJava = async () => {
  sendStatus({ stage: 'Java', progress: 0.5 })
  const exists = await pathExists(`${process.resourcesPath}/jre/jdk8u212-b04-jre`);
  if (exists) return `${process.resourcesPath}/jre`;
  else return installJDK(8, { type: 'jre' });
};

export const installMinecraft = async () => {
  let manifest = await GetVersionManifest(); // all functions are exported in index.ts
  let index = GetVersionIndex(manifest); // may be useful in some cases, creates id-version object

  let folder = new MCFolder(gameFolderPath);
  let meta = await GetVersionMeta(folder, index['1.12.2']);

  // install using the meta we selected
  return Install(folder, meta, ({ percent }) => sendStatus({ stage: 'Minecraft', progress: percent }));
};

export const installForge = async () => {
  sendStatus({ stage: 'Forge', progress: 0.9 })
  const page = await ForgeWebPage.getWebPage({ mcversion: '1.12.2' });

  // @ts-ignore
  const forgeVersionMeta = Forge.VersionMeta.from(page.versions[0]);
  const result = await Forge.install(forgeVersionMeta, gameFolder, { tempDir: gameFolderPath, forceCheckDependencies: true });

  return Version.installDependencies(await Version.parse(gameFolder, result), gameFolderPath);
};

export const installGame = async () => {
  const path = await installJava();
  await installMinecraft();
  await installForge();

  return path;
};

export const installMods = async () => {
  console.log('Installing missing mods from MC Manager')
}