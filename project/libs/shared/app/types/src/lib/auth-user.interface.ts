import { IUser } from './user.interface';

export interface IAuthUser extends IUser {
  _id?: string;
  passwordHash: string;
}
