import express, { Request, Response, NextFunction } from "express";
import { OrderModel } from "../models/orders_model";

const orderModel = new OrderModel()


const index = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const allOrders = await orderModel.index();
        res.json(allOrders)
    }
    catch(error){
        next(error)
    }
}


const show = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const order = await orderModel.show(req.params.id);
        res.json(order)
    }
    catch(error){
        next(error)
    }
}


const create = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const createdOrder = await orderModel.create(req.body);
        res.json(createdOrder)
    }
    catch(error){
        next(error)
    }
}


const addProduct = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const productAdded = await orderModel.addProduct(parseInt(req.body.quantity,10), req.body.order_id,req.body.product_id);
        res.json(productAdded)
    }
    catch(error){
        next(error)
    }
}


const order_routes  = (app:express.Application) =>{
    app.get('/orders',index);
    app.get('/order/:id',show);
    app.post('/order',create)
    app.post('/orders/:id/products', addProduct)
}

export default order_routes