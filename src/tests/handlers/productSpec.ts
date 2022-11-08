import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import app from '../../server';

app.listen(5060, function () {
    console.log(`starting app on: 5060`)
})
const request = supertest(app);

describe('Test responses from product endpoints', () => {
    let user: User;
    let token: string;
    let product1Token: string;
    let product2Token: string;
    let product1: Product;
    let product2: Product;
    beforeAll(async () => {
        const response = await request
            .post('/api/users')
            .send({
                user_name: 'Typhon',
                first_name: 'Ashraf',
                last_name: 'Sayed',
                password: 'AnyPassword'
            });
        token = response.body as string;
        user = jwt.decode(token) as User;
    });
    it('creates a valid user', async () => {
        expect(user.id).toEqual(jasmine.any(Number));
        expect(user.password).toEqual(jasmine.any(String));
    });
    it('posts to /api/products and creates a product', async () => {
        let response = await request
            .post('/api/products')
            .send({
                name: 'Xbox',
                price: 650,
                category: 'Console'
            })
            .set('Authorization', token);
            product1Token = response.body as string;
            product1 = jwt.decode(product1Token) as Product
        expect(product1.name).toEqual('Xbox');
        expect(product1.price).toEqual(650);
        expect(product1.category).toEqual('Console');
        response = await request
            .post('/api/products')
            .send({
                name: 'Dell G15',
                price: 700,
                category: 'Laptops'
            })
            .set('Authorization', token);
            product2Token = response.body as string;
            product2 = jwt.decode(product2Token) as Product
        expect(product2.name).toEqual('Dell G15');
        expect(product2.price).toEqual(700);
        expect(product2.category).toEqual('Laptops');
    });
    it('gets from /api/products/:product_id the product', async () => {
        const response = await request
            .get(`/api/products/${product1.id}`)
            .set('Authorization', token);
        expect(response.body.name).toEqual('Xbox');
        expect(response.body.price).toEqual(650);
        expect(response.body.category).toEqual('Console');
    });
    it('gets from /api/products all of the products', async () => {
        const response = await request
            .get('/api/products');
        expect(response.body.length).toEqual(2);
        expect(response.body[0].name).toEqual('Xbox');
        expect(response.body[0].price).toEqual(650);
        expect(response.body[0].category).toEqual('Console');
        expect(response.body[1].name).toEqual('Dell G15');
        expect(response.body[1].price).toEqual(700);
        expect(response.body[1].category).toEqual('Laptops');
    });
    it('puts to /api/products/:product_id to change parameters', async () => {
        const response = await request
            .put(`/api/products/${product2.id}`)
            .set('Authorization', token)
            .send({
                name: 'Dell Inspiron',
                price: 350,
                category: 'Laptops'
            });
        expect(response.body.name).toEqual('Dell Inspiron');
        expect(response.body.price).toEqual(350);
        expect(response.body.category).toEqual('Laptops');
    });
    afterAll(async () => {
        await request
            .delete('/products')
            .send({ id: product1.id })
            .set('Authorization', token);
        await request
            .delete('/products')
            .send({ id: product2.id })
            .set('Authorization', token);
        await request
            .delete('/users')
            .send({ id: user.id })
            .set('Authorization', token);
    });
});
