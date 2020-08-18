import models, { connectDb } from '../../../models';

// End
const finishOrder2 = async (agent: any) => {
  const data = agent.context.get('orderphone-followup').parameters;
  const phoneNumberRaw = data.userphonenumber;
  const phoneNumber = +phoneNumberRaw;

  connectDb();

  // Get address from user
  const user = await models.UserModel.findOne({
    phoneNumber,
  });
  const userName = user?.firstName;

  // Get cart and save address
  const cart = await models.CartModel.findOne({
    cusNumber: phoneNumber,
  });

  // Get cart details
  const cartOrder = cart?.orders;
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

  agent.add(
    '*ORDER SUMMARY* \n' +
      '\n' +
      `${cartEntry} \n` +
      `TOTAL: ${cartTotal} \n` +
      '\n' +
      `Name: ${userName} \n` +
      `Phone: ${phoneNumberRaw} \n` +
      `Pickup: 5 Mkpok Lane Eket \n` +
      `Thank you for your order!`
  );
  agent.context.delete('orderphone-followup');
  agent.context.delete('end');
};

export default finishOrder2;
