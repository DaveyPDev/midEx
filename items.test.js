process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');
let items = require('./fakeDb');
let item = { name: 'PTCGETB', price: 50.0 };

beforeEach(async () => {
	items.push(item);
});

afterEach(async () => {
	items = [];
});

describe('GET /items', () => {
	test('Get all items', async () => {
		const res = await request(app).get('/items');
		const { items } = res.body;
		expect(res.statusCode).toBe(200);
		expect(items).toHaveLength(1);
	});
});

describe('GET /items/:name', () => {
	test('Get item by name', async () => {
		const res = await request(app).get(`/items/${item.name}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.item).toEqual(item);
	});
	test('Responds with 404 unknown item', async () => {
		const res = await request(app).get(`/items/0`);
		expect(res.statusCode).toBe(404);
	});
});

describe('POST /items', () => {
	test('Add New Item', async () => {
		const res = await request(app).post('/items').send({ name: 'PTCGPCETB', price: 65.0 });

		expect(res.statusCode).toBe(201);
		expect(res.body.item).toHaveProperty('name');
		expect(res.body.item).toHaveProperty('price');
		expect(res.body.item.name).toEqual('PTCGPCETB');
		expect(res.body.item.price).toEqual(65.0);
	});
});

describe('/PATCH /items/:name', () => {
	test('Updating an item', async () => {
		const res = await request(app).patch(`/items/${item.name}`).send({ name: 'ETB' });
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ item: { name: 'ETB', price: 50 } });
	});

	test('404 Cannot Find item', async () => {
		const res = await request(app).patch('/items/0');
		expect(res.statusCode).toBe(404);
	});
});

describe('/DELETE /items/:name', () => {
	test('Deleting an item', async () => {
		const res = await request(app).delete(`/items/${item.name}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ msg: 'Deleted' });
	});
	// test('404 for deleting invalid item', async () => {
	// 	const res = await request(app).delete(`/items/Blister`);
	// 	expect(res.statusCode).toBe(404);
	//   expect(res.body).toEqual({ msg: 'Deleted'})
	// });
});
