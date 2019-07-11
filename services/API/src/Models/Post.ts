// API/src/Models/Post.ts
import { ObjectType, Field, InputType } from 'type-graphql';
import { Typegoose, prop, arrayProp, Ref } from 'typegoose';
import { ModItem, ModItemInput } from './Mod';

@InputType()
export class NewPostInput {
  @Field()
  body: string;

  @Field(type => [ModItemInput])
  mods: [ModItemInput]
}

@ObjectType()
export class Post extends Typegoose {
  @prop()
  @Field()
  body: string;

  @prop({ default: new Date() })
  @Field()
  createDate?: Date;

  @arrayProp({ itemsRef: ModItem })
  @Field(type => [ModItem])
  mods: Ref<ModItem>;
}

export const PostModel = new Post().getModelForClass(Post);
