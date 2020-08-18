import 'dotenv/config';
const messagebird = require('messagebird')('yLXu5KCYyrWk0zH36714GAkex');

export const sendMessage = (to: string, from: string, body: string) => {
  return new Promise(() => {
    const params = {
      to,
      from,
      type: 'text',
      content: {
        text: body,
      },
    };
    messagebird.conversations.send(params, (err: Error, response: any) => {
      if (err) {
        // tslint:disable-next-line: no-console
        return console.log(err);
      }
      // tslint:disable-next-line: no-console
      console.log(response);
    });
  });
};
