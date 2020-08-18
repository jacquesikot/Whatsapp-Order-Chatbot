import * as mongoose from 'mongoose';

let database: mongoose.Connection;
const connectDb = () => {
  const uri = 'mongodb://localhost:27017/stbot';

  if (database) {
    return;
  }
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = mongoose.connection;
  database.once('open', async () => {
    // tslint:disable-next-line: no-console
    console.log('Connected to DB...');
  });
  database.on('error', () => {
    // tslint:disable-next-line: no-console
    console.log('Error connecting to DB!');
  });
};
const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};

export { disconnect, connectDb };
