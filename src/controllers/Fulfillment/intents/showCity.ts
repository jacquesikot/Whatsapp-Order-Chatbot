import models, { connectDb } from '../../../models';

// City
const showCity = async (agent: any) => {
  const phoneNumberRaw = agent.context.get('orderphone-followup').parameters.phonenumber;
  const phoneNumber = +phoneNumberRaw;
  connectDb();

  // Get cities
  const citiesDb = await models.CityModel.find();
  const city = citiesDb.map((name) => name.name);
  let cities = '';
  let i;
  for (i = 0; i < city.length; i++) {
    cities += i + 1 + ' ' + city[i] + '\n';
  }

  agent.add(
    `Select your delivery city below: \n` +
      `${cities} \n` +
      `\n` +
      'To return to delivery mode selection, send "Back"'
  );
};

export default showCity;
