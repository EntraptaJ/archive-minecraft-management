// API/src/API/Minecraft/Admin/RCONPubSub.ts
import { Resolver, Authorized, Root, Mutation, Arg, PubSubEngine, Subscription, Field, ObjectType } from 'type-graphql';
import { Rcon } from 'rcon-client';
import { EventEmitter } from 'events';


let id = 0;

const MCContainerName = process.env.MCName || 'mc';

export class RCONPubSub extends PubSubEngine {
  public rcon: Rcon;
  public ee = new EventEmitter();

  public async publish(triggerName: string, payload: string) {
    const response = this.rcon.send(payload);
    this.ee.emit(triggerName, response);
  }

  public async subscribe(triggerName: string, onMessage: (...args: any[]) => string) {
    this.rcon = await Rcon.connect({
      host: MCContainerName,
      port: 25575,
      password: 'minecraft',
    });
    this.ee.addListener(triggerName, onMessage);
    return id++;
  }
  public async unsubscribe(subId: number) {}
}


export const pubSub = new RCONPubSub();