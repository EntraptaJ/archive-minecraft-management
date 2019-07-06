// API/src/API/Minecraft/StatusType.ts
import { ObjectType, Field } from 'type-graphql'
import { MinecraftStatus } from './ServerStatus'

@ObjectType('Status')
export class StatusType {
  @Field(type => Boolean)
  online: boolean

  @Field(type => MinecraftStatus, { nullable: true })
  MCState: MinecraftStatus
}