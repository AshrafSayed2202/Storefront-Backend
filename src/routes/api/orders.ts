import express from 'express';
import authenticate from '../../middlewares/authenticate';
import OrderHandler from '../../handlers/order';

const orders: express.Router = express.Router();
const handler = new OrderHandler
// Index
orders.get('/',authenticate,(req, res) => { handler.index(req, res); });
// Show
orders.get('/:user_id',authenticate,(req, res) => { handler.show(req, res); });
// Create
orders.post('/',authenticate,(req, res) => { handler.create(req, res); });
// Edit
orders.put('/:id',authenticate,(req, res) => { handler.edit(req, res); });
// Delete
orders.delete('/:id',authenticate,(req, res) => { handler.delete(req, res); });
export default orders;