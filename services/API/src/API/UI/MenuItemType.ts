// API/src/API/UI/MenuItemType.ts
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class MenuItem {
  @Field()
  label: string

  @Field()
  path: string

  @Field(type => [MenuItem], { nullable: 'itemsAndList'})
  children?: MenuItem[]
}