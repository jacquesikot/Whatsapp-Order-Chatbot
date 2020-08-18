import models, { connectDb } from '../../../models';

// Menu2
const showProduct2 = async (agent: any) => {
  const data = agent.context.get('orderphone-followup').parameters;
  const categoryInput = data.categorynumber2;
  const phoneNumberRaw = data.userphonenumber;
  const phoneNumber = +phoneNumberRaw;

  connectDb();

  // Get category
  const category = await models.CategoryModel.find();
  const categoryNames = category.map((name) => name.name);
  const exactCategory = categoryNames[categoryInput];

  // Get product
  const product = await models.ProductModel.find({ category: exactCategory });
  const productNames = product.map((menu) => menu.name);
  let products = '';
  let i;
  for (i = 0; i < productNames.length; i++) {
    products += i + ' ' + productNames[i] + '\n';
  }

  // Get cart details & map them
  const cartDb = await models.CartModel.findOne({
    cusNumber: phoneNumber,
  });
  const cartOrder = cartDb?.orders;
  const cartOrderName = cartOrder?.map((name) => name.name);
  const cartOrderPrice = cartOrder?.map((price) => price.price);
  const cartOrderQty = cartOrder?.map((qty) => qty.qty);
  const cartOrderTotal = cartOrder?.map((totals) => totals.total);
  let cartName = '';
  const cartNameList = cartOrderName?.forEach((name) => {
    cartName += name;
  });
  let cartPrice = '';
  const cartPriceList = cartOrderPrice?.forEach((price) => {
    cartPrice += price;
  });
  let cartQty = '';
  const cartQtyList = cartOrderQty?.forEach((qty) => {
    cartQty += qty;
  });
  // Get total
  const add = (a: number, b: number) => a + b;
  const total = cartOrderTotal?.reduce(add);

  agent.add(
    `*CART* \n` +
      `1 - ${cartName} - x${cartQty} - N${cartPrice} \n` +
      `*TOTAL* = N${total} \n` +
      `These are the items available in ${exactCategory} \n` +
      `\n` +
      ` ${products} \n` +
      `\n` +
      `To add product, select product number \n` +
      `To return to *Category* send *"Back"*` +
      `To finish and *Chechout* send *Finish*`
  );
};

export default showProduct2;
