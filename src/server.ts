import express, { Request, Response } from 'express';
import api from './routes/api/api';
import { POSTGRES_PORT } from './info';

const app: express.Application = express();

const port = 3000 ;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Main page');
});

app.use('/api', api);

app.listen(port, () => {
  console.log(`connecting to port ${port}`);
});

export default app;
