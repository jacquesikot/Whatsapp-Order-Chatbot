import { Document, Model } from 'mongoose';

export interface ICategory {
  name: string;
  shortDescription: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICategoryDocument extends ICategory, Document {}
export interface ICategoryModel extends Model<ICategoryDocument> {}
