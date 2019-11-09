// API/src/API/UI/MenuItemType.ts
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class MenuItem {
  @Field(type => Int)
  ID: number

  @Field(type => [MenuItem], { nullable: 'itemsAndList' })
  children?: MenuItem[]
}
