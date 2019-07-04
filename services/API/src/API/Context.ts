import { User } from '../Models/User';
import { InstanceType } from 'typegoose';

export interface ContextType {
  user: InstanceType<User> | undefined;
}
