process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiSorted = require('chai-sorted');
chai.use(chaiSorted);
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
});
describe('GET /api/topics', () => {
  it('GET status 200 responds with an error code and a response object with a suitable key name', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics[0]).to.be.an('object');
        expect(body.topics[0]).to.have.keys('description', 'slug');
      });
  });
  it('GET status 404 responds with an error code and a message', () => {
    return request(app)
      .get('/api/topicss')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal('Route not found');
      });
  });
});
describe('GET /api/users/:username', () => {
  it('GET status 200 responds with an error code and a response object of desired username', () => {
    return request(app)
      .get('/api/users/butter_bridge')
      .expect(200)
      .then(({ body }) => {
        console.log(body.users[0]);
        expect(body.users[0]).to.be.an('object');
      });
  });
});
