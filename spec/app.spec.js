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

  it('Api router status 200 message', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).to.equal('You have reached the api router');
      });
  });
  describe('GET /api/topics', () => {
    describe('Method errors', () => {
      it('Unspecified methods should return a status 405 error', () => {
        const invalidMethods = ['patch', 'put', 'delete'];
        const returnError = invalidMethods.map(method => {
          return request(app)
            [method]('/api/topics')
            .expect(405);
        });
        return Promise.all(returnError);
      });
    });
    it('GET /api/topics respond with a 200 error code and a response object with a suitable key name', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.be.an('object');
          expect(body.topics[0]).to.have.keys('description', 'slug');
        });
    });
    it('GET api/topicss responds with a 404 error code and a message', () => {
      return request(app)
        .get('/api/topicss')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Route not found');
        });
    });
  });

  describe('GET /api/users/:username', () => {
    describe('Method errors', () => {
      it('Unspecified methods should return a status 405 error', () => {
        const invalidMethods = ['patch', 'put', 'delete'];
        const returnError = invalidMethods.map(method => {
          return request(app)
            [method]('/api/users/:username')
            .expect(405);
        });
        return Promise.all(returnError);
      });
    });
    it('GET /api/users/:username responds with a 200 error code and a response object of desired username', () => {
      return request(app)
        .get('/api/users/butter_bridge')
        .expect(200)
        .then(({ body }) => {
          expect(body.user).to.be.an('object');
          expect(body.user).to.have.keys('username', 'avatar_url', 'name');
        });
    });

    it('GET /api/users/:username should respond with a 200 error code and relevant keys', () => {
      return request(app)
        .get('/api/users/icellusedkars')
        .expect(200)
        .then(({ body }) => {
          expect(body.user).to.have.keys('username', 'avatar_url', 'name');
        });
    });
    it('GET /api/users/mickeymouse will return a status 404 and an error message', () => {
      return request(app)
        .get('/api/users/mickeymouse')
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Username not found');
        });
    });
  });
  describe('GET /api/articles/:article_id', () => {
    // it('GET /api/articles', () => {
    //   return request(app)
    //     .get('/api/articles')
    //     .expect(200)
    //     .then(({ body }) => {
    //       console.log(body.articles);
    //       expect(body.articles).to.be.an('Array');
    //     });
    // });
    it('GET /api/articles/:article_id should respond with a 200 error code and a response object of an article with the specified properties', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          console.log(body.article);
          expect(body.article).to.be.an('Object');
          expect(body.article).to.have.keys(
            'article_id',
            'title',
            'body',
            'votes',
            'topic',
            'author',
            'created_at',
            'comment_count'
          );
          expect(body.article.article_id).to.equal(1);
        });
    });
  });
});
