import { Document, model, Model, Schema } from 'mongoose';

export interface IVendorDocument extends Document {
  name: string;
  address: string;
}
interface IVendorModel extends Model<IVendorDocument> {
  findByName: (loginName: string) => string;
  name: string;
  address: string;
}

const vendorSchema: Schema = new Schema(
  {
    name: String,
    address: String,
  },
  { timestamps: true }
);

vendorSchema.statics.findByName = async function (loginName: string) {
  const vendor: string = await this.findOne({
    name: loginName,
  });
  return vendor;
};

// tslint:disable-next-line: variable-name
const Vendor: IVendorModel = model<IVendorDocument, IVendorModel>('Vendor', vendorSchema);

export default Vendor;
