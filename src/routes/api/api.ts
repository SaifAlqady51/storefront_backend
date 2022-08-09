import express from 'express';
import dashboard_routes from '../dashboard_routes';
import orders_routes from '../orders_routes';
import products_routes from '../products_routes';
import users_routes from '../users_routes';

const api = express.Router();

dashboard_routes(api);
orders_routes(api);
products_routes(api);
users_routes(api);

export default api;
