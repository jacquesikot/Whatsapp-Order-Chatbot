import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import models, { connectDb } from '../models';
// import VendorNotFoundException from '../exceptions/VendorNotFoundException';

class UserController {
  public path = '/user';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addUser);
    this.router.get(this.path, this.showUsers);
    this.router.get(`${this.path}/:userId`, this.getUser);
    this.router.delete(`${this.path}/:userId`, this.deleteUser);
  }

  private addUser = async (req: Request, res: Response) => {
    connectDb();
    const user = await new models.UserModel({
      phoneNumber: req.body.phoneNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: [
        {
          houseNo: req.body.address.houseNo,
          streetName: req.body.address.streetName,
          landmark: req.body.address.landmark,
          city: req.body.address.city,
        },
      ],
    });
    await user.save();
    res.send(user);
  };

  private showUsers = (req: Request, res: Response) => {
    // connectDb().then(async () => {
    //   const vendors = await models.Vendor.find();
    //   return res.send(vendors);
    // });
  };

  private getUser = (req: Request, res: Response, next: NextFunction) => {
    // connectDb().then(async () => {
    //   const vendor = await models.Vendor.findById(req.params.userId);
    //   if (vendor) {
    //     res.send(vendor);
    //   } else {
    //     next(new VendorNotFoundException(req.params.userId));
    //   }
    // });
  };

  private deleteUser = (req: Request, res: Response, next: NextFunction) => {
    // connectDb().then(async () => {
    //   const vendor = await models.Vendor.findById(req.params.vendorId);
    //   if (vendor) {
    //     await vendor.remove();
    //     res.send(200);
    //   } else {
    //     next(new VendorNotFoundException(req.params.vendorId));
    //   }
    // });
  };
}

export default UserController;

// To do

// impliment Vendor interface
// clean up code, putting the right variables
// clean up connectDb()
