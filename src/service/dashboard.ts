import client from "../database";


export class DashboardQueries{
    async productsInOrders(id:string): Promise<{name:string,price:number,order_id:string}[]> {
        try{
            const connection = await client.connect();
            const sql =`SELECT order_products.product_id, order_products.quantity, orders.user_id, orders.status FROM orders INNER JOIN order_products ON order_products.order_id = orders.id WHERE orders.id=$1;
            `;
            const result = await connection.query(sql,[id])
            connection.release();
            return result.rows;
        }catch(error){
            throw new Error(`unable to get products and orders : ${error}`)
        }
    }

}