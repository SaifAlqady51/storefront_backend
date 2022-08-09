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
  app.route('/orders').get(index);
  app.route('/order/:id').get(show);
  app.route('/order').post(verifyAuthToken, create);
  app.route('/order/:id/product').post(addProduct);
  app.route('/order/:id').delete(destroy);
  app.route('/order/:id').put(update);
};

export default orders_routes;
