// API/src/Utils/Server.ts
import { mcRCON, connectRCON } from './RCON'
import { findContainer } from './Docker'

export const restartMCContainer = async () => {
  const cont = await findContainer();
  await mcRCON.disconnect()
  await cont.restart()
}

