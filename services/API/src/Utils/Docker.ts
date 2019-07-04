// API/src/Utils/Docker.ts
import Docker from 'dockerode'

const docker = new Docker({
  socketPath: '/var/run/docker.sock',
  version: 'v1.39',
});

const MCContainerName = process.env.MCName || 'mc';

export const findContainer = async () => {
  let opts = {
    filters: `{"label": ["com.docker.compose.service=${MCContainerName}"]}`,
  };
  const containers = await docker.listContainers(opts);
  const { Id } = containers.find(({ Image }) => Image == 'itzg/minecraft-server');
  return docker.getContainer(Id);
};

const execRCON = async (container: Docker.Container, command: string) => {
  const exec = await container.exec({
    Cmd: ['rcon-cli', command],
  });

  return exec.start();
};
