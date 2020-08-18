import { Schema } from 'mongoose';

// tslint:disable-next-line: variable-name
const CartSchema = new Schema(
  {
    cusNumber: {
      type: Number,
      required: true,
    },
    cusName: {
      type: String,
      required: true,
    },
    address: String,
    city: String,
    orders: [
      {
        name: String,
        category: String,
        price: Number,
        qty: Number,
        total: Number,
      },
    ],
  },
  { timestamps: true }
);

export default CartSchema;
