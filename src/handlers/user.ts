import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';

export default class UserHandler {
    store = new UserStore
    protected async handleRequest(useJWT: boolean, req: Request, res: Response, storeHandler: (req: Request) => Promise<User | User[] | null>): Promise<void> {
        try {
            const result: string = await storeHandler(req) as unknown as string;
            if (useJWT) {
                res.json(jwt.sign(result, process.env.TOKEN_SECRET as unknown as string));
            } else {
                res.json(result);
            }
        } catch (error) {
            res.status(400)
            res.json(error)
        }
    }
    async index(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(false, req, res, async (): Promise<User[]> => {
                return await this.store.index();
            });
        }
        catch (error) {
            res.status(400)
            res.json(`Could not handle index: ${error}`)
        }
    }
    async show(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(false, req, res, async (req: Request): Promise<User | User[]> => {
                return await this.store.show(req.params.id);
            });
        }
        catch (error) {
            res.status(400)
            res.json(`Could not handle show: ${error}`)
        }
    }
    async create(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(true, req, res, async (req: Request): Promise<User> => {
                return await this.store.create({
                    user_name: req.body.user_name,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: req.body.password
                });
            });
        }
        catch (error) {
            res.status(400)
            res.json(`Could not handle create: ${error}`)
        }
    }
    async edit(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(false, req, res, async (req: Request): Promise<User> => {
                return await this.store.edit({
                    id: parseInt(req.params.id),
                    user_name: req.body.user_name,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: req.body.password
                });
            });
        }
        catch (error) {
            res.status(400)
            res.json(`Could not handle edit: ${error}`)
        }
    }
    async authenticate(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(true, req, res, async (req: Request): Promise<User | null> => {
                return await this.store.authenticate(req.body.user_name, req.body.password);
            });
        }
        catch (error) {
            res.status(400)
            res.json(`Could not handle authenticate: ${error}`)
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(false, req, res, async (req: Request): Promise<User> => {
                return await this.store.delete(req.params.id);
            });
        }
        catch (error) {
            res.status(400)
            res.json(`Could not handle delete: ${error}`)
        }
    }
}