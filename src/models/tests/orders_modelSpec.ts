import { OrderModel } from '../orders_model';
import { Order } from '../../types/order_type';
import client from '../../database';
import { User } from '../../types/user_type';
import { UserModel } from '../users_model';

const orderStore = new OrderModel();
const userModel = new UserModel();

describe('Order Model Tests', () => {
  describe('Test method existence', () => {
    it('should have index method', () => {
      expect(orderStore.index).toBeDefined();
    });
    it('should have show method', () => {
      expect(orderStore.show).toBeDefined();
    });
    it('should have create method', () => {
      expect(orderStore.create).toBeDefined();
    });
    it('should have destroy method', () => {
      expect(orderStore.destroy).toBeDefined();
    });
    it('should have update method', () => {
      expect(orderStore.update).toBeDefined();
    });
    it('should have addProduct method', () => {
      expect(orderStore.addProduct).toBeDefined();
    });
  });

  describe('Test index method', () => {
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

    const order_3: Order = {
      id: 3,
      status: 'active',
      user_id: '1',
    };

    const user_1: User = {
      id: 1,
      first_name: 'Ali',
      last_name: 'Klay',
      password: 'password',
    };

    beforeAll(async () => {
      await userModel.create(user_1);
      await orderStore.create(order_1);
      await orderStore.create(order_2);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql = `DELETE FROM orders`;
      const sql_user = `DELETE FROM users`;
      const sql_alter = `ALTER SEQUENCE orders_id_seq RESTART WITH 1`;
      const sql_alter_user = `ALTER SEQUENCE users_id_seq RESTART WITH 1`;
      await connection
        .query(sql)
        .then(() => connection.query(sql_alter))
        .then(() => connection.query(sql_user))
        .then(() => connection.query(sql_alter_user));
      connection.release();
    });

    it('Test index method', async () => {
      const products = await orderStore.index();
      expect(products).toEqual([order_1, order_2]);
    });

    it('Test show method', async () => {
      const product = await orderStore.show('1');
      expect(product).toEqual(order_1);
    });

    it('Tets create method', async () => {
      const createdPorduct = await orderStore.create(order_3);
      expect(createdPorduct).toEqual(order_3);
    });

    it('Test destroy method', async () => {
      const deletedProduct = await orderStore.destroy('1');
      const products = await orderStore.index();
      expect(deletedProduct).toEqual(order_1);
      expect(products).toEqual([order_2, order_3]);
    });
    it('Test update method', async () => {
      const updatedProduct = await orderStore.update('2', 'complete', '1');
      expect(updatedProduct).toEqual({
        id: 2,
        status: 'complete',
        user_id: '1',
      });
    });
  });
});
