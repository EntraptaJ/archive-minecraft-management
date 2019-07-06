import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class MinecraftStatus {
  @Field()
  motd: string;

  @Field()
  gametype: string;

  @Field()
  game_id: string;

  @Field()
  version: string;

  @Field()
  plugins: string;

  @Field()
  map: string;

  @Field(type => Int)
  online_players: number;

  @Field(type => Int)
  max_players: number;

  @Field()
  port: string;

  @Field(type => [String])
  players: string[];
}
