import { Rcon } from 'rcon-client/lib';

export let mcRCON: Rcon


const MCContainerName = process.env.MCName || 'mc';

export const connectRCON = async () => {
  mcRCON = await Rcon.connect({
    host: MCContainerName,
    port: 25575,
    password: 'minecraft',
  });
  return true;
}