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
    describe('api/topics - Method errors', () => {
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
    it('GET /api/articles/:article_id should respond with a 200 error code and a response object of an article with the specified properties', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
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
    it('GET /api/articles/235 should return a 404 error code and a message', () => {
      return request(app)
        .get('/api/articles/235')
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Article not found');
        });
    });
    describe('PATCH', () => {
      it('PATCH /api/articles/:article_id takes an input of an object and responds with an error code of 200 and an updated article in relation to the passed in object: { inc_votes: 1}', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.article.votes).to.eql(101);
          });
      });
      it('PATCH /api/articles/:article_id takes an input of an object and responds with an error code of 200 and an updated article in relation to the passed in object: { inc_votes: 1}', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: -100 })
          .expect(200)
          .then(({ body }) => {
            expect(body.article.votes).to.eql(0);
          });
      });
      it('PATCH /api/articles/invalidid should return a 400 error code and message of "Bad request"', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 'cat' })
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.equal(
              'invalid input syntax for integer: "NaN"'
            );
          });
      });
      describe('/api/articles/:article_id - Method errors', () => {
        it('Unspecified methods should return a status 405 error', () => {
          const invalidMethods = ['put', 'delete'];
          const returnError = invalidMethods.map(method => {
            return request(app)
              [method]('/api/articles/:article_id')
              .expect(405);
          });
          return Promise.all(returnError);
        });
      });
    });
  });
  describe('POST', () => {
    it('/api/articles/1/comments should return a status 201 and the posted comment', () => {
      return request(app)
        .post('/api/articles/1/comments')
        .send({
          username: 'butter_bridge',
          body: 'This is a comment'
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment.body).to.equal('This is a comment');
          expect(body.comment.author).to.equal('butter_bridge');
          expect(body.comment.article_id).to.equal(1);
          expect(body.comment).to.have.all.keys(
            'comment_id',
            'author',
            'article_id',
            'votes',
            'created_at',
            'body'
          );
        });
    });
    describe('/api/articles/1/comments - Method errors', () => {
      it('Unspecified methods should return a status 405 error', () => {
        const invalidMethods = ['patch', 'put', 'delete'];
        const returnError = invalidMethods.map(method => {
          return request(app)
            [method]('/api/articles/1/comments')
            .expect(405);
        });
        return Promise.all(returnError);
      });
    });
    it('POST api/articles/1/comments responds with a 404 error code and a message if incorrect route is passed', () => {
      return request(app)
        .get('/api/articles/1/wrongname')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Route not found');
        });
    });
  });
  describe('GET /api/articles/:article_id/comments', () => {
    it('GET /api/articles/:article_id/comments should return an array of comments for the passed in article_id', () => {
      return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0]).to.have.keys(
            'article_id',
            'comment_id',
            'votes',
            'created_at',
            'author',
            'body'
          );
          expect(body.comments[0]).to.be.an('Object');
          expect(body.comments).to.be.an('Array');
        });
    });
  });
  describe('GET /api/articles/', () => {
    it('GET api/articlesssss should return an status code of 404 and a message', () => {
      return request(app)
        .get('/api/articlesssss')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Route not found');
        });
    });
    it('GET /api/articles/ should return an status code of 200 and an array of all the articles from the provided endpoint', () => {
      return request(app)
        .get('/api/articles/')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('Array');
          expect(body.articles[0]).to.be.an('Object');
          expect(body.articles[0]).to.have.keys(
            'author',
            'title',
            'article_id',
            'topic',
            'created_at',
            'votes',
            'comment_count'
          );
        });
    });
  });
});
