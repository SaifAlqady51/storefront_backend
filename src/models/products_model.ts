import client from '../database';

export type Product = {
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products;`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `SELECT FROM products WHERE id=$1;`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING * ;`;
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
