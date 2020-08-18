import { Document, Model } from 'mongoose';

export interface IUser {
  phoneNumber: number;
  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
