// MC-Launcher/app/main/Minecraft/Launch.ts
import { Launcher, Auth, Forge, Version, MinecraftFolder } from 'ts-minecraft';
import { spawn } from 'child_process';
import { loadSession } from './Authenication'
import { readJSON } from 'fs-extra';

export const launchMinecraft = async (javaPath: string) => {
  const authJSON = await readJSON(`${process.resourcesPath}/auth.json`) as { username: string, password: string }
  const auth = await Auth.Yggdrasil.login(authJSON)

  const mcArgs = await Launcher.generateArguments({
    auth,
    javaPath: `${javaPath}/jdk8u212-b04-jre/Contents/Home/bin/java`,
    gamePath: `${process.resourcesPath}/minecraft`,
    version: await Version.parse(new MinecraftFolder(`${process.resourcesPath}/minecraft`), '1.12.2-forge1.12.2-14.23.5.2838'),
  });

  let HWorld = [
    ...mcArgs.slice(0, 0),
    '-Xms5000M',
    '-Xmx5000M',
    '-d64 -server -XX:+AggressiveOpts -XX:ParallelGCThreads=3 -XX:+UseConcMarkSweepGC -XX:+UnlockExperimentalVMOptions -XX:+UseParNewGC -XX:+ExplicitGCInvokesConcurrent -XX:MaxGCPauseMillis=10 -XX:GCPauseIntervalMillis=50 -XX:+UseFastAccessorMethods -XX:+OptimizeStringConcat -XX:NewSize=84m -XX:+UseAdaptiveGCBoundary -XX:NewRatio=3 -Dfml.readTimeout=90 -Ddeployment.trace=true -Ddeployment.log=true -Ddeployment.trace.level=all',
    '-Dfml.ignoreInvalidMinecraftCertificates=true',
    `-Djava.library.path=${process.resourcesPath}/minecraft/versions/1.12.2/1.12.2-natives`,
    ...mcArgs.slice(3),
  ];
  console.log(HWorld);
  await spawn(mcArgs[0], HWorld, {
    stdio: 'inherit',
  });

}