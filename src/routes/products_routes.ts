import express from 'express';
import verifyAuthToken from '../middlewares/authorization_middleware';
import {index,show,create,destroy,update,getProudctsByCategory} from '../handlers/products_handler'



const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/product', verifyAuthToken, create);
    app.delete('/product/:id',destroy)
    app.put('/product/:id',update)
    app.get('/products/category/:category',getProudctsByCategory)
  };
  
  export default products_routes;
  