import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { User } from '../../models/user';
import app from '../../server';

app.listen(5050, function () {
    console.log(`user handlers test starts app on port: 5050`)
})
const request = supertest(app);

describe('Tests responses from user endpoints', () => {
    let token: string;
    let user: User;
    it('creates a valid user', async () => {
        const response = await request.post('/api/users').send({
            user_name: 'Typhon',
            first_name: 'Ashraf',
            last_name: 'Sayed',
            password: 'AnyPassword'
        });
        token = response.body as string;
        user = jwt.decode(token) as User;
        expect(user.id).toEqual(jasmine.any(Number));
        expect(user.password).toEqual(jasmine.any(String));
        expect(user.user_name).toEqual('Typhon');
        expect(user.first_name).toEqual('Ashraf');
        expect(user.last_name).toEqual('Sayed');
    });
    it('gets from /api/users/:id the user with id', async () => {
        const response = await request
            .get(`/api/users/${user.id}`)
            .set('Authorization', token);
        expect(response.body.user_name).toEqual('Typhon');
        expect(response.body.first_name).toEqual('Ashraf');
        expect(response.body.last_name).toEqual('Sayed');
    });
    it('gets from /api/users all of the users', async () => {
        const response = await request
            .get('/api/users')
            .set('Authorization', token);
        expect(response.body[0].user_name).toEqual('Typhon');
        expect(response.body[0].first_name).toEqual('Ashraf');
        expect(response.body[0].last_name).toEqual('Sayed');
    });
    afterAll(async () => {
        await request
            .delete(`/api/users/${user.id}`)
            .set('Authorization', token);
    });
});
