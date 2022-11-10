import express from 'express';
import authenticate from '../../middlewares/authenticate';
import UserHandler from '../../handlers/user';

const users: express.Router = express.Router();
const handler = new UserHandler
// index
users.get('/',authenticate,(req, res) => { handler.index(req, res); });
// Show
users.get('/:id',authenticate,(req, res) => { handler.show(req, res); });
// Create
users.post('/',(req, res) => { handler.create(req, res); });
// Edit
users.put('/:id',authenticate,(req, res) => { handler.edit(req, res); });
// Delete
users.delete('/:id',authenticate,(req, res) => { handler.delete(req, res); });
export default users;