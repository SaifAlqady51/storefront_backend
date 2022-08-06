import client from "../database";

export type Order = {
    status: string,
    user_id: number
}


export class OrderModel {
    async index(): Promise<Order[]> {
        try{
            const connection = await client.connect();
            const sql = `SELECT * FROM orders ;`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }catch(error){
            throw new Error(`cannot get all orders: ${error}`)
        }
    }

    async show(id:string): Promise<Order> {
        try{
            const connection = await client.connect();
            const sql = `SELECT * FROM orders WHERE id=$1 ;`;
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(error){
            throw new Error(`cannot that order ${id}: ${error}`)
        }
    }

    async create(order:Order): Promise<Order> {
        try{
            const connection = await client.connect();
            const sql = `INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING * ;`;
            const result = await connection.query(sql,[order.status,order.user_id]);
            connection.release();
            return result.rows[0];
        }catch(error){
            throw new Error(`cannot get all orders: ${error}`)
        }
    }

    async addProduct(quantity: number, order_id: string, product_id:string): Promise<Order>{
        try{
            const connection = await client.connect();
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1,$2,$3) RETURNING * ;`;
            const result = await connection.query(sql,[quantity, order_id, product_id]);
            connection.release();
            return result.rows[0]
        }catch(error){
            throw new Error(`cannot add new product to an order: ${error}`)
        }
    }
}