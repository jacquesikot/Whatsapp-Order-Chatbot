import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import models, { connectDb } from '../models';
import NotFoundException from '../exceptions/NotFoundException';

class CartController {
  public path = '/cart';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addCart);
    this.router.get(this.path, this.showCart);
    this.router.get(`${this.path}/:id`, this.getCart);
    this.router.delete(`${this.path}/:id`, this.deleteCart);
  }

  private addCart = async (req: Request, res: Response) => {
    // content
  };

  private showCart = async (req: Request, res: Response) => {
    connectDb();
    const city = await models.CategoryModel.find();
    return res.send(city);
  };

  private getCart = (req: Request, res: Response, next: NextFunction) => {
    // connectDb().then(async () => {
    //   const vendor = await models.Vendor.findById(req.params.userId);
    //   if (vendor) {
    //     res.send(vendor);
    //   } else {
    //     next(new VendorNotFoundException(req.params.userId));
    //   }
    // });
  };

  private deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    connectDb();
    const cart = await models.CartModel.findById(req.params.id);

    if (cart) {
      await cart.remove();
      res.send(cart);
    } else {
      next(new NotFoundException(req.params.id));
    }
  };
}

export default CartController;

// To do

// impliment Vendor interface
// clean up code, putting the right variables
// clean up connectDb()
