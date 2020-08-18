import * as express from 'express';
import { Request, Response, NextFunction } from 'express';

class HomeController {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, this.home);
  }

  private home = (req: Request, res: Response) => {
    res.send('we are live');
  };
}

export default HomeController;
