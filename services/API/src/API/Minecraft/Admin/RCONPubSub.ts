// API/src/API/Minecraft/Admin/RCONPubSub.ts
import { PubSubEngine } from 'type-graphql';
import { EventEmitter } from 'events';
import { mcRCON } from '../../../RCON';


let id = 0;


export class RCONPubSub extends PubSubEngine {
  public ee = new EventEmitter();

  public async publish(triggerName: string, payload: string) {
    const response = mcRCON.send(payload);
    this.ee.emit(triggerName, response);
  }

  public async subscribe(triggerName: string, onMessage: (...args: any[]) => string) {
    this.ee.addListener(triggerName, onMessage);
    return id++;
  }
  public async unsubscribe(subId: number) {}
}


export const pubSub = new RCONPubSub();