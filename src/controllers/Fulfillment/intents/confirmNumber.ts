const confirmNumber = (agent: any) => {
  const userPhoneNumber = agent.context.get('phonenumber').parameters.userphonenumber;

  agent.add(`Thanks, just so i'm sure, this is your phone number *${userPhoneNumber}*? \n`);
};

export default confirmNumber;
