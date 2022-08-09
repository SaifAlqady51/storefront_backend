import supertest from 'supertest';
import client from '../../database';
import app from '../../server';
import { ProductModel } from '../../models/products_model';
import { UserModel } from '../../models/users_model';
import { Product } from '../../types/product_type';
import { User } from '../../types/user_type';
const request = supertest(app);

const productModel = new ProductModel();
const userModel = new UserModel();

let tok = '';

describe('Test products endpoints', () => {
  const product_1: Product = {
    id: 1,
    name: 'Apple',
    price: 10,
    category: 'fruit',
  };
  const product_2: Product = {
    id: 2,
    name: 'cucumber',
    price: 10,
    category: 'vegetables',
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
    await productModel.create(product_2);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql = `DELETE FROM products`;
    const sql_users = `DELETE FROM users`;
    const sql_alter = `ALTER SEQUENCE products_id_seq RESTART WITH 1`;
    const sql_alter_user = `ALTER SEQUENCE users_id_seq RESTART WITH 1`;
    await connection
      .query(sql)
      .then(() => connection.query(sql_alter))
      .then(() => connection.query(sql_users))
      .then(() => connection.query(sql_alter_user));
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

  it('Test Get /api/products endpoint (INDEX)', async () => {
    const response = await request.get('/api/products');
    const products = response.body;
    expect(response.status).toBe(200);
    expect(products).toEqual([product_1, product_2]);
  });

  it('Test Get /api/product/:id endpoint (SHOW)', async () => {
    const response = await request.get('/api/product/1');
    const product = response.body;
    expect(response.status).toBe(200);
    expect(product).toEqual(product_1);
  });

  it('Test POST /api/product (CREATE)', async () => {
    const response = await request
      .post('/api/product')
      .set('Authorization', `Bearer ${tok}`)
      .send({ name: 'orange', price: 12, category: 'fruit' });
    const product = response.body;
    expect(response.status).toBe(200);
    expect(product).toEqual({
      id: 3,
      name: 'orange',
      price: 12,
      category: 'fruit',
    });
  });

  it('Test PUT /api/product/:id (UPDATE)', async () => {
    const response = await request
      .put('/api/product/3')
      .set('Authorization', `Bearer ${tok}`)
      .send({ id: 3, name: 'banana', price: 15, category: 'fruit' });
    const updatedProdct = response.body;
    expect(response.status).toBe(200);
    expect(updatedProdct).toEqual({
      id: 3,
      name: 'banana',
      price: 15,
      category: 'fruit',
    });
  });

  it('Test DELETE /api/product/:id (DELETE)', async () => {
    const response = await request
      .delete('/api/product/2')
      .set('Authorization', `Bearer ${tok}`);
    const deletedProduct = response.body;
    expect(response.status).toBe(200);
    expect(deletedProduct).toEqual(product_2);
  });

  it('Test Get /api/products/category/:category ', async () => {
    const response = await request.get('/api/products/category/fruit');
    const product = response.body;
    expect(response.status).toBe(200);
    expect(product).toEqual([
      product_1,
      {
        id: 3,
        name: 'banana',
        price: 15,
        category: 'fruit',
      },
    ]);
  });
});
