// API/src/API/Minecraft/Twitch/TwitchTypes.ts
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType('CurseModFileDep')
export class CurseFileDependency {
  @Field(type => Int)
  id: number

  @Field(type => Int)
  addonId: number
  
  @Field(type => Int)
  type: number

  @Field(type => Int)
  fileId: number
}

@ObjectType('CurseModFile')
export class CurseFile {
  @Field(type => Int)
  id: number;

  @Field()
  displayName: string;

  @Field(type => [CurseFileDependency])
  dependencies: CurseFileDependency[]

  @Field()
  fileName: string;

  @Field()
  fileDate: Date;

  @Field(type => Int)
  fileLength: number;

  @Field(type => Int)
  releaseTyp: number;

  @Field(type => Int)
  fileStatus: number;

  @Field()
  downloadUrl: string;

  @Field(type => Boolean)
  isAlternate: boolean;

  @Field(type => Int)
  alternateFileId: number;

  @Field(type => [String])
  gameVersion: string[]
}

@ObjectType('CurseModAuthors')
export class CurseAuthor {
  @Field()
  name: string;

  @Field()
  url: string;

  @Field(type => Int)
  projectID: number;

  @Field(type => Int)
  id: number;

  @Field(type => Int, { nullable: true })
  projectTitleId?: number;

  @Field({ nullable: true })
  projectTitleTitle?: string;

  @Field(type => Int)
  userId: number;

  @Field(type => Int)
  twitchId: number;
}

@ObjectType('CurseMod')
export class CurseMod {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => [CurseAuthor])
  authors: CurseAuthor[];

  @Field()
  summary: string;

  @Field(type => [CurseFile])
  latestFiles: CurseFile[];

  @Field()
  websiteUrl: string
}