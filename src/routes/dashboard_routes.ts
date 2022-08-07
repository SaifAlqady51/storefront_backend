import express from "express";
import { productsInOrders } from "../handlers/dashborad_handler";


const dashboard_routes = (app: express.Application) => {
    app.get('/products_in_order/:id', productsInOrders);
};
  
  export default dashboard_routes;
  