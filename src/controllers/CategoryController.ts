import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import models, { connectDb } from '../models';
import NotFoundException from '../exceptions/NotFoundException';

class CategoryController {
  public path = '/category';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addCategory);
    this.router.get(this.path, this.showCategory);
    this.router.get(`${this.path}/:id`, this.getCategory);
    this.router.delete(`${this.path}/:id`, this.deleteCategory);
  }

  private addCategory = async (req: Request, res: Response) => {
    try {
      connectDb();
      const category = await new models.CategoryModel({
        name: req.body.name,
        shortDescription: req.body.shortDescription,
      });
      await category.save();
      res.send(category);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  private showCategory = async (req: Request, res: Response) => {
    connectDb();
    const category = await models.CategoryModel.find();
    return res.send(category);
  };

  private getCategory = (req: Request, res: Response, next: NextFunction) => {
    // connectDb().then(async () => {
    //   const vendor = await models.Vendor.findById(req.params.userId);
    //   if (vendor) {
    //     res.send(vendor);
    //   } else {
    //     next(new VendorNotFoundException(req.params.userId));
    //   }
    // });
  };

  private deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    // hi
  };
}

export default CategoryController;

// To do

// impliment Vendor interface
// clean up code, putting the right variables
// clean up connectDb()
