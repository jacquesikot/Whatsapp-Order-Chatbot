import 'dotenv/config';
import App from './Server';
import BotController from './controllers/BotController';
import DffController from './controllers/Fulfillment/DffController';
import HomeController from './controllers/HomeController';
import UserController from './controllers/UserController';
import CategoryController from './controllers/CategoryController';
import ProductController from './controllers/ProductController';
import CityController from './controllers/CityController';

const PORT: any = process.env.PORT;
const app = new App(
  [
    new BotController(),
    new DffController(),
    new HomeController(),
    new UserController(),
    new CategoryController(),
    new ProductController(),
    new CityController(),
  ],
  PORT
);

app.listen();
