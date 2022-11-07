import Client from "../database";
import { QueryResult } from 'pg';

export type OrderProduct = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
}

export class orderProductStore {
    async create(product: OrderProduct): Promise<OrderProduct> {
        try {
            const conn = await Client.connect()
            const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`
            const result: QueryResult = await conn.query(sql, [product.order_id, product.product_id, product.quantity])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run create query on order_products: ${error}`);
        }
    }
    async edit(product: OrderProduct): Promise<OrderProduct> {
        try {
            const conn = await Client.connect()
            const sql = `UPDATE order_products SET order_id = $2, product_id = $3, quantity = $4 WHERE id=$1 RETURNING *`
            const result: QueryResult = await conn.query(sql,[product.id, product.order_id, product.product_id, product.quantity])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run edit query on order_products: ${error}`);
        }
    }
}