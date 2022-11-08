import express from 'express';
import authenticate from '../../middlewares/authenticate';
import ProductHandler from '../../handlers/product';

const products: express.Router = express.Router();
const handler = new ProductHandler
// index
products.get('/',(req, res) => { handler.index(req, res); });
// Show
products.get('/:id',(req, res) => { handler.show(req, res); });
// Create
products.post('/',authenticate,(req, res) => { handler.create(req, res); });
// Edit
products.put('/:id',authenticate,(req, res) => { handler.edit(req, res); });
// Delete
products.delete('/:id',authenticate, (req, res) => { handler.delete(req, res); });

export default products;