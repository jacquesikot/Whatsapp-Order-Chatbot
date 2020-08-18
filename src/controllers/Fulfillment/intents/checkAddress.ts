import models, { connectDb } from '../../../models';

// CheckAddress
const checkAddress = async (agent: any) => {
  const data = agent.context.get('orderphone-followup').parameters;
  const phoneNumberRaw = data.userphonenumber;
  const phoneNumber = +phoneNumberRaw;

  connectDb();

  const user = await models.UserModel.findOne({
    phoneNumber,
  });
  const address = user?.address;
  const city = user?.city;

  if (address) {
    agent.add(
      'We found your previous address! \n' +
        `Address: ${address} \n` +
        `City: ${city} \n` +
        `\n` +
        `Do you want to use this address? \n` +
        `\n` +
        `If you need to change this address send "add new"`
    );
  } else {
    agent.add('We need to get your delivery address, send "add new" to add a new address');
  }
};

export default checkAddress;
