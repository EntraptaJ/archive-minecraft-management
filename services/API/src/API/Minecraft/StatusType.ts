// API/src/API/Minecraft/StatusType.ts
import { ObjectType, Field, Authorized } from 'type-graphql';
import { MinecraftStatus } from './ServerStatus';

@ObjectType('Status')
export class StatusType {
  @Field(type => Boolean)
  online: boolean;

  @Authorized(['Admin'])
  @Field({ nullable: true })
  health?: string

  @Field(type => MinecraftStatus, { nullable: true })
  MCState: MinecraftStatus;
}
