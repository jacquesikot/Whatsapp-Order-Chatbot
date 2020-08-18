import models, { connectDb } from '../../../models';

// Qty 2
const qty2 = async (agent: any) => {
  const data = agent.context.get('orderphone-followup').parameters;
  const categoryInput = data.categorynumber2;
  const productInput = data.productnumber2;

  // Get category
  connectDb();
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
  agent.add(`${exactProductName} is sold at N${exactProductPrice}. \n` + `How many do you want?`);
};
export default qty2;
