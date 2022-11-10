import { User, UserStore } from '../../models/user';

const store = new UserStore();
let user1: User;
let user2: User;

describe('Tests the User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an edit method', () => {
        expect(store.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('should have a deleteAll method', () => {
        expect(store.deleteAll).toBeDefined();
    });

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('adds a user with the create method', async () => {
        user1 = await store.create({
            user_name: 'Typhon',
            first_name: 'Ashraf',
            last_name: 'Sayed',
            password: 'Anypassword'
        });
        expect(user1.user_name).toEqual('Typhon');
        expect(user1.first_name).toEqual('Ashraf');
        expect(user1.last_name).toEqual('Sayed');
        user2 = await store.create({
            user_name: 'Chester',
            first_name: 'Momin',
            last_name: 'Tarik',
            password: 'MomiinTariik'
        });
        expect(user2.user_name).toEqual('Chester');
        expect(user2.first_name).toEqual('Momin');
        expect(user2.last_name).toEqual('Tarik');
    });
    it('edits a user with the edit method', async () => {
        const id = user2.id;
        user2 = await store.edit({
            id: id,
            user_name: 'Caster',
            first_name: 'Azmi',
            last_name: 'Osman',
            password: 'azmitwoface'
        });
        expect(user2.user_name).toEqual('Caster');
        expect(user2.first_name).toEqual('Azmi');
        expect(user2.last_name).toEqual('Osman');
    });
    it('returns a list of all users with the index method', async () => {
        const result = await store.index();
        expect(result.length).toEqual(2);
        expect(result[0].user_name).toEqual('Typhon');
        expect(result[0].first_name).toEqual('Ashraf');
        expect(result[0].last_name).toEqual('Sayed');
        expect(result[1].user_name).toEqual('Caster');
        expect(result[1].first_name).toEqual('Azmi');
        expect(result[1].last_name).toEqual('Osman');
    });
    it('shows a user with the show method', async () => {
        let result = await store.show(user1.id as unknown as string);
        if (Array.isArray(result)) {
            result = result[0];
        }
        expect(result.user_name).toEqual('Typhon');
        expect(result.first_name).toEqual('Ashraf');
        expect(result.last_name).toEqual('Sayed');
    });
    it('validates the user with the authenticate method', async () => {
        const result = await store.authenticate('Typhon', 'Anypassword');
        expect(result).not.toBeNull();
        if (result) {
            expect(result.user_name).toEqual('Typhon');
            expect(result.first_name).toEqual('Ashraf');
            expect(result.last_name).toEqual('Sayed');
        }
    });
    it('rejects the user with the authenticate method', async () => {
        const result = await store.authenticate('Bob', 'LeelooDallasMultipass');
        expect(result).toBeNull();
    });
    it('deletes a user with the delete method', async () => {
        await store.delete(user1.id as unknown as string);
        const result = await store.index();
        expect(result.length).toEqual(1);
        expect(result[0].user_name).toEqual('Caster');
        expect(result[0].first_name).toEqual('Azmi');
        expect(result[0].last_name).toEqual('Osman');
    });
    it('deletes all users with the deleteAll method', async () => {
        await store.deleteAll();
        const result = await store.index();
        expect(result.length).toEqual(0);
    });
    afterAll(async () => {
        await store.deleteAll();
    });
});
