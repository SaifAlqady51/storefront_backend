import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import product_routes from './handlers/products_handler';
import user_routes from './handlers/users_handler';
import order_routes from './handlers/orders_handler'
import dashboardRoutes from './handlers/dashborad_handler'

dotenv.config();
const app: express.Application = express();

const port = 3000;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Main page');
});

product_routes(app);
user_routes(app);
order_routes(app);
dashboardRoutes(app)

app.listen(port, () => {
  console.log(`connecting to port ${port}`);
});

export default app;
