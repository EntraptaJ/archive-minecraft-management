// MC-Launcher/app/main/Minecraft/Launch.ts
import { Launcher, Auth, Forge, Version, MinecraftFolder } from 'ts-minecraft';
import { spawn } from 'child_process';
import { readJSON, ensureDir } from 'fs-extra';
import { findJavaBinary } from '../Java/findJava';
import { loadConfig } from '../App/Settings';

export const launchMinecraft = async (javaPath: string) => {
  const config = await loadConfig();
  const authJSON = (await readJSON(`${process.resourcesPath}/auth.json`)) as { username: string; password: string };
  const auth = await Auth.Yggdrasil.login(authJSON);

  const javaBinaryPath = await findJavaBinary(`${javaPath}/jdk8u212-b04-jre`);

  const mcArgs = await Launcher.generateArguments({
    auth,
    javaPath: javaBinaryPath,
    gamePath: `${process.resourcesPath}/minecraft`,
    version: await Version.parse(new MinecraftFolder(`${process.resourcesPath}/minecraft`), '1.12.2-forge1.12.2-14.23.5.2838'),
    resourcePath: `${process.resourcesPath}/minecraft`,
    extraJVMArgs: [
      '-d64',
      '-server',
      '-XX:+AggressiveOpts',
      `-XX:ParallelGCThreads=3`,
      '-XX:+UseConcMarkSweepGC',
      '-XX:+UnlockExperimentalVMOptions',
      '-XX:+UseParNewGC',
      '-XX:+ExplicitGCInvokesConcurrent',
      '-XX:MaxGCPauseMillis=10',
      '-XX:GCPauseIntervalMillis=50',
      '-XX:+UseFastAccessorMethods',
      '-XX:+OptimizeStringConcat',
      '-XX:NewSize=84m',
      '-XX:+UseAdaptiveGCBoundary',
      '-XX:NewRatio=3',
      '-Dfml.readTimeout=90',
      '-Ddeployment.trace=true',
      '-Ddeployment.log=true',
      '-Ddeployment.trace.level=all',
    ],
  });

  let cliArgs = [
    ...mcArgs.slice(0, 0),
    `-Xmx${config.ramAllocation}G`,
    '-Dfml.ignoreInvalidMinecraftCertificates=true',
    `-Djava.library.path=${process.resourcesPath}/minecraft/versions/1.12.2/1.12.2-natives`,
    ...mcArgs.slice(1).filter((str) => !str.includes('-Djava.library.path') && !str.includes('-XstartOnFirstThread') ),
  ];
  console.log(mcArgs[0])

  await spawn(mcArgs[0], cliArgs, {
    stdio: 'ignore',
    detached: true,
    cwd: `${process.resourcesPath}/minecraft`
  });
};
