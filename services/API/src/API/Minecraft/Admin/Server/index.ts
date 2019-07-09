// API/src/API/Minecraft/Admin/Controls/index.ts
// Start, Stop, Restart, FMLConfirm Management
import { ObjectType, Field, Resolver, Mutation, InputType, Arg } from 'type-graphql';
import { MutationResponse } from '../../../Mutations';
import { mcRCON } from '../../../../Utils/RCON';
import { discordClient } from '../../../../Discord';
import { sendMessage } from '../../../../Utils/Discord';
import { restartMCContainer } from '../../../../Utils/Server';

@ObjectType({ implements: MutationResponse })
class StartMutationResponse extends MutationResponse {}

@InputType()
class RestartServerInput {
  @Field({ nullable: true, defaultValue: false })
  skipDelay: boolean;
}

@Resolver()
export default class ServerManagementResolver {
  @Mutation(returns => StartMutationResponse)
  public async restartServer(
    @Arg('options', type => RestartServerInput, { nullable: true }) options?: RestartServerInput,
  ): Promise<StartMutationResponse> {
    const time = options && options.skipDelay ? 5000 : 300000;
    const baseMessage = `Server restarting in ${options && options.skipDelay ? '5 seconds' : `5 minutes`}!`;
    const baseMCMessage = { text: baseMessage, color: 'red' };

    // Send MC Message
    if (mcRCON && mcRCON.authenticated) mcRCON.send(`/tellraw @a ${JSON.stringify(baseMCMessage)}`);
    // Send Discord Message
    if (discordClient.token) sendMessage(baseMessage);

    // Restart Server after timeout
    setTimeout(() => restartMCContainer(), time);
    return { success: true };
  }
}
