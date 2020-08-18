import { Document } from 'mongoose';
import { IVendorDocument } from './vendors.types';

export async function setVendorName(this: IVendorDocument): Promise<Document[]> {
  return this.model('Vendor').find({ vendorName: this.vendorName });
}
