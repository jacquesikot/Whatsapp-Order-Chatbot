import { model } from 'mongoose';
import { ICategoryDocument } from './category.types';
import CategorySchema from './category.schema';

// tslint:disable-next-line: variable-name
export const CategoryModel = model<ICategoryDocument>('Category', CategorySchema);
