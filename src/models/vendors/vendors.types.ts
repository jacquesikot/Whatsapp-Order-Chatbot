import { Document, Model } from 'mongoose';

interface IVendor {
  vendorName: string;
  vendorAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVendorDocument extends IVendor, Document {
  setVendorName: (this: IVendorDocument) => Promise<Document[]>;
}
export interface IVendorModel extends Model<IVendorDocument> {
  findByName: (this: IVendorModel, { name }: { name: string }) => Promise<IVendorDocument>;
}
