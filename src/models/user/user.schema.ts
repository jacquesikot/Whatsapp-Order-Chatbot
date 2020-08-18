import { Schema } from 'mongoose';

// tslint:disable-next-line: variable-name
const UserSchema = new Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: String,
    address: String,
    city: String,
  },
  { timestamps: true }
);

export default UserSchema;
