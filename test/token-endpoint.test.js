/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
const knex = require('knex');
const app = require('../src/app');
const helper = require('./helper');

describe('token endpoint', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect db', () => db.destroy());

  before('cleanup', () => db('thoughts').truncate());

  afterEach('cleanup', () => db('thoughts').truncate());

  describe('POST /token', () => {
    it('responds with json web token', () => {
      return supertest(app)
        .post('/token')
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.property('token');
        });
    });
  });

  describe('protected enpoints', () => {
    beforeEach('add thoughts', () => {
      return helper.seedThoughts(db, helper.makeThoughts());
    });

    context('with no bearer token', () => {
      it('responds with 401 for POST /thoughts', () => {
        return supertest(app)
          .post('/thoughts')
          .send(helper.makeThoughts()[0])
          .expect(401)
          .then((res) => {
            expect(res.text).to.eql('No token provided');
          });
      });

      it('responds with 401 for PATCH /thoughts/thoughtId', () => {
        return supertest(app)
          .patch('/thoughts/1')
          .send(helper.makeThoughts()[0])
          .expect(401)
          .then((res) => {
            expect(res.text).to.eql('No token provided');
          });
      });

      it('responds with 401 for DELETE /thoughts/thoughtId', () => {
        return supertest(app)
          .delete('/thoughts/1')
          .expect(401)
          .then((res) => {
            expect(res.text).to.eql('No token provided');
          });
      });
    });

    context('with incorrect token', () => {
      it('responds with 401 for POST /thoughts', () => {
        return supertest(app)
          .post('/thoughts')
          .set('Authorization', `Bearer ${helper.makeToken('very-not-real-user-id')}`)
          .send(helper.makeThoughts()[0])
          .expect(400)
          .then((res) => {
            expect(res.text).to.eql('Thought must contain a user id');
          });
      });

      it('responds with 401 for PATCH /thoughts/thoughtId', () => {
        return supertest(app)
          .patch('/thoughts/1')
          .set('Authorization', `Bearer ${helper.makeToken('very-not-real-user-id')}`)
          .send(helper.makeThoughts()[0])
          .expect(401)
          .then((res) => {
            expect(res.text).to.eql('You can\'t modify others\' thoughts...');
          });
      });

      it('responds with 401 for DELETE /thoughts/thoughtId', () => {
        return supertest(app)
          .delete('/thoughts/1')
          .set('Authorization', `Bearer ${helper.makeToken('very-not-real-user-id')}`)
          .expect(401)
          .then((res) => {
            expect(res.text).to.eql('You can\'t modify others\' thoughts...');
          });
      });
    });
  });
});
