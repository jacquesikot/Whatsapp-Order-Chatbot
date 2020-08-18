import * as emoji from 'node-emoji';
import models, { connectDb } from '../../../models';
import capitalize from '../../../helpers/capitalize';

async function addUser(agent: any) {
  try {
    const firstName = capitalize(agent.context.get('orderphone-followup').parameters.firstname);
    const email = agent.context
      .get('orderphone-followup')
      .parameters.email.toLowerCase()
      .toString();
    const phoneNumberRaw = agent.context
      .get('orderphone-followup')
      .parameters.userphonenumber.toString();
    const phoneNumber = +phoneNumberRaw;

    connectDb();
    const user = await new models.UserModel({
      phoneNumber,
      firstName,
      email,
    });
    await user.save();
    const categories = await models.CategoryModel.find();
    const categoryName = categories.map((cat) => cat.name);
    let category = '';
    let i;
    for (i = 0; i < categoryName.length; i++) {
      category += i + ' ' + categoryName[i] + '\n';
    }

    agent.add(
      `Pleasure meeting you *${firstName}*, \n` +
        `Email: *${email}* \n` +
        `Phone number: *${phoneNumberRaw}* \n` +
        `We\'d be best friends in no time ${emoji.get('laughing')} \n` +
        '\n' +
        `Select your category below: \n` +
        ` ${category} \n`
    );
    agent.context.delete('email-followup');
    // agent.context.delete('orderphone-followup');
  } catch (err) {
    agent.add('Error sending info to DB, send *"hi"* to go back');
    agent.context.delete('email-followup');
    agent.context.delete('orderphone-followup');
  }
}

export default addUser;
