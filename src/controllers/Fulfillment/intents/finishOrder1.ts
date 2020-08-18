import models, { connectDb } from '../../../models';

// ConfirmAddress - yes
const finishOrder1 = async (agent: any) => {
  const data = agent.context.get('orderphone-followup').parameters;
  const phoneNumberRaw = data.userphonenumber;
  const address = data.address;
  const cityInputRaw = data.city;
  const cityInput = cityInputRaw - 1;
  const phoneNumber = +phoneNumberRaw;

  connectDb();
  // Get city
  const city = await models.CityModel.find();
  const cityNames = city.map((name) => name.name);
  const exactCity = cityNames[cityInput];

  // Add address to user
  const user = await models.UserModel.findOne({
    phoneNumber,
  });

  const userName = user?.firstName;

  if (user) (user || '').address = address;
  if (user) (user || '').city = exactCity;

  await user?.save();

  // Get cart and save address
  const cart = await models.CartModel.findOne({
    cusNumber: phoneNumber,
  });
  if (cart) (cart || '').address = address;
  if (cart) (cart || '').city = exactCity;

  await cart?.save();

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
      `Address: ${address} \n` +
      `City: ${exactCity} \n` +
      `\n` +
      `Thank you for your order!`
  );
  agent.context.delete('orderphone-followup');
  agent.context.delete('confirmaddress-followup');
};

export default finishOrder1;
