const request = require('supertest');
const app = require('../app');

const apiAuthController = require('./apiAuthController');
const userObj = {
    email: 'user@example.com',
    password: '1234'
}

describe('API Authentication', () => {
    it('should return an error if credentials are invalid', async () => {
        const res = await request(app)
            .post('/api/authenticate')
            .send({email: 'user@example.com', password: '1212'})
        expect(res.body).toHaveProperty('error')
    })
    it('should return an object with a token property', async () => {
        const res = await request(app)
            .post('/api/authenticate')
            .send(userObj)
        expect(res.body).toHaveProperty('token')
    })
    it('should return a token with the "typ": "JWT" key-value pair in its header', async() => {
        const res = await request(app)
            .post('/api/authenticate')
            .send(userObj)
        const token = res.body.token;
        const header = token.split('.')[0];
        const headerDecoded  = Buffer.from(header, 'base64').toString()
        const headerAsJSON = JSON.parse(headerDecoded)
        expect(headerAsJSON).toHaveProperty('typ')
    })
})