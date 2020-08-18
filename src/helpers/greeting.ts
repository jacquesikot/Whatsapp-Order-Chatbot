import * as emoji from 'node-emoji';

const greeting = () => {
  const myDate = new Date();
  const hrs = myDate.getHours();

  let greet;

  if (hrs < 12) return (greet = `Good Morning`);
  else if (hrs >= 12 && hrs <= 17) return (greet = `Good Afternoon`);
  else if (hrs >= 17 && hrs <= 24) return (greet = `Good Evening`);
};

export default greeting;
