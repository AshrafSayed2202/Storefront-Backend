import Client from "../database";
import { QueryResult } from 'pg';

export type Order = {
    id?: number;
    user_id: number;
    status: string;
}

export class OrderStore {
    async show(id: string): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM orders WHERE user_id=($1) AND status<>($2)`
            const result: QueryResult = await conn.query(sql, [id, 'complete'])
            conn.release()
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not run show query on orders for id ${id}: ${error}`);
        }
    }
    async create(order: Order): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = `INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *`
            const result: QueryResult = await conn.query(sql, [order.user_id, order.status])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run create query on orders: ${error}`);
        }
    }
    async edit(order: Order): Promise<Order> {
        try {
            // this.runQuery(`UPDATE ${this.table} SET user_id = $2, status = $3 WHERE id=$1 RETURNING *`, [order.id, order.user_id, order.status]);
            const conn = await Client.connect()
            const sql = `UPDATE orders SET user_id = $2, status = $3 WHERE id=$1 RETURNING *`
            const result: QueryResult = await conn.query(sql,[order.id, order.user_id, order.status])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run edit query on orders: ${error}`);
        }
    }
}