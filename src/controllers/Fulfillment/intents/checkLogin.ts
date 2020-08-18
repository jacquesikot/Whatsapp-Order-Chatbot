import models, { connectDb } from '../../../models';
import * as emoji from 'node-emoji';

const checkLogin = async (agent: any) => {
  try {
    const data = agent.context.get('orderphone-followup').parameters;
    const userPhoneNumberRaw = data.userphonenumber.toString();
    const userPhoneNumber = +userPhoneNumberRaw;
    connectDb();
    // Get user
    const user = await models.UserModel.findOne({
      phoneNumber: userPhoneNumber,
    });
    // Get categories from DB
    const categories = await models.CategoryModel.find();
    const categoryName = categories.map((cat) => cat.name);
    const categoryDesc = categories.map((desc) => desc.shortDescription);
    // Display Categories
    let categoryEntry = '';
    let k;
    for (k = 0; k < (categoryName || '').length; k++) {
      categoryEntry +=
        k +
        1 +
        '.' +
        ' ' +
        '*' +
        (categoryName || '')[k] +
        '*' +
        '\n ' +
        (categoryDesc || '')[k] +
        '\n' +
        '\n';
    }
    if (user) {
      agent.add(
        `Welcome *${user.firstName}*, good to have you back ${emoji.get('grin')} \n` +
          '\n' +
          `These are our *Product Categories*: \n` +
          '\n' +
          `${categoryEntry}` +
          '_To make a selection reply with the number *ONLY* of your option._ \n' +
          '\n' +
          `*EXAMPLE:* Reply with *2* to Select ${categoryName[1]} \n` +
          '\n' +
          `Reply *"Cancel"* - to go ${emoji.get('leftwards_arrow_with_hook')} to the *Main Menu*`
      );
      // agent.context.delete('orderphone-followup');
      agent.context.delete('phonenumber');
      agent.context.delete('name');
    } else {
      agent.add(`I dont think I remember you...${emoji.get('neutral_face')} What\'s your name?`);
    }
  } catch (err) {
    agent.add(
      'There is an *Error* from our *Servers*, please try again shortly... \n' +
        'Send *"hi"* to return'
    );
    agent.context.delete('orderphone-followup');
    agent.context.delete('phonenumber');
    agent.context.delete('name');
  }
};

export default checkLogin;
