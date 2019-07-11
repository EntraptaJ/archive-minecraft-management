// API/src/Models
import { Typegoose, prop } from 'typegoose'
import { ObjectType, Field, InputType } from 'type-graphql'

@InputType()
export class ModItemInput {
  @Field()
  name: string

  @Field()
  file: string
}

@ObjectType()
export class ModItem extends Typegoose {
  @Field()
  @prop()
  name: string

  @Field()
  @prop()
  file: string
}

export const ModItemModel = new ModItem().getModelForClass(ModItem);