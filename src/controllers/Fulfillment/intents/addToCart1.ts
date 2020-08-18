import models, { connectDb } from '../../../models';

// Cart1
const addToCart1 = async (agent: any) => {
  const data = agent.context.get('orderphone-followup').parameters;
  const phoneNumberRaw = data.userphonenumber.toString();
  const phoneNumber = +phoneNumberRaw;
  const categoryInput = data.categorynumber1;
  const productInput = data.productnumber1;
  const qty = data.qty1;

  connectDb();

  // Get user name
  const user = await models.UserModel.findOne({
    phoneNumber,
  });
  const userName = user?.firstName;

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

  // Create cart
  const total = qty * +exactProductPrice;
  const cart = new models.CartModel({
    cusNumber: phoneNumber,
    cusName: userName,
    orders: [
      {
        name: exactProductName,
        category: exactCategory,
        price: +exactProductPrice,
        qty,
        total,
      },
    ],
  });
  await cart.save();

  // Show products
  let categories = '';
  let i;
  for (i = 0; i < categoryNames.length; i++) {
    categories += i + ' ' + categoryNames[i] + '\n';
  }

  agent.add(
    `*CART* (4 slots remaining) \n` +
      `1 - ${exactProductName} - x${qty} - ${exactProductPrice}\n` +
      `TOTAL: N${exactProductPrice * qty}\n` +
      `\n` +
      `${categories}` +
      `\n` +
      `To add another product, select product category \n` +
      `To finish order and *Checkout* send *"Finish"* \n` +
      `To delete the last product added send *"Remove"*`
  );
};

export default addToCart1;
