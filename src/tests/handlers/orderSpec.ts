import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import app from '../../server';

app.listen(5070, function () {
    console.log(`order handlers test starts app on port: 5070`)
})
const request = supertest(app);

describe('Test responses from order endpoints', () => {
    let user: User;
    let token: string;
    let orderToken: string;
    let order: Order;
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
    it('gets from /api/orders/:user_id the order of the user', async () => {
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
    it('puts to /api/orders to change parameter', async () => {
        const response = await request
            .put(`/api/orders/${order.id}`)
            .set('Authorization', token)
            .send({
                user_id: user.id,
                status: 'completed'
            });
        expect(parseInt(response.body.user_id as unknown as string)).toEqual(user.id as number);
        expect(response.body.status).toEqual('completed');
    });
    // clear
    afterAll(async () => {
        await request
            .delete(`/api/orders/${order.id}`)
            .set('Authorization', token);
        await request
            .delete(`/api/users/${user.id}`)
            .set('Authorization', token);
    });
});
