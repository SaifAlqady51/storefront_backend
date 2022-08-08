import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);

describe('Test products endpoints', () => {
  it('Test Get /api/products endpoint', async () => {
    const response = await request.get('/api/products');
    expect(response.status).toBe(200);
  });
  it('Test Get /api/product/:id endpoint', async () => {
    const response = await request.get('/api/product/1');
    expect(response.status).toBe(200);
  });
  it('Test POST /api/product endpoint', async () => {
    const response = await request.post('/api/product');
    expect(response.status).toBe(401);
  });
  it('Test delete /api/product/:id endpoint', async () => {
    const response = await request.delete('/api/product/1');
    expect(response.status).toBe(200);
  });
  it('Test put /api/product/:id endpoint', async () => {
    const response = await request.put('/api/product/1');
    expect(response.status).toBe(200);
  });
  it('Test get /api/products/category/:category endpoint', async () => {
    const response = await request.get('/api/products/category/category');
    expect(response.status).toBe(200);
  });

});