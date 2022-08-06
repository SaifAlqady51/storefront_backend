import express, { Request, Response } from 'express'

import { DashboardQueries } from '../service/dashboard'

const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_order/:id', productsInOrders)
}

const dashboard = new DashboardQueries()

const productsInOrders = async (req: Request, res: Response) => {
  const products = await dashboard.productsInOrders(req.params.id)
  res.json({
    id:req.params.id,
    order:products
  })
}

export default dashboardRoutes