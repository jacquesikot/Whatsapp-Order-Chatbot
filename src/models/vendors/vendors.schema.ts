import { Schema } from 'mongoose';
import { findByName } from './vendors.statics';
import { setVendorName } from './vendors.methods';

// tslint:disable-next-line: variable-name
const VendorSchema = new Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },
    vendorAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

VendorSchema.statics.findByName = findByName;
VendorSchema.methods.setVendorName = setVendorName;

export default VendorSchema;
