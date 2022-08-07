import express from "express";
import {index,show,create,addProduct,destroy,update} from '../handlers/orders_handler'

const orders_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/order/:id', show);
    app.post('/order', create);
    app.post('/orders/:id/products', addProduct);
    app.delete('/order/:id',destroy);
    app.put('/order/:id',update)
  };
  
  export default orders_routes;
  