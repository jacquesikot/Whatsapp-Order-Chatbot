import models, { connectDb } from '../../../models';

// Cart4
const addToCart4 = async (agent: any) => {
  const data = agent.context.get('orderphone-followup').parameters;
  const phoneNumberRaw = data.userphonenumber.toString();
  const phoneNumber = +phoneNumberRaw;
  const categoryInput = data.categorynumber4;
  const productInput = data.productnumber4;
  const quantity = data.qty4;

  connectDb();

  // Get category
  const category = await models.CategoryModel.find();
  const categoryNames = category.map((name) => name.name);
  const exactCategory = categoryNames[categoryInput];

  // Get product name & price
  const product = await models.ProductModel.find({
    category: exactCategory,
  });
  const productNames = product.map((name) => name.name);
  const productPrice = product.map((price) => price.price);
  const exactProductName = productNames[productInput];
  const exactProductPrice = productPrice[productInput];

  // Get cart
  const cartDb = await models.CartModel.findOne({
    cusNumber: phoneNumber,
  });

  // Get cart details
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
  const cartTotal = cartOrderTotal?.reduce(add);

  // Push cart item to cart
  const total = +exactProductPrice * +quantity;
  const newCart = await models.CartModel.findOne({
    cusNumber: phoneNumber,
  });
  newCart?.orders?.push({
    name: exactProductName,
    category: exactCategory,
    price: exactProductPrice,
    qty: quantity,
    total,
  });
  await newCart?.save();

  // Show products
  let categories = '';
  let i;
  for (i = 0; i < categoryNames.length; i++) {
    categories += i + ' ' + categoryNames[i] + '\n';
  }

  agent.add(
    `*CART* (1 slots remaining) \n` +
      `${cartEntry} \n` +
      `${exactProductName} (X${quantity}) - ${total}\n` +
      `TOTAL: N${(cartTotal || 0) + +total} \n` +
      `\n` +
      `${categories}` +
      `\n` +
      `To add another product, select product category \n` +
      `To finish order and *Checkout* send *"Finish"* \n`
  );
};

export default addToCart4;
