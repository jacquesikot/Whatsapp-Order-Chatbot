import { Document, Model } from 'mongoose';

export interface ICity {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICityDocument extends ICity, Document {}
export interface ICityModel extends Model<ICityDocument> {}
