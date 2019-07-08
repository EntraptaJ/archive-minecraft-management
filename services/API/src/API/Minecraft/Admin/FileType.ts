// API/src/API/Minecraft/Admin/FileType.ts
import { Readable } from 'stream';
import { Field } from 'type-graphql';

export class FileInput {
  @Field() filename: string;

  @Field() mimetype: string;

  @Field() encoding: string;

  createReadStream: () => Readable;
}
