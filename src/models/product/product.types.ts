import { Document, Model } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  category: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IProductDocument extends IProduct, Document {}
export interface IProductModel extends Model<IProductDocument> {}
