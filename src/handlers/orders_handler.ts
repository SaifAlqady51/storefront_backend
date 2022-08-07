import  { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../models/orders_model';

const orderModel = new OrderModel();

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allOrders = await orderModel.index();
    res.json(allOrders);
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.show(req.params.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const {status,user_id} = req.body
    if (
      status === undefined ||
      user_id === undefined 
    ) {
      res.json({
        message:
          'Please make sure to fill all the inputes {fistName,lastName,password}',
      });

    }else{
      const createdOrder = await orderModel.create(req.body);
      res.json(createdOrder);
    }

  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productAdded = await orderModel.addProduct(
      parseInt(req.body.quantity, 10),
      req.body.order_id,
      req.body.product_id
    );
    res.json(productAdded);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req:Request,res:Response,next:NextFunction) => {
  try{
    const deletedOrder = await orderModel.destroy(req.params.id);
    res.json(deletedOrder) 
  }catch(error){
    next(error)
  }
}

export const update = async (req:Request,res:Response,next:NextFunction) => {
  try{
    const updatedOrder = await orderModel.update(req.params.id,req.body.status,req.body.user_id);
    res.json(updatedOrder) 
  }catch(error){
    next(error)
  }
}


