import { Rcon }  from 'rcon-client'
import { findContainer } from './Docker';

export let mcRCON: Rcon;

const MCContainerName = process.env.MCName || 'mc';

export const connectRCON = async () => {
  mcRCON = await Rcon.connect({
    host: MCContainerName,
    port: 25575,
    password: 'minecraft',
  });

  return true;
};


export const startRCON = async () => {
  if (mcRCON && mcRCON.authenticated === true) return;
  const cont = await findContainer()
  const contStatus = await cont.inspect();

  // @ts-ignore
  if (contStatus.State.Status === 'running' && contStatus.State.Health.Status === 'healthy') connectRCON();
}