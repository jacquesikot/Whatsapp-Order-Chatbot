import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import models, { connectDb } from '../models';
// import VendorNotFoundException from '../exceptions/VendorNotFoundException';

class ProductController {
  public path = '/product';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addProduct);
    this.router.get(this.path, this.showProduct);
    this.router.get(`${this.path}/:id`, this.getProduct);
    this.router.delete(`${this.path}/:id`, this.deleteProduct);
  }

  private addProduct = async (req: Request, res: Response) => {
    try {
      connectDb();
      const product = await new models.ProductModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
      });
      await product.save();
      res.send(product);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  private showProduct = (req: Request, res: Response) => {
    // connectDb().then(async () => {
    //   const vendors = await models.Vendor.find();
    //   return res.send(vendors);
    // });
  };

  private getProduct = (req: Request, res: Response, next: NextFunction) => {
    // connectDb().then(async () => {
    //   const vendor = await models.Vendor.findById(req.params.userId);
    //   if (vendor) {
    //     res.send(vendor);
    //   } else {
    //     next(new VendorNotFoundException(req.params.userId));
    //   }
    // });
  };

  private deleteProduct = (req: Request, res: Response, next: NextFunction) => {
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

export default ProductController;

// To do

// impliment Vendor interface
// clean up code, putting the right variables
// clean up connectDb()
