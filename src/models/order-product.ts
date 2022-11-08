import Client from "../database";
import { QueryResult } from 'pg';

export type OrderProduct = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
}

export class OrderProductStore {
    async index(): Promise<OrderProduct[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM order_products`
            const result: QueryResult = await conn.query(sql)
            conn.release()
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not run index query on order_products: ${error}`);
        }
    }
    async show(id: string): Promise<OrderProduct> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM order_products WHERE id=($1)`
            const result:QueryResult = await conn.query(sql, [id])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run show query on order_products for id ${id}: ${error}`);
        }
    }
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
    async delete(id:string): Promise<OrderProduct> {
        try {
            const conn = await Client.connect()
            const sql = `DELETE FROM order_products WHERE id=($1)`
            const result: QueryResult = await conn.query(sql,[id])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run delete query on order_products for id ${id}: ${error}`);
        }
    }
    async deleteAll(): Promise<void> {
        try {
            const conn = await Client.connect()
            const sql = `DELETE FROM order_products`
            await conn.query(sql)
            conn.release()
        }
        catch (error) {
            throw new Error(`Could not run deleteAll query on order_products: ${error}`);
        }
    }
}