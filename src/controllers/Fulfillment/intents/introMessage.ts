import * as emoji from 'node-emoji';
import greeting from '../../../helpers/greeting';

// information_source

const introMessage = (agent: any) => {
  agent.add(
    `*${greeting()}, Welcome to Foodbox ${emoji.get('smiley')}* \n` +
      '\n' +
      '*WHAT WOULD YOU LIKE TO DO?* \n' +
      '\n' +
      `*1.* Place an Order ${emoji.get('postbox')} \n` +
      `*2.* Check Order Status ${emoji.get('white_check_mark')}  \n` +
      `*3.* Contact Customer Support ${emoji.get('calling')} \n` +
      `*4.* Ask Questions About my Service ${emoji.get('speech_balloon')} \n` +
      '\n' +
      '_To make a selection reply with the number *ONLY* of your option._ \n' +
      '\n' +
      '*EXAMPLE:* Reply with *2* to Check order status \n' +
      '\n' +
      'For more about us visit: https://Foodbox.ng/ \n' +
      '*Happy Shopping!!*'
  );
};

export default introMessage;
