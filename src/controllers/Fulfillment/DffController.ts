import * as express from 'express';
import { Request, Response } from 'express';
import * as dff from 'dialogflow-fulfillment';
import capitalize from '../../helpers/capitalize';
import introMessage from './intents/introMessage';
import confirmNumber from './intents/confirmNumber';
import checkLogin from './intents/checkLogin';
import addUser from './intents/addUser';
import showProduct from './intents/showProduct';
import returnCategory from './intents/returnCategory';
import qty1 from './intents/qty1';
import addToCart1 from './intents/addToCart1';
import showProduct2 from './intents/showProduct2';
import returnCategory2 from './intents/returnCategory2';
import qty2 from './intents/qty2';
import addToCart2 from './intents/addToCart2';
import showProduct3 from './intents/showProduct3';
import returnCategory3 from './intents/returnCategory3';
import qty3 from './intents/qty3';
import addToCart3 from './intents/addToCart3';
import showProduct4 from './intents/showProduct4';
import returnCategory4 from './intents/returnCategory4';
import qty4 from './intents/qty4';
import addToCart4 from './intents/addToCart4';
import showProduct5 from './intents/showProduct5';
import returnCategory5 from './intents/returnCategory5';
import qty5 from './intents/qty5';
import addToCart5 from './intents/addToCart5';
import checkAddress from './intents/checkAddress';
import showCity from './intents/showCity';
import getAddress from './intents/getAddress';
import returnSelectCity from './intents/returnSelectCity';
import finishOrder1 from './intents/finishOrder1';
import finishOrder2 from './intents/finishOrder2';
import finishOrder3 from './intents/finishOrder3';

class DffController {
  public path = '/api/dff';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.postFulfill);
  }

  private postFulfill = (req: Request, res: Response) => {
    const masterAgent = new dff.WebhookClient({
      request: req,
      response: res,
    });

    // orderPhoneNo
    function retryNumber(agent: any) {
      agent.add('Okay, going back...');
      return agent.setFollowupEvent('change_phone');
    }

    // name
    function confirmName(agent: any) {
      const nameContent = agent.context.get('name').parameters.firstname;
      const name = capitalize(nameContent).toString();

      agent.add(`Just so i'm sure, its ${name} right?`);
    }

    // nameNo
    function retryName(agent: any) {
      agent.add('Going back to set name');
      return agent.setFollowupEvent('set_name');
    }

    // nameYes

    function getEmail(agent: any) {
      const name = capitalize(agent.context.get('name').parameters.firstname).toString();
      agent.add(`Alright ${name}, what is your Email?`);
    }

    // email
    function confirmEmail(agent: any) {
      const email = agent.context.get('email').parameters.email.toLowerCase().toString();
      agent.add(`*${email}*, is this Email correct?`);
    }
    // emailNo
    function retryEmail(agent: any) {
      agent.add('Returning to set Email');
      return agent.setFollowupEvent('set_email');
    }

    // Finish - move to Dialogflow
    function deliveryMode(agent: any) {
      agent.add('What delivery mode works for you? \n' + '\n' + '1. Delivery \n' + '2. Pickup');
    }

    // Confirm Address
    async function confirmAddress(agent: any) {
      const data = agent.context.get('orderphone-followup').parameters;
      const address = data.address;
      agent.add(`${address}, is this your address?`);
    }

    // ConfirmAddress - no
    function retryAddress(agent: any) {
      agent.add('Going back to set address');
      return agent.setFollowupEvent('set_address');
    }

    // Cancel
    function cancel(agent: any) {
      agent.add('Going back...');
      agent.setFollowupEvent('Welcome');
      agent.context.delete('');
    }

    const intentMap = new Map();
    intentMap.set('DefaultWelcomeIntent', introMessage);
    intentMap.set('orderPhone', confirmNumber);
    intentMap.set('orderPhone - yes', checkLogin);
    intentMap.set('orderPhone - no', retryNumber);
    intentMap.set('name', confirmName);
    intentMap.set('name - no', retryName);
    intentMap.set('name - yes', getEmail);
    intentMap.set('email', confirmEmail);
    intentMap.set('email - no', retryEmail);
    intentMap.set('email - yes', addUser);
    intentMap.set('menu', showProduct);
    intentMap.set('menu99', returnCategory);
    intentMap.set('qty1', qty1);
    intentMap.set('cart1', addToCart1);
    intentMap.set('menu2', showProduct2);
    intentMap.set('menu2-99', returnCategory2);
    intentMap.set('qty2', qty2);
    intentMap.set('cart2', addToCart2);
    intentMap.set('menu3', showProduct3);
    intentMap.set('menu3-99', returnCategory3);
    intentMap.set('qty3', qty3);
    intentMap.set('cart3', addToCart3);
    intentMap.set('menu4', showProduct4);
    intentMap.set('menu4-99', returnCategory4);
    intentMap.set('qty4', qty4);
    intentMap.set('cart4', addToCart4);
    intentMap.set('menu5', showProduct5);
    intentMap.set('menu5-99', returnCategory5);
    intentMap.set('qty5', qty5);
    intentMap.set('cart5', addToCart5);
    intentMap.set('finish', deliveryMode);
    intentMap.set('checkAddress', checkAddress);
    intentMap.set('city', showCity);
    intentMap.set('address', getAddress);
    intentMap.set('addressBack', returnSelectCity);
    intentMap.set('confirmAddress', confirmAddress);
    intentMap.set('confirmAddress - no', retryAddress);
    intentMap.set('confirmAddress - yes', finishOrder1);
    intentMap.set('end', finishOrder2);
    intentMap.set('end2', finishOrder3);
    intentMap.set('cancel', cancel);

    masterAgent.handleRequest(intentMap);
  };
}

export default DffController;
