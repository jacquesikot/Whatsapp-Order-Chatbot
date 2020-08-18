import { model } from 'mongoose';
import { IVendorDocument } from './vendors.types';
import VendorSchema from './vendors.schema';

// tslint:disable-next-line: variable-name
export const VendorModel = model<IVendorDocument>('Vendor', VendorSchema);
