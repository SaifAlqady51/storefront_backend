import client from '../database';
import bcrypt from 'bcrypt';
import { BCRYPT_PASSWORD, SALT_ROUNDS } from '../info';

export type User = {
  firstName: string;
  lastName: string;
  password: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM users;`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot show users: ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM users WHERE id=$1;`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot show user : ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO users (firstName, lastName, password) VALUES ($1,$2,$3) RETURNING * ;`;
      const hash = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string, 10)
      );
      const result = await connection.query(sql, [
        user.firstName,
        user.lastName,
        hash,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot show users: ${error}`);
    }
  }

  async authenticate(
    firstName: string,
    password: string
  ): Promise<User | null> {
    try {
      const connection = await client.connect();
      const sql = `SELECT password FROM users WHERE firstName=$1`;
      const result = await connection.query(sql, [firstName]);
      console.log('result passed');

      if (result.rows.length) {
        const user = result.rows[0];
        console.log(user.password);

        if (
          await bcrypt.compareSync(
            `${password}${BCRYPT_PASSWORD}`,
            user.password
          )
        ) {
          console.log(user.password);
          return user.password;
        }
        console.log('failed');
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
