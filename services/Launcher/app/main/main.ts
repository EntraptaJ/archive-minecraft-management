import { format } from 'url';

import { BrowserWindow, app, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import { resolve } from 'app-root-path';
import { checkInstalled, installGame } from './Minecraft/InstallGame';
import { loginUser, loadSession } from './Minecraft/Authenication';
import { launchMinecraft } from './Minecraft/Launch';
import { initClient } from './lib/initApollo';
import { listServerMods, listClientMods, installMissingMods } from './Minecraft/Mods';

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
  const url = isDev ? devPath : prodPath;

  mainWindow.setMenu(null);
  mainWindow.loadURL(url);
});

app.on('window-all-closed', app.quit);

ipcMain.on('launchGame', async (event: Electron.IpcMessageEvent, arg: any) => {
  console.log('Launching the Game');
  const javaPath = await installGame();
  console.log(javaPath);
  await installMissingMods()
  await launchMinecraft(javaPath);
  event.sender.send('LaunchGameResponse', { successful: true });
});

ipcMain.on('installGame', async (event: Electron.IpcMessageEvent, arg: any) => {});

ipcMain.on('loginUser', async (event: Electron.IpcMessageEvent, arg: { username: string; password: string }) => {
  const session = await loginUser(arg);
  event.sender.send('newSession', { successful: true });
});

ipcMain.on('checkInstall', (event: Electron.IpcMessageEvent, arg: any) => {
  event.returnValue = checkInstalled();
});
