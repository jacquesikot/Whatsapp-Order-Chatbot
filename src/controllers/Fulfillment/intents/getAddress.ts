import models, { connectDb } from '../../../models';

// Address
const getAddress = async (agent: any) => {
  const cityInputRaw = agent.context.get('orderphone-followup').parameters.city;
  const cityInput = cityInputRaw - 1;
  connectDb();

  // Get city
  const city = await models.CityModel.find();
  const cityNames = city.map((name) => name.name);
  const exactCity = cityNames[cityInput];

  agent.add(
    `You selected ${exactCity}. What is your full delivery address? \n` +
      'To return to select city send "Back"'
  );
};

export default getAddress;
