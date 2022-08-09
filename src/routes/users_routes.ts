import express from 'express';
import {
  index,
  show,
  authenticate,
  create,
  destroy,
  update,
} from '../handlers/users_handler';
import verifyAuthToken from '../middlewares/authorization_middleware';

const users_routes = async (api: express.Router) => {
  api.route('/users').get(verifyAuthToken, index);
  api.route('/user/:id').get(verifyAuthToken, show);
  api.route('/user/authenticate').post(authenticate);
  api.route('/user').post(create);
  api.route('/user/:id').delete(verifyAuthToken, destroy);
  api.route('/user/:id').put(verifyAuthToken, update);
};

export default users_routes;
