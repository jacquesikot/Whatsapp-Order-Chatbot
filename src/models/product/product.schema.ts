import { Schema, Mongoose } from 'mongoose';
// const AutoIncrement = require('mongoose-sequence')(Mongoose);

// tslint:disable-next-line: variable-name
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default ProductSchema;
