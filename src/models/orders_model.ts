import client from '../database';
import checkIfIdExists from '../service/checkIfIdExists';
import { Order } from '../types/order_type';
import { Message } from '../types/message_type';

export class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM orders ;`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get all orders: ${error}`);
    }
  }

  async show(id: string): Promise<Order | Message> {
    try {
      const checkID = await checkIfIdExists(id, 'orders');
      if (!checkID.exists) {
        return { message: `order id:${id} does not exist` };
      } else {
        const connection = await client.connect();
        const sql = `SELECT * FROM orders WHERE id=$1 ;`;
        const result = await connection.query(sql, [id]);
        connection.release();
        return result.rows[0];
      }
    } catch (error) {
      throw new Error(`cannot that order ${id}: ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING * ;`;
      const result = await connection.query(sql, [order.status, order.user_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot create order: ${error}`);
    }
  }

  async destroy(id: string): Promise<Order | Message> {
    try {
      const checkID = await checkIfIdExists(id, 'orders');
      if (!checkID.exists) {
        return { message: `order id:${id} does not exist` };
      } else {
        const connection = await client.connect();
        const sql_order_products = `DELETE FROM order_products WHERE order_id=$1 RETURNING *`;
        const sql_orders = `DELETE FROM orders WHERE id=$1 RETURNING * ;`;

        const result = await connection
          .query(sql_order_products, [id])
          .then(() => connection.query(sql_orders, [id]));
        connection.release();
        return result.rows[0];
      }
    } catch (error) {
      throw new Error(`cannot delete order ${id} : ${error}`);
    }
  }

  async update(
    id: string,
    status: string,
    user_id: string
  ): Promise<Order | Message> {
    try {
      const checkID = await checkIfIdExists(id, 'orders');
      if (!checkID.exists) {
        return { message: `order id:${id} does not exist` };
      } else {
        const connection = await client.connect();
        const sql = `UPDATE orders SET  status=$1, user_id=$2 WHERE id=$3 RETURNING * ; `;
        const result = await connection.query(sql, [status, user_id, id]);
        connection.release();
        return result.rows[0];
      }
    } catch (error) {
      throw new Error(`cannot update order ${id} : ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1,$2,$3) RETURNING * ;`;
      const result = await connection.query(sql, [
        quantity,
        order_id,
        product_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot add new product to an order: ${error}`);
    }
  }
}
