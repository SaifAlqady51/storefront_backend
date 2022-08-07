import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import products_routes from './routes/products_routes';
import users_routes from './routes/users_routes';
import orders_routes from './routes/orders_routes';
import dashboard_routes from './routes/dashboard_routes'

dotenv.config();
const app: express.Application = express();

const port = 3000;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Main page');
});

products_routes(app);
users_routes(app);
orders_routes(app);
dashboard_routes(app);

app.listen(port, () => {
  console.log(`connecting to port ${port}`);
});

export default app;
