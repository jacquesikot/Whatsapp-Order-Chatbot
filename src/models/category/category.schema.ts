import { Schema } from 'mongoose';

// tslint:disable-next-line: variable-name
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    shortDescription: String,
  },
  { timestamps: true }
);

export default CategorySchema;
