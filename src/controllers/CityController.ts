import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import models, { connectDb } from '../models';
import NotFoundException from '../exceptions/NotFoundException';

class CityController {
  public path = '/city';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addCity);
    this.router.get(this.path, this.showCity);
    this.router.get(`${this.path}/:id`, this.getCity);
    this.router.delete(`${this.path}/:id`, this.deleteCity);
  }

  private addCity = async (req: Request, res: Response) => {
    try {
      connectDb();
      const city = await new models.CityModel({
        name: req.body.name,
      });
      await city.save();
      res.send(city);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  private showCity = async (req: Request, res: Response) => {
    connectDb();
    const city = await models.CityModel.find();
    return res.send(city);
  };

  private getCity = (req: Request, res: Response, next: NextFunction) => {
    // connectDb().then(async () => {
    //   const vendor = await models.Vendor.findById(req.params.userId);
    //   if (vendor) {
    //     res.send(vendor);
    //   } else {
    //     next(new VendorNotFoundException(req.params.userId));
    //   }
    // });
  };

  private deleteCity = async (req: Request, res: Response, next: NextFunction) => {
    // hi
  };
}

export default CityController;

// To do

// impliment Vendor interface
// clean up code, putting the right variables
// clean up connectDb()
