import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();
let product1: Product;
let product2: Product;

describe('Tests the Product Model', () => {
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
    it('adds a product with the create method', async () => {
        product1 = await store.create({
            name: 'Xbox',
            price: 650,
            category: 'Console'
        });
        expect(product1.name).toEqual('Xbox');
        expect(product1.price).toEqual(650);
        expect(product1.category).toEqual('Console');
        product2 = await store.create({
            name: 'Dell G15',
            price: 700,
            category: 'Laptops'
        });
        expect(product2.name).toEqual('Dell G15');
        expect(product2.price).toEqual(700);
        expect(product2.category).toEqual('Laptops');
    });
    it('edits a product with the edit method', async () => {
        const id = product2.id;
        product2 = await store.edit({
            id: id,
            name: 'Dell Inspiron',
            price: 350,
            category: 'Laptops'
        });
        expect(product2.name).toEqual('Dell Inspiron');
        expect(product2.price).toEqual(350);
        expect(product2.category).toEqual('Laptops');
    });
    it('returns a list of all products with the index method', async () => {
        const result = await store.index();
        expect(result.length).toEqual(2);
        expect(result[0].name).toEqual('Xbox');
        expect(result[0].price).toEqual(650);
        expect(result[0].category).toEqual('Console');
        expect(result[1].name).toEqual('Dell Inspiron');
        expect(result[1].price).toEqual(350);
        expect(result[1].category).toEqual('Laptops');
    });
    it('shows a product with the show method', async () => {
        let result = await store.show(product1.id as unknown as string);
        if (Array.isArray(result)) {
            result = result[0];
        }
        expect(result.name).toEqual('Xbox');
        expect(result.price).toEqual(650);
        expect(result.category).toEqual('Console');
    });
    it('deletes a product with the delete method', async () => {
        await store.delete(product1.id as unknown as string);
        const result = await store.index();
        expect(result.length).toEqual(1);
        expect(result[0].name).toEqual('Dell Inspiron');
        expect(result[0].price).toEqual(350);
        expect(result[0].category).toEqual('Laptops');
    });
    it('deletes all products with the deleteAll method', async () => {
        await store.deleteAll();
        const result = await store.index();
        expect(result.length).toEqual(0);
    });
    afterAll(async () => {
        await store.deleteAll();
    });
});
