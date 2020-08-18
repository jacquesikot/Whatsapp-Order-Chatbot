import { connectDb, disconnect } from './db';
import { VendorModel } from './vendors/vendors.model';
import { UserModel } from './user/user.model';
import { CategoryModel } from './category/category.model';
import { ProductModel } from './product/product.model';
import { CartModel } from './cart/cart.model';
import { CityModel } from './city/city.model';

const models = {
  VendorModel,
  UserModel,
  CategoryModel,
  ProductModel,
  CartModel,
  CityModel,
};

export default models;
export { connectDb, disconnect };
