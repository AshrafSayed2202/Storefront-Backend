import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { OrderProduct } from '../../models/order-product';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import app from '../../server';

app.listen(5080, function () {
    console.log(`orderProducts handlers test starts app on port: 5080`)
})
const request = supertest(app);

describe('Test responses from orderProducts endpoints', () => {
    let user: User;
    let token: string;
    let orderToken: string;
    let order2Token: string;
    let order: Order;
    let order2: Order;
    let productToken: string;
    let product2Token: string;
    let product: Product;
    let product2: Product;
    let orderProductToken: string;
    let orderProduct: OrderProduct;
    beforeAll(async () => {
        const response = await request.post('/api/users').send({
            user_name: 'Syclo',
            first_name: 'Saif',
            last_name: 'Mohamed',
            password: 'mainVARUS'
        });
        token = response.body as string;
        user = jwt.decode(token) as User;
    })
    it('creates a valid user', async () => {
        expect(user.id).toEqual(jasmine.any(Number));
        expect(user.password).toEqual(jasmine.any(String));
    });
    it('creates a valid order', async () => {
        let response = await request.post('/api/orders').send({
            user_id: user.id,
            status: 'active'
        })
        .set('Authorization', token);
        orderToken = response.body as string;
        order = jwt.decode(orderToken) as Order;
        expect(parseInt(order.user_id as unknown as string)).toEqual(user.id as number);
        expect(order.status).toEqual('active');
        response = await request.post('/api/orders').send({
            user_id: user.id,
            status: 'completed'
        })
        .set('Authorization', token);
        order2Token = response.body as string;
        order2 = jwt.decode(order2Token) as Order;
    });
    it('create a valid product', async () => {
        let response = await request.post('/api/products').send({
            name: 'Xbox',
            price: 650,
            category: 'Console'
        })
        .set('Authorization', token);
        productToken = response.body as string;
        product = jwt.decode(productToken) as Product;
        expect(product.name).toEqual('Xbox');
        expect(product.price).toEqual(650);
        expect(product.category).toEqual('Console');
        response = await request.post('/api/products').send({
            name: 'PlayStation 5',
            price: 600,
            category: 'Console'
        })
        .set('Authorization', token);
        product2Token = response.body as string;
        product2 = jwt.decode(product2Token) as Product;
    });
    it('posts to /api/orderProducts with order_id and product_id and creates orderProduct', async () => {
        const response = await request
            .post('/api/orderProducts')
            .send({
                order_id: order.id,
                product_id: product.id,
                quantity: 20
            })
            .set('Authorization', token);
        orderProductToken = response.body as string;
        orderProduct = jwt.decode(orderProductToken) as OrderProduct;
        expect(parseInt(orderProduct.order_id as unknown as string)).toEqual(order.id as number);
        expect(parseInt(orderProduct.product_id as unknown as string)).toEqual(product.id as number);
        expect(orderProduct.quantity).toEqual(20);
    });
    it('gets orderProduct from /api/orderProducts/:orderProducts_id by id', async () => {
        const response = await request
            .get(`/api/orderProducts/${orderProduct.id}`)
            .set('Authorization', token);
        expect(parseInt(response.body.product_id as unknown as string)).toEqual(product.id as number);
        expect(parseInt(response.body.order_id as unknown as string)).toEqual(order.id as number);
        expect(response.body.quantity).toEqual(20);
    });
    it('gets all orderProducts from /api/orderProducts/ ', async () => {
        const response = await request
            .get(`/api/orderProducts`)
            .set('Authorization', token);
        expect(response.body.length).toEqual(1);
        expect(parseInt(response.body[0].product_id as unknown as string)).toEqual(product.id as number);
        expect(parseInt(response.body[0].order_id as unknown as string)).toEqual(order.id as number);
        expect(response.body[0].quantity).toEqual(20);
    });
    it('puts to /api/orderProducts/orderProducts_id to change parameters', async () => {
        const response = await request
            .put(`/api/orderProducts/${orderProduct.id}`)
            .send({
                order_id: order2.id,
                product_id: product2.id,
                quantity: 77
            })
            .set('Authorization', token);
        expect(parseInt(response.body.product_id as unknown as string)).toEqual(product2.id as number);
        expect(parseInt(response.body.order_id as unknown as string)).toEqual(order2.id as number);
        expect(response.body.quantity).toEqual(77);
    });
    // clear
    afterAll(async () => {
        await request
            .delete(`/api/orderProducts/${orderProduct.id}`)
            .set('Authorization', token);
        await request
            .delete(`/api/products/${product.id}`)
            .set('Authorization', token);
        await request
            .delete(`/api/orders/${order.id}`)
            .set('Authorization', token);
        await request
            .delete(`/api/products/${product2.id}`)
            .set('Authorization', token);
        await request
            .delete(`/api/orders/${order2.id}`)
            .set('Authorization', token);
        await request
            .delete(`/api/users/${user.id}`)
            .set('Authorization', token);
    });
});