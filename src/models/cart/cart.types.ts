import { Document, Model } from 'mongoose';

export interface IOrders {
  name: string;
  category: string;
  price: number;
  qty: number;
  total: number;
}

export interface ICart {
  cusNumber: number;
  cusName: string;
  address?: string;
  city?: string;
  orders?: IOrders[];
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICartDocument extends ICart, Document {}
export interface ICartModel extends Model<ICartDocument> {}
