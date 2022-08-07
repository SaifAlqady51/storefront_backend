import client from '../database';
import checkIfIdExists from '../service/checkIfIdExists';
import { Product } from '../types/product_type';
import { Message } from '../types/message_type';

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

  async show(id: string): Promise<Product | Message> {
    try {
      const checkID = await checkIfIdExists(id,'products')
      if(!checkID.exists){
        return {message: `products id:${id} does not exist`}

      }else{
        const connection = await client.connect();
        const sql = `SELECT FROM products WHERE id=$1;`;
        const result = await connection.query(sql, [id]);
        connection.release();
        return result.rows[0];
      }

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

  async destroy(id:string): Promise<Product | Message> {
    try{
      const checkID = await checkIfIdExists(id,'products')
      if(!checkID.exists){
        return {message: `products id:${id} does not exist`}
      }
      else{
        const connection = await client.connect();
        const sql = `DELETE FROM produts WHERE id=$1 RETURNIG *`;
        const result = await connection.query(sql,[id])
        connection.release();
        return result.rows[0];
      }

    }catch(error){
      throw new Error(`cannot delete product ${id}: ${error}`)
    }
  }

  async update(id:string,name:string,price:number,category:string): Promise<Product | Message> {
    try{
      const checkID = await checkIfIdExists(id,'products')
      if(!checkID.exists){
        return {message:`products id:${id} does not exist`}
      }
      else{
        const connection = await client.connect();
        const sql = `UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING id, name,price,category; `;
        const result = await connection.query(sql,[name,price,category,id]);
        connection.release();
        return result.rows[0];
      }
    }catch(error){
      throw new Error(`cannot update product ${id}: ${error}`);
    }
  }

  async getProudctsByCategory(category:string): Promise<Product> {
    try{
      const connection = await client.connect();
      const sql = `SELECT * FROM products WHERE category=$1`;
      const result = await connection.query(sql,[category]);
      connection.release();
      return result.rows[0];
    }catch(error){
      throw new Error(`cannot get all product wiht category ${category} : ${error}`)
    }
  }
}
