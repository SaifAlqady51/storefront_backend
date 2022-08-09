import client from '../database';

export const checkActiveOrder = async (id: string): Promise<boolean> => {
  try {
    const connection = await client.connect();
    const sql = `SELECT * FROM orders WHERE orders.status='active' AND (orders.user_id=$1) ;`;
    const result = await connection.query(sql, [id]);
    if (result.rows[0]) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
