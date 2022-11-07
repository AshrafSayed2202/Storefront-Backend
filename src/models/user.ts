import Client from "../database";
import bcrypt from 'bcrypt';
import { QueryResult } from 'pg';

export type User = {
    id?: number;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
}

export class userStore {
    private saltRounds: number = parseInt(process.env.SALT_ROUNDS as unknown as string);
    private pepper: string = process.env.BCRYPT_PASSWORD as unknown as string;
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM users`
            const result:QueryResult = await conn.query(sql);
            conn.release()
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not run index query on users: ${error}`);
        }
    }
    async show(id: string): Promise<User> {
        try {
            // ``, [id]
            const conn = await Client.connect()
            const sql = `SELECT * FROM users WHERE id=($1)`
            const result:QueryResult = await conn.query(sql, [id])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run show query on users for id ${id}: ${error}`);
        }
    }
    async create(user: User): Promise<User> {
        const hash = bcrypt.hashSync(user.password + this.pepper, this.saltRounds);
        try {
            const conn = await Client.connect()
            const sql = `INSERT INTO users (user_name, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *`
            const result:QueryResult = await conn.query(sql, [user.user_name, user.first_name, user.last_name, hash])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run create query on users: ${error}`);
        }
    }
    async edit(user: User): Promise<User> {
        const hash = bcrypt.hashSync(`${user.password}${this.pepper}`, this.saltRounds);
        try {
            const conn = await Client.connect()
            const sql = `UPDATE users SET user_name = $2, first_name = $3, last_name = $4, password = $5 WHERE id=$1 RETURNING *`
            const result:QueryResult = await conn.query(sql, [user.id, user.user_name, user.first_name, user.last_name, hash])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run edit query on users: ${error}`);
        }
    }
    async delete(id: string): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = `DELETE FROM users WHERE id=($1)`
            const result:QueryResult = await conn.query(sql, [id])
            conn.release()
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not run delete query on users for id ${id}: ${error}`);
        }
    }
    async deleteAll(): Promise<void> {
        try {
            const conn = await Client.connect()
            const sql = `DELETE FROM users`
            await conn.query(sql)
            conn.release()
        }
        catch (error) {
            throw new Error(`Could not delete all entries in users: ${error}`);
        }
    }
    async authenticate(user_name: string, password: string): Promise<User | null> {
        let result:QueryResult|null;
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM users WHERE user_name=($1)`;
            (await conn).release()
            result = await conn.query(sql, [user_name])
        }
        catch (error) {
            result = null;
            throw new Error(`Could not run show query on users: ${error}`);
        }
        if (!result?.rows.length) {
            return null; // No user found for user_name
        }
        const user = result.rows[0];
        if (!bcrypt.compareSync(`${password}${this.pepper}`, user.password)) {
            return null; // No authentication
        }
        return user;
    }
}