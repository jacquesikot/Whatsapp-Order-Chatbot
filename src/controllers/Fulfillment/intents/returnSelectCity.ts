import models, { connectDb } from '../../../models';

// AddressBack
const returnSelectCity = async (agent: any) => {
  connectDb();
  const citiesDb = await models.CityModel.find();
  const city = citiesDb.map((name) => name.name);
  let cities = '';
  let i;
  for (i = 0; i < city.length; i++) {
    cities += i + 1 + ' ' + city[i] + '\n';
  }

  agent.add(`Select your delivery city below: \n` + `${cities}`);
};

export default returnSelectCity;
