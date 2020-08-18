import { Schema } from 'mongoose';

// tslint:disable-next-line: variable-name
const CitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default CitySchema;
