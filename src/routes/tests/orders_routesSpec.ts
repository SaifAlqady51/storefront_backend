import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);

describe('Test orders endpoints', () => {
  it('Test Get /api/orders endpoint', async () => {
    const response = await request.get('/api/orders');
    expect(response.status).toBe(200);
  });
  it('Test Get /api/order/:id endpoint', async () => {
    const response = await request.get('/api/order/1');
    expect(response.status).toBe(200);
  });
  it('Test POST /api/order endpoint', async () => {
    const response = await request.post('/api/order');
    expect(response.status).toBe(401);
  });
  it('Test delete /api/order/:id endpoint', async () => {
    const response = await request.delete('/api/order/1');
    expect(response.status).toBe(200);
  });
  it('Test put /api/order/:id endpoint', async () => {
    const response = await request.put('/api/order/1');
    expect(response.status).toBe(200);
  });


});