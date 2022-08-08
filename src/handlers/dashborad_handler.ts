import { Request, Response } from 'express';

import { DashboardQueries } from '../service/dashboard';



const dashboard = new DashboardQueries();

export const productsInOrders = async (req: Request, res: Response) => {
  const products = await dashboard.productsInOrders(req.params.id);
  res.json({
    order_id: req.params.id,
    order: products
  });
};


