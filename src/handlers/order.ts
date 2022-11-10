import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Order, OrderStore } from '../models/order';

export default class OrderHandler {
    store = new OrderStore
    protected async handleRequest(useJWT: boolean, req: Request, res: Response, storeHandler: (req: Request) => Promise<Order | Order[] | null>): Promise<void> {
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
            await this.handleRequest(false, req, res, async (): Promise<Order[]> => {
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
            await this.handleRequest(false, req, res, async (req: Request): Promise<Order | Order[]> => {
                return await this.store.show(req.params.user_id);
            });
        }
        catch (error) {
            res.status(400)
            res.json(`Could not handle show: ${error}`)
        }
    }
    async create(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(true, req, res, async (req: Request): Promise<Order> => {
                return await this.store.create({
                    user_id: req.body.user_id,
                    status: req.body.status ?? 'active'
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
            await this.handleRequest(false, req, res, async (req: Request): Promise<Order> => {
                return await this.store.edit({
                    id: parseInt(req.params.id),
                    user_id: req.body.user_id,
                    status: req.body.status ?? 'active'
                });
            });
        }
        catch (error) {
            res.status(400)
            res.json(`Could not handle edit: ${error}`)
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(false, req, res, async (req: Request): Promise<Order> => {
                return await this.store.delete(req.params.id);
            });
        }
        catch (error) {
            res.status(400)
            res.json(`Could not handle delete: ${error}`)
        }
    }
}