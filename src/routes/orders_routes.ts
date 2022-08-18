import express from 'express';
import {
  index,
  show,
  create,
  addProduct,
  destroy,
  update,
} from '../handlers/orders_handler';
import verifyAuthToken from '../middlewares/authorization_middleware';

const orders_routes = (app: express.Router) => {
  app.route('/orders').get(verifyAuthToken, index);
  app.route('/order/:id').get(verifyAuthToken, show);
  app.route('/order').post(verifyAuthToken, create);
  app.route('/order/:id/product').post(verifyAuthToken, addProduct);
  app.route('/order/:id').delete(verifyAuthToken, destroy);
  app.route('/order/:id').put(verifyAuthToken, update);
};

export default orders_routes;
