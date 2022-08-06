import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ProductModel } from '../models/products_model';
import { TOKEN_SECRET } from '../info';
import verifyAuthToken from '../middlewares/authorization_middleware';

const product = new ProductModel();

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await product.index();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singleProduct = await product.show(req.params.id);
    res.json(singleProduct);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationheader = req.headers.authorization;
    const token = authorizationheader?.split(' ')[1];
    jwt.verify(token as string, TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json('invalid token' + error);
    return;
  }

  try {
    const singleProduct = await product.create(req.body);
    res.json(singleProduct);
  } catch (error) {
    next(error);
  }
};

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/product/:id', show);
  app.post('/product',verifyAuthToken, create);
};

export default products_routes;
