import supertest from 'supertest';
import client from '../../database';
import app from '../../server';
import { UserModel } from '../../models/users_model';
import { User } from '../../types/user_type';
const request = supertest(app);

const userModel = new UserModel();
let tok = '';
describe('Test users endpoints', () => {
  const user_1: User = {
    id: 1,
    first_name: 'Ali',
    last_name: 'Klay',
    password: 'password',
  };
  const user_2: User = {
    id: 2,
    first_name: 'Mike',
    last_name: 'Yyson',
    password: 'boxing',
  };

  beforeAll(async () => {
    await userModel.create(user_1);
    await userModel.create(user_2);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql = `DELETE FROM users`;
    const sql_alter = `ALTER SEQUENCE users_id_seq RESTART WITH 1`;
    await connection.query(sql).then(() => connection.query(sql_alter));
    connection.release();
  });

  it('Test Get /api/user/authenticate endpoint', async () => {
    const response = await request
      .post('/api/user/authenticate')
      .send({ first_name: 'Ali', password: 'password' });
    const { token } = response.body;
    tok = token;
    expect(response.status).toBe(200);
  });

  it('Test Get /api/users endpoint (INDEX)', async () => {
    const response = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${tok}`);
    const user = response.body;
    expect(response.status).toBe(200);
    expect(user).toEqual([
      {
        id: user_1.id,
        first_name: user_1.first_name,
        last_name: user_1.last_name,
      },
      {
        id: user_2.id,
        first_name: user_2.first_name,
        last_name: user_2.last_name,
      },
    ]);
  });

  it('Test Get /api/user/:id endpoint (SHOW)', async () => {
    const response = await request
      .get('/api/user/1')
      .set('Authorization', `Bearer ${tok}`);
    const user = response.body;
    expect(response.status).toBe(200);
    expect(user).toEqual({
      id: user_1.id,
      first_name: user_1.first_name,
      last_name: user_1.last_name,
    });
  });

  it('Test POST /api/user endpoint (CREATE)', async () => {
    const response = await request
      .post('/api/user')
      .set('Authorization', `Bearer ${tok}`)
      .send({ first_name: 'Harry', last_name: 'Kane', password: 'tot' });
    const { id, first_name, last_name } = response.body.user;
    expect(response.status).toBe(200);

    expect(id).toEqual(3);
    expect(first_name).toEqual('Harry');
    expect(last_name).toEqual('Kane');
  });

  it('Test PUT /api/user/:id (UPDATE)', async () => {
    const response = await request
      .put('/api/user/3')
      .set('Authorization', `Bearer ${tok}`)
      .send({ id: 3, first_name: 'Harry', last_name: 'Potter' });
    const updatedUser = response.body;
    expect(response.status).toBe(200);
    expect(updatedUser).toEqual({
      id: 3,
      first_name: 'Harry',
      last_name: 'Potter',
    });
  });

  it('Test DELETE /api/user/:id (DELETE)', async () => {
    const response = await request
      .delete('/api/user/3')
      .set('Authorization', `Bearer ${tok}`);
    const deleteUser = response.body;
    expect(response.status).toBe(200);
    expect(deleteUser).toEqual({
      id: 3,
      first_name: 'Harry',
      last_name: 'Potter',
    });
  });
});
