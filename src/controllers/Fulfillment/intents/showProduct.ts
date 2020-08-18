import * as emoji from 'node-emoji';
import models, { connectDb } from '../../../models';

// menu
const showProduct = async (agent: any) => {
  try {
    const categoryInputRaw = agent.context.get('menu').parameters.categorynumber1;
    const categoryInput = categoryInputRaw - 1;

    connectDb();
    // Get category
    const category = await models.CategoryModel.find();
    const categoryNames = category.map((name) => name.name);
    const exactCategory = categoryNames[categoryInput];
    // Get products from category
    const product = await models.ProductModel.find({ category: exactCategory });
    const productNames = product.map((menu) => menu.name);
    const productDesc = product.map((desc) => desc.description);
    // Display Products
    let productsEntry = '';
    let k;
    for (k = 0; k < (productNames || '').length; k++) {
      productsEntry +=
        k +
        1 +
        '.' +
        ' ' +
        '*' +
        (productNames || '')[k] +
        '*' +
        '\n' +
        (productDesc || '')[k] +
        '\n' +
        '\n';
    }
    agent.add(
      `Perfect, you selected the *${exactCategory}* Category \n` +
        `\n` +
        `These are the *Products Available*: \n` +
        `\n` +
        ` ${productsEntry} \n` +
        '_To make a selection reply with the number *ONLY* of your option._ \n' +
        '\n' +
        `*EXAMPLE:* Reply with *2* to Select ${productNames[1]} \n` +
        '\n' +
        `Reply *"Back"* - to go ${emoji.get(
          'leftwards_arrow_with_hook'
        )} to the *Category Page* \n` +
        `Reply *"Cancel"* - to go ${emoji.get('leftwards_arrow_with_hook')} to the *Main Menu*`
    );
    agent.context.delete('orderphone-followup');
    agent.context.delete('menu');
    agent.context.delete('qty1');
    agent.context.delete('menu-followup');
  } catch (err) {
    agent.add(
      'There is an *Error* from our *Servers*, please try again shortly... \n' +
        'Send *"hi"* to return'
    );
    agent.context.delete('orderphone-followup');
    agent.context.delete('menu');
    agent.context.delete('qty1');
    agent.context.delete('menu-followup');
  }
};

export default showProduct;
