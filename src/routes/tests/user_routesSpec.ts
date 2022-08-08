import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);

describe('Test orders endpoints', () => {
  it('Test Get /api/users endpoint', async () => {
    const response = await request.get('/api/users');
    expect(response.status).toBe(401);
  });
  it('Test Get /api/user/:id endpoint', async () => {
    const response = await request.get('/api/user/1');
    expect(response.status).toBe(401);
  });
  it('Test POST /api/user endpoint', async () => {
    const response = await request.post('/api/user');
    expect(response.status).toBe(401);
  });
  it('Test delete /api/user/:id endpoint', async () => {
    const response = await request.delete('/api/user/1');
    expect(response.status).toBe(401);
  });
  it('Test put /api/user/:id endpoint', async () => {
    const response = await request.put('/api/user/1');
    expect(response.status).toBe(401);
  });
  it('Test put /api/user/:id endpoint', async () => {
    const response = await request.put('/api/user/1');
    expect(response.status).toBe(401);
  });
  


});