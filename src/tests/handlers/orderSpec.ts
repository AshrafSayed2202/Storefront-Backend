import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import app from '../../server';

app.listen(5070, function () {
    console.log(`starting app on: 5070`)
})
const request = supertest(app);

describe('Test responses from order endpoints', () => {
    let user: User;
    let token: string;
    let orderToken: string;
    let order: Order;
    // Set test user
    beforeAll(async () => {
        const response = await request.post('/api/users').send({
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
    it('posts to /api/orders with user_id and status="new" and creates order', async () => {
        const response = await request
            .post('/api/orders')
            .send({
                user_id: user.id,
                status: 'active'
            })
            .set('Authorization', token);
        orderToken = response.body as string;
        order = jwt.decode(orderToken) as Order
        expect(parseInt(order.user_id as unknown as string)).toEqual(user.id as number);
        expect(order.status).toEqual('active');
    });
    it('gets from /api/orders/:user_id (valid user) the order of the user', async () => {
        const response = await request
            .get(`/api/orders/${user.id}`)
            .set('Authorization', token);
        expect(response.body.length).toEqual(1);
        expect(parseInt(response.body[0].user_id as unknown as string)).toEqual(user.id as number);
        expect(response.body[0].status).toEqual('active');
    });
    it('gets from /api/orders all orders', async () => {
        const response = await request
            .get('/api/orders')
            .set('Authorization', token);
        expect(parseInt(response.body[0].user_id as unknown as string)).toEqual(user.id as number);
        expect(response.body[0].status).toEqual('active');
    });
    afterAll(async () => {
        await request
            .delete('/orders')
            .send({ id: order.id })
            .set('Authorization', token);
        await request
            .delete('/users')
            .send({ id: user.id })
            .set('Authorization', token);
    });
});
