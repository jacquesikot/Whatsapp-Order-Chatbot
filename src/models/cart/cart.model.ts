import { model } from 'mongoose';
import { ICartDocument } from './cart.types';
import CartSchema from './cart.schema';

// tslint:disable-next-line: variable-name
export const CartModel = model<ICartDocument>('Cart', CartSchema);
