// MC-Launcher/app/main/Minecraft/Authenication.ts
import { Auth } from 'ts-minecraft';
import { outputJSON, readJSON } from 'fs-extra';

interface userAuth {
  username: string;
  password: string;
}

export const loginUser = async (user: userAuth) => {
  if (!user) return;
  const session = await Auth.Yggdrasil.login(user);
  await outputJSON(`${process.resourcesPath}/auth.json`, user);
  return session;
};

export const saveSession = async (session: Auth) => {
  await outputJSON('session.json', session);
};

export const loadSession = async (): Promise<Auth> => {
  const sessionJSON = (await readJSON('session.json')) as Auth;
  return Auth.Yggdrasil.refresh(sessionJSON);
};
