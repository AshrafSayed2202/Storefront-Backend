import express from 'express';
import users from './api/users';
import orders from './api/orders';
import products from './api/products';
import orderProducts from './api/orderProducts';

const routes: express.Router = express.Router();

routes.use('/api/users', users);
routes.use('/api/products', products);
routes.use('/api/orders', orders);
routes.use('/api/orderProducts', orderProducts);

routes.get(
    '/',
    (req: express.Request, res: express.Response): void => {
        res.send(
            `<style>
        dd{
            margin-top: 10px;
        }
    </style>
    <h1>Welcome to my StoreFront Backend project</h1>
    <h3>here is the routes you need</p>
    <dl>
        <dt>Users routes</dt>
        <dd>Create: [post]<a href="http://localhost:3000/api/users"> http://localhost:3000/api/users </a>Parameters are user_name , first_name , last_name and password , you will reciver JWT save it for later</dd>
        <dd>Index: [get]<a href="http://localhost:3000/api/users"> http://localhost:3000/api/users </a></dd>
        <dd>Show: [get]<a href="http://localhost:3000/api/users/:id"> http://localhost:3000/api/users/:id </a></dd>
        <dd>Edit: [put]<a href="http://localhost:3000/api/users/:id"> http://localhost:3000/api/users/:id </a>Parameters are user_name , first_name , last_name and password</dd>
        <dd>Delete: [delete]<a href="http://localhost:3000/api/users/:id"> http://localhost:3000/api/users/:id </a></dd>
        <dt>Products routes</dt>
        <dd>Index: [get]<a href="http://localhost:3000/api/products"> http://localhost:3000/api/products </a></dd>
        <dd>Show: [get]<a href="http://localhost:3000/api/products/:id"> http://localhost:3000/api/products/:id </a></dd>
        <dd>Create: [post]<a href="http://localhost:3000/api/products"> http://localhost:3000/api/products </a>Parameters are name , price and category</dd>
        <dd>Edit: [put]<a href="http://localhost:3000/api/products/:id"> http://localhost:3000/api/products/:id </a>Parameters are name , price and category</dd>
        <dd>Delete: [delete]<a href="http://localhost:3000/api/products/:id"> http://localhost:3000/api/products/:id </a></dd>
        <dt>Order routes</dt>
        <dd>Index: [get]<a href="http://localhost:3000/api/orders"> http://localhost:3000/api/orders </a></dd>
        <dd>Show: [get]<a href="http://localhost:3000/api/orders/:user_id"> http://localhost:3000/api/orders/:user_id </a></dd>
        <dd>Create: [post]<a href="http://localhost:3000/api/orders"> http://localhost:3000/api/orders </a>Parameters are user_id and status</dd>
        <dd>Edit: [put]<a href="http://localhost:3000/api/orders/:id"> http://localhost:3000/api/orders/:id </a></dd>
        <dd>Delete: [delete]<a href="http://localhost:3000/api/orders/:id"> http://localhost:3000/api/orders/:id </a></dd>
        <dt>Order product routes</dt>
        <dd>Index: [get]<a href="http://localhost:3000/api/orderproducts"> http://localhost:3000/api/orderproducts </a></dd>
        <dd>Show: [get]<a href="http://localhost:3000/api/orderproducts/:id"> http://localhost:3000/api/orderproducts/:id </a></dd>
        <dd>Create: [post]<a href="http://localhost:3000/api/orderproducts"> http://localhost:3000/api/orderproducts </a>Parameters are product_id , order_id and quantity</dd>
        <dd>Edit: [put]<a href="http://localhost:3000/api/orderproducts/:id"> http://localhost:3000/api/orderproducts/:id </a>Parameters are product_id , order_id and quantity</dd>
        <dd>Delete: [delete]<a href="http://localhost:3000/api/orderproducts/:id"> http://localhost:3000/api/orderproducts/:id </a></dd>
    </dl>`
        );
    }
);

export default routes;