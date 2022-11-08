import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Product, ProductStore } from '../models/product';

export default class ProductHandler {
    store = new ProductStore
    protected async handleRequest(useJWT: boolean, req: Request, res: Response, storeHandler: (req: Request) => Promise<Product | Product[] | null>): Promise<void> {
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
            await this.handleRequest(false, req, res, async (): Promise<Product[]> => {
                return await this.store.index();
            });
        }
        catch (error) {
            throw new Error(`Could not handle index: ${error}`);
        }
    }
    async show(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(false, req, res, async (req: Request): Promise<Product | Product[]> => {
                return await this.store.show(req.params.id);
            });
        }
        catch (error) {
            throw new Error(`Could not handle show: ${error}`);
        }
    }
    async create(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(true, req, res, async (req: Request): Promise<Product> => {
                return await this.store.create({
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category ?? ''
                });
            });
        }
        catch (error) {
            throw new Error(`Could not handle create: ${error}`);
        }
    }
    async edit(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(false, req, res, async (req: Request): Promise<Product> => {
                return await this.store.edit({
                    id: parseInt(req.params.id),
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category ?? ''
                });
            });
        }
        catch (error) {
            throw new Error(`Could not handle edit: ${error}`);
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.handleRequest(false, req, res, async (req: Request): Promise<Product> => {
                return await this.store.delete(req.params.id);
            });
        }
        catch (error) {
            throw new Error(`Could not handle delete: ${error}`);
        }
    }
}