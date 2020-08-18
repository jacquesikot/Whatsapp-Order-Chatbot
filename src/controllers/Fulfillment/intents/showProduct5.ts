import models, { connectDb } from '../../../models';

// Menu5
const showProduct5 = async (agent: any) => {
  const data = agent.context.get('orderphone-followup').parameters;
  const categoryInput = data.categorynumber5;
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

  // Display products
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

  // Display cart items
  let cartEntry = '';
  let k;
  for (k = 0; k < (cartOrderTotal || '').length; k++) {
    cartEntry +=
      k +
      1 +
      ' - ' +
      (cartOrderName || '')[k] +
      ' - ' +
      'x' +
      (cartOrderQty || '')[k] +
      ' - ' +
      'N' +
      (cartOrderPrice || '')[k] +
      '\n';
  }

  // Get total
  const add = (a: number, b: number) => a + b;
  const total = cartOrderTotal?.reduce(add);

  agent.add(
    `*CART* \n` +
      `${cartEntry} \n` +
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

export default showProduct5;
