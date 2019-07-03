import { prop, Typegoose, pre, instanceMethod } from 'typegoose';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { ForbiddenError, ObjectType, Field } from 'type-graphql';

export enum IPermissionENUM {
  'READ' = 'READ',
  'WRITE' = 'WRITE',
  'ADMIN' = 'ADMIN',
}

export type IPermission = 'READ' | 'WRITE' | 'ADMIN' | IPermissionENUM;

export type Role = 'User' | 'Admin';

@pre<User>('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  this.id = this._id;
})
@ObjectType()
export class User extends Typegoose {
  @prop()
  @Field(type => String)
  id?: string;

  @prop()
  @Field(type => String)
  username: string;

  @prop()
  @Field(type => String)
  password: string;

  @prop({ default: ['User'] })
  role: Role[];

  @instanceMethod
  async generateToken(this: User, plainText: string): Promise<string> {
    const valid = await compare(plainText, this.password);
    if (!valid) throw new ForbiddenError();
    return sign({ id: this.id }, 'SECRET', {
      expiresIn: '60d',
    });
  }
}

export const UserModel = new User().getModelForClass(User);
