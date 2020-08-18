import { model } from 'mongoose';
import { IProductDocument } from './product.types';
import ProductSchema from './product.schema';

// tslint:disable-next-line: variable-name
export const ProductModel = model<IProductDocument>('Product', ProductSchema);
