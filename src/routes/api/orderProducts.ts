import express from 'express';
import authenticate from '../../middlewares/authenticate';
import OrderProductHandler from '../../handlers/orderProduct';

const orderProducts: express.Router = express.Router();
const handler = new OrderProductHandler
// Index
orderProducts.get('/',authenticate,(req, res) => { handler.index(req, res); });
// Show
orderProducts.get('/:id',authenticate,(req, res) => { handler.show(req, res); });
// Create
orderProducts.post('/',authenticate,(req, res) => { handler.create(req, res); });
// Edit
orderProducts.put('/:id',authenticate, (req, res) => { handler.edit(req, res); });
// Delete
orderProducts.delete('/:id',authenticate, (req, res) => { handler.delete(req, res); });
export default orderProducts;