import client from '../database';

export type FullOrder = {
  product_id: string;
  quantity: number;
  status: string;
  id: string;
};

export class DashboardQueries {
  async currentOrder(id: string): Promise<FullOrder[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT order_products.product_id, order_products.quantity, orders.status, orders.id FROM orders INNER JOIN order_products ON order_products.order_id = orders.id AND orders.user_id=$1 WHERE orders.status='active' ;`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get current order : ${error}`);
    }
  }

  // async ordersforuser(user_id:string) :Promise<string> {
  //   try{
  //     const connect = await client.connect()
  //     const sql = `SELECT order_product.product_id, order_products.quantity, orders.Status`
  //   }s
  // }
}
