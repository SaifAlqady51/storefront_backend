import  { NextFunction, Request, Response } from 'express';
import { ProductModel } from '../models/products_model';

const product = new ProductModel();

export const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await product.index();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singleProduct = await product.show(req.params.id);
    res.json(singleProduct);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name,price,category} = req.body
    if (
      name === undefined ||
      price === undefined ||
      category === undefined
    ) {
      res.json({
        message:
          'Please make sure to fill all the inputes {name,price,category}',
      });

    }else{
      const singleProduct = await product.create(req.body);
      res.json(singleProduct);
    }

  } catch (error) {
    next(error);
  }
};

export const destroy = async (req:Request,res:Response,next:NextFunction) => {
  try{
    const deletedProduct = await product.destroy(req.params.id);
    res.json(deletedProduct)
  }catch(error){
    next(error)
  }
}

export const update = async (req:Request,res:Response,next:NextFunction) => {
  try{
    const updatedProdct = await product.update(req.params.id, req.body.name,parseInt(req.body.price,10),req.body.category)
    res.json(updatedProdct)
  }catch(error){
    next(error)
  }
}

export const getProudctsByCategory = async (req:Request, res:Response, next:NextFunction) =>{
  try{
    const categorizedProducts = await product.getProudctsByCategory(req.params.category);
    if(categorizedProducts === undefined){
      res.json({
        message:"this category does not exist"
      })
    }
    else{
      res.send(categorizedProducts)
    }
  }catch(error){
    next(error)
  }
}

