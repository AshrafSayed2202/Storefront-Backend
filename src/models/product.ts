import Client from "../database";
import { QueryResult } from 'pg';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
}

export class productStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM products`
            const result:QueryResult = await conn.query(sql);
            conn.release()
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not run index query on products: ${error}`);
        }
    }
    async show(id: string): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM products WHERE id=($1)`
            const result:QueryResult = await conn.query(sql, [id])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run show query on products for id ${id}: ${error}`);
        }
    }
    async create(product: Product): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = `INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *`
            const result:QueryResult = await conn.query(sql, [product.name, product.price, product.category])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run create query on products: ${error}`);
        }
    }
    async edit(product: Product): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = `UPDATE products SET name = $2, price = $3, category = $4 WHERE id=$1 RETURNING *`
            const result:QueryResult = await conn.query(sql, [product.id, product.name, product.price, product.category])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run edit query on products: ${error}`);
        }
    }
    async delete(id: string): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = `DELETE FROM products WHERE id=($1)`
            const result:QueryResult = await conn.query(sql, [id])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run delete query on products for id ${id}: ${error}`);
        }
    }
    async deleteAll(): Promise<void> {
        try {
            const conn = await Client.connect()
            const sql = `DELETE FROM products`
            await conn.query(sql)
            conn.release()
        }
        catch (error) {
            throw new Error(`Could not delete all entries in products: ${error}`);
        }
    }
}