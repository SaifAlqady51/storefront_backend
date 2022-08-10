import { Request, Response } from 'express';

import { DashboardQueries, FullOrder } from '../service/dashboard';

const dashboard = new DashboardQueries();

const loop = (lst: FullOrder[]) => {
  const arr = [];
  for (let i = 0; i < lst.length; i++) {
    arr.push({ product_id: lst[i].product_id, quantity: lst[i].quantity });
  }
  return arr;
};

export const currentOrder = async (req: Request, res: Response) => {
  try{
    const orders = (await dashboard.currentOrder(req.params.id)) as FullOrder[];
    const productList = loop(orders);
  
    res.json({
      user_id: req.params.id,
      order_id: orders[0].id,
      order_status: orders[0].status,
      products: productList,
    });
  }catch(error){
    throw new Error(`cannot get the current order: ${error}`)
  }


};
