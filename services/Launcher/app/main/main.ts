import { format } from 'url';

import { BrowserWindow, app, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import { resolve } from 'app-root-path';
import { checkInstalled, installGame } from './Minecraft/InstallGame';
import { loginUser } from './Minecraft/Authenication';
import { launchMinecraft } from './Minecraft/Launch';
import { initClient } from './lib/initApollo';
import { installMissingMods } from './Minecraft/Mods';
import { ensureFileSync, pathExistsSync, readJSONSync } from 'fs-extra';
import { loadConfigSync, AppConfig, saveConfig } from './App/Settings';

let mWindow: BrowserWindow;

export const sendWindow = async (message: string) => {
  mWindow.webContents.send('update', message);
};

interface ProgressStatus {
  stage: string;
  progress: number;
}

export const sendStatus = async (status: ProgressStatus) => mWindow.webContents.send('statusUpdate', status);

app.on('ready', async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mWindow = mainWindow;

  await initClient();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  const devPath = 'http://localhost:1124';
  const prodPath = format({
    pathname: resolve('app/renderer/.parcel/production/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  const url = prodPath;

  mainWindow.setMenu(null);
  mainWindow.loadURL(url);
});

app.on('window-all-closed', app.quit);

ipcMain.on('launchGame', async (event: Electron.IpcMessageEvent, arg: any) => {
  console.log('Launching the Game');
  const javaPath = await installGame();
  sendStatus({ stage: 'Downloading Mods', progress: 0.8 })
  await installMissingMods();

  sendStatus({ stage: 'Launching', progress: 0.9 })
  await launchMinecraft(javaPath);
  event.sender.send('LaunchGameResponse', { successful: true });
});

ipcMain.on('installGame', async (event: Electron.IpcMessageEvent, arg: any) => {});

ipcMain.on('loginUser', async (event: Electron.IpcMessageEvent, arg: { username: string; password: string }) => {
  try {
    const session = await loginUser(arg)
    event.sender.send('loginUserResponse', { successful: true })
  } catch (e) {
    event.sender.send('loginUserResponse', { successful: false })
  }
});

ipcMain.on('checkInstall', (event: Electron.IpcMessageEvent, arg: any) => {
  event.returnValue = checkInstalled();
});

ipcMain.on('checkAuth', (event: Electron.IpcMessageEvent) => {
  event.returnValue = pathExistsSync(`${process.resourcesPath}/auth.json`)
})

ipcMain.on('getConfig', (event: Electron.IpcMessageEvent, arg: any) => {
  event.returnValue = loadConfigSync()
});

ipcMain.on('saveConfig', async (event: Electron.IpcMessageEvent, config: AppConfig) => {
  console.log(config)
  await saveConfig(config)

})