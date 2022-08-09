import { User } from '../../types/user_type';
import client from '../../database';
import { UserModel } from '../users_model';
import bcrypt from 'bcrypt';
import { BCRYPT_PASSWORD, SALT_ROUNDS } from '../../info';

const hash = (password: string): string => {
  return bcrypt.hashSync(
    password + BCRYPT_PASSWORD,
    parseInt(SALT_ROUNDS as string, 10)
  );
};

const userModel = new UserModel();

describe('User Model Tests', () => {
  describe('Test method existence', () => {
    it('should have index method', () => {
      expect(userModel.index).toBeDefined();
    });
    it('should have show method', () => {
      expect(userModel.show).toBeDefined();
    });
    it('should have create method', () => {
      expect(userModel.create).toBeDefined();
    });
    it('should have destroy method', () => {
      expect(userModel.destroy).toBeDefined();
    });
    it('should have update method', () => {
      expect(userModel.update).toBeDefined();
    });
  });

  describe('Test User method', () => {
    const user_1: User = {
      id: 1,
      first_name: 'Sam',
      last_name: 'Samoy',
      password: hash('test123'),
    };
    const user_2: User = {
      id: 2,
      first_name: 'Salem',
      last_name: 'Ali',
      password: hash('password43'),
    };

    const user_3: User = {
      id: 3,
      first_name: 'Mike',
      last_name: 'Tyson',
      password: hash('boxing'),
    };
    beforeAll(async () => {
      await userModel.create(user_1);
    });
    afterAll(async () => {
      const connection = await client.connect();
      const sql = `DELETE FROM users`;
      const sql_alter = `ALTER SEQUENCE users_id_seq RESTART WITH 1`;
      await connection.query(sql).then(() => connection.query(sql_alter));
      connection.release();
    });

    it('Test index method', async () => {
      const users = await userModel.index();
      expect(users[0].id).toEqual(user_1.id);
      expect(users[0].first_name).toEqual(user_1.first_name);
      expect(users[0].last_name).toEqual(user_1.last_name);
    });

    it('Test show method', async () => {
      const user = (await userModel.show('1')) as unknown as User;
      expect(user.id).toEqual(1);
      expect(user.first_name).toEqual(user_1.first_name);
      expect(user.last_name).toEqual(user_1.last_name);
    });

    it('Test create method', async () => {
      const createdUser = await userModel.create(user_2);
      expect(createdUser.id).toEqual(2);
      expect(createdUser.first_name).toEqual(user_2.first_name);
      expect(createdUser.last_name).toEqual(user_2.last_name);
    });

    it('Test destroy method', async () => {
      const deletedUser = (await userModel.destroy('1')) as unknown as User;
      const users = await userModel.index();
      expect(deletedUser.id).toEqual(1);
      expect(deletedUser.first_name).toEqual(user_1.first_name);
      expect(deletedUser.last_name).toEqual(user_1.last_name);
      expect(users[0].id).toEqual(2);
      expect(users[0].first_name).toEqual(user_2.first_name);
      expect(users[0].last_name).toEqual(user_2.last_name);
    });
    it('Test update method', async () => {
      const updatedUser = (await userModel.update(
        '2',
        'Eren',
        'Yagear',
        'titan'
      )) as unknown as User;
      expect(updatedUser.id).toEqual(2);
      expect(updatedUser.first_name).toEqual('Eren');
      expect(updatedUser.last_name).toEqual('Yagear');
    });

    it('Test authenticate success method', async () => {
      await userModel.create(user_3);
      const user = (await userModel.authenticate(
        user_3.first_name,
        user_3.password
      )) as unknown as User;
      expect(user?.id).toEqual(user_3.id);
      expect(user?.first_name).toEqual(user_3.first_name);
      expect(user?.last_name).toEqual(user_3.last_name);
    });

    it('Test authenticate fail method', async () => {
      const user = await userModel.authenticate('fake', 'fake');
      expect(user).toEqual(null);
    });
  });
});
