// API/src/API/Minecraft/ModType.ts
import { ObjectType, Field, Authorized } from 'type-graphql'

@ObjectType()
export class ModType {
  @Field()
  name: string

  @Field()
  fileName: string
 
  
  @Authorized(['Admin'])
  @Field()
  disabled: boolean

  @Authorized(['Admin'])
  @Field({ nullable: true })
  config?: string
}