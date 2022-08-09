import client from '../database';
import bcrypt from 'bcrypt';
import { BCRYPT_PASSWORD, SALT_ROUNDS } from '../info';
import checkIfIdExists from '../service/checkIfIdExists';
import { User } from '../types/user_type';
import { Message } from '../types/message_type';

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT id, first_name, last_name FROM users ORDER BY id ASC ;`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot show users: ${error}`);
    }
  }

  async show(id: string): Promise<User | Message> {
    try {
      const checkID = await checkIfIdExists(id, 'users');
      if (!checkID.exists) {
        return { message: `user id:${id} does not exist` };
      } else {
        const connection = await client.connect();
        const sql = `SELECT id, first_name, last_name FROM users WHERE id=$1;`;
        const result = await connection.query(sql, [id]);
        connection.release();
        return result.rows[0];
      }
    } catch (error) {
      throw new Error(`cannot show user : ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO users (first_name, last_name, password) VALUES ($1,$2,$3) RETURNING id, first_name, last_name ;`;
      const hash = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string, 10)
      );
      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        hash,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot create users: ${error}`);
    }
  }

  async destroy(id: string): Promise<User | Message> {
    try {
      const checkID = await checkIfIdExists(id, 'users');
      if (!checkID.exists) {
        return { message: `user id:${id} does not exist` };
      } else {
        const connection = await client.connect();
        const sql = `DELETE FROM users WHERE id=$1 RETURNING id, first_name,last_name`;
        const result = await connection.query(sql, [id]);
        connection.release();
        return result.rows[0];
      }
    } catch (error) {
      throw new Error(`cannot delete the user ${id}: ${error}`);
    }
  }

  async update(
    id: string,
    first_name: string,
    last_name: string,
    password: string
  ): Promise<User | Message> {
    try {
      const checkID = await checkIfIdExists(id, 'users');
      if (!checkID.exists) {
        return { message: `user id:${id} does not exist` };
      } else {
        const connection = await client.connect();
        const sql = `UPDATE users SET first_name=$1, last_name=$2, password=$3  WHERE id=$4  RETURNING id, first_name, last_name;`;
        const hash = bcrypt.hashSync(
          password + BCRYPT_PASSWORD,
          parseInt(SALT_ROUNDS as string, 10)
        );

        const result = await connection.query(sql, [
          first_name,
          last_name,
          hash,
          id,
        ]);
        connection.release();
        return result.rows[0];
      }
    } catch (error) {
      throw new Error(`cannot update the user ${id}: ${error}`);
    }
  }

  async authenticate(
    first_name: string,
    password: string
  ): Promise<string | null> {
    try {
      const connection = await client.connect();
      const sql = `SELECT id,first_name, last_name, password FROM users WHERE first_name=$1 ;`;
      const result = await connection.query(sql, [first_name]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (
          bcrypt.compareSync(`${password}${BCRYPT_PASSWORD}`, user.password)
        ) {
          return user;
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`authentication Error: ${error}`);
    }
  }
}
