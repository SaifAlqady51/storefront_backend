import express from 'express';
import { currentOrder } from '../handlers/dashborad_handler';
import verifyAuthToken from '../middlewares/authorization_middleware';

const dashboard_routes = (app: express.Router) => {
  app.route('/current_order/:id').get(verifyAuthToken, currentOrder);
};

export default dashboard_routes;
