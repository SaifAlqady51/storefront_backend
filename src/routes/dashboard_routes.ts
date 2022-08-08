import express from "express";
import { productsInOrders } from "../handlers/dashborad_handler";


const dashboard_routes = (app: express.Router) => {
    app.route('/products_in_order/:id').get(productsInOrders);
};
  
  export default dashboard_routes;
  