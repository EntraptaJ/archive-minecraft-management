// API/src/API/Minecraft/Admin/Backups/BackupType.ts
import { ObjectType, Field } from 'type-graphql'

@ObjectType('Backup')
export class Backup {
  @Field()
  name: string

  @Field()
  date: Date

  @Field()
  folderName: string
}