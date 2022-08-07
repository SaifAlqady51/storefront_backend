import client from "../database";


const checkIfIdExists = async (id:string, table:string) => {
    try{
        const connection = await client.connect();
        const sql = `SELECT exists (SELECT id FROM ${table} WHERE id=${id})`;
        const result = await connection.query(sql);
        connection.release();
        return result.rows[0]
    }catch(error){
        throw new Error(`cannot check if id exists : ${error}`)
    }
}

export default checkIfIdExists;