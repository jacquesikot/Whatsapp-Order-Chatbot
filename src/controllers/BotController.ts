import * as express from 'express';
import { Request, Response } from 'express';
import { runQuery } from '../utils/dialogflow';
import { sendMessage } from '../utils/messagebird';

class BotController {
  public path = '/webhook';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.postMessage);
  }

  private postMessage = (request: Request, response: Response) => {
    const data = request.body;
    const { from } = data.message;
    const to = data.message.channelId;
    const body = data.message.content.text;

    runQuery(body, from)
      .then((result: any) => {
        sendMessage(from, to, result.fulfillmentText)
          .then((res) => {
            // tslint:disable-next-line: no-console
            console.log(res);
          })
          .catch((error) => {
            // tslint:disable-next-line: no-console
            console.log(error);
          });
      })
      .catch((error) => {
        // tslint:disable-next-line: no-console
        console.log(error);
      });
    return response.status(200).send('SUCCESS');
  };
}

export default BotController;
