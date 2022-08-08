import express from 'express';
import verifyAuthToken from '../middlewares/authorization_middleware';
import {index,show,create,destroy,update,getProudctsByCategory} from '../handlers/products_handler'



const products_routes = (api: express.Router) => {
  api.route('/products').get(index);
  api.route('/product/:id').get(show);
  api.route('/product').post(verifyAuthToken, create);
  api.route('/product/:id').delete(destroy)
  api.route('/product/:id').put(update)
  api.route('/products/category/:category').get(getProudctsByCategory)
};
  
  export default products_routes;
  