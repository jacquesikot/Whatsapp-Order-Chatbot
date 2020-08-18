import { model } from 'mongoose';
import { IUserDocument } from './user.types';
import UserSchema from './user.schema';

// tslint:disable-next-line: variable-name
export const UserModel = model<IUserDocument>('User', UserSchema);
