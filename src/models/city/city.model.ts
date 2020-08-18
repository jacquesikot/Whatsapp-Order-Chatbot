import { model } from 'mongoose';
import { ICityDocument } from './city.types';
import CitySchema from './city.schema';

// tslint:disable-next-line: variable-name
export const CityModel = model<ICityDocument>('City', CitySchema);
