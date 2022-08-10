import supertest from 'supertest';
import client from '../../database';
import app from '../../server';
import { ProductModel } from '../../models/products_model';
import { UserModel } from '../../models/users_model';
import { Product } from '../../types/product_type';
import { User } from '../../types/user_type';
import { OrderModel } from '../../models/orders_model';
import { Order } from '../../types/order_type';

const request = supertest(app);

const productModel = new ProductModel();
const userModel = new UserModel();
const orderModle = new OrderModel();

let tok = '';

describe('Test orders endpoints', () => {
  const order_1: Order = {
    id: 1,
    status: 'active',
    user_id: '1',
  };
  const order_2: Order = {
    id: 2,
    status: 'complete',
    user_id: '1',
  };

  const product_1: Product = {
    id: 1,
    name: 'Apple',
    price: 10,
    category: 'fruit',
  };

  const user_1: User = {
    id: 1,
    first_name: 'Ali',
    last_name: 'Klay',
    password: 'password',
  };

  beforeAll(async () => {
    await userModel.create(user_1);
    await productModel.create(product_1);
    await orderModle.create(order_1);
    await orderModle.create(order_2);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql_products = `DELETE FROM products`;
    const sql_orders = `DELETE FROM orders`;
    const sql_users = `DELETE FROM users`;
    const sql_order_products = `DELETE FROM order_products`;
    const sql_alter_products = `ALTER SEQUENCE products_id_seq RESTART WITH 1`;
    const sql_alter_users = `ALTER SEQUENCE users_id_seq RESTART WITH 1`;
    const sql_alter_orders = `ALTER SEQUENCE orders_id_seq RESTART WITH 1`;
    const sql_alter_order_products = `ALTER SEQUENCE order_products_id_seq RESTART WITH 1`;
    await connection
      .query(sql_order_products)
      .then(() => connection.query(sql_alter_order_products))
      .then(() => connection.query(sql_products))
      .then(() => connection.query(sql_alter_products))
      .then(() => connection.query(sql_orders))
      .then(() => connection.query(sql_alter_orders))
      .then(() => connection.query(sql_users))
      .then(() => connection.query(sql_alter_users));
    connection.release();
  });
  it('Test Get /api/user/authenticate endpoint (set up for the product creation)', async () => {
    const response = await request
      .post('/api/user/authenticate')
      .send({ first_name: 'Ali', password: 'password' });
    const { token } = response.body;
    tok = token;
    expect(response.status).toBe(200);
  });

  it('Test Get /api/orders endpoint (INDEX)', async () => {
    const response = await request.get('/api/orders').set('Authorization', `Bearer ${tok}`);
    const orders = response.body;
    expect(response.status).toBe(200);
    expect(orders).toEqual([order_1, order_2]);
  });

  it('Test Get /api/order/:id endpoint (SHOW)', async () => {
    const response = await request.get('/api/order/1').set('Authorization', `Bearer ${tok}`);
    const order = response.body;
    expect(response.status).toBe(200);
    expect(order).toEqual(order_1);
  });

  it('Test POST /api/order (CREATE)', async () => {
    const response = await request
      .post('/api/order')
      .set('Authorization', `Bearer ${tok}`)
      .send({ status: 'complete', user_id: '1' });
    const order = response.body;
    expect(response.status).toBe(200);
    expect(order).toEqual({
      id: 3,
      status: 'complete',
      user_id: '1',
    });
  });

  it('Test PUT /api/order/:id (UPDATE)', async () => {
    const response = await request
      .put('/api/order/3')
      .set('Authorization', `Bearer ${tok}`)
      .send({ status: 'complete', user_id: '1' });
    const updatedOrder = response.body;
    expect(response.status).toBe(200);
    expect(updatedOrder).toEqual({
      id: 3,
      status: 'complete',
      user_id: '1',
    });
  });

  it('Test DELETE /api/ order/:id (DELETE)', async () => {
    const response = await request
      .delete('/api/order/2')
      .set('Authorization', `Bearer ${tok}`);
    const deletedProduct = response.body;
    expect(response.status).toBe(200);
    expect(deletedProduct).toEqual(order_2);
  });

  it('Test POST /api/order/id:/prodct', async () => {
    const response = await request
      .post('/api/order/1/product')
      .set('Authorization', `Bearer ${tok}`)
      .send({ quantity: 3, product_id: '1' });
    const { quantity, product_id } = response.body;
    expect(response.status).toBe(200);
    expect(quantity).toEqual(3);
    expect(product_id).toEqual('1');
  });

  it('Test GET /api/current_order/:id (to get the active order for a specific user)', async () => {
    const response = await request
      .get('/api/current_order/1')
      .set('Authorization', `Bearer ${tok}`);
    const body = response.body;
    expect(response.status).toBe(200);
    expect(body).toEqual({
      user_id: `${user_1.id}`,
      order_id: order_1.id,
      order_status: order_1.status,
      products: [{ product_id: `${product_1.id}`, quantity: 3 }],
    });
  });
});
