/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
const knex = require('knex');
const http = require('http');
const { Server } = require('ws');
const app = require('../src/app');
const helper = require('./helper');

describe('thoughts endpoint', () => {
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

  describe('GET /thoughts', () => {
    context('Given no thoughts', () => {
      it('responds with an empty array', () => {
        return supertest(app)
          .get('/thoughts')
          .expect(200, []);
      });
    });

    context('Given thoughts', () => {
      beforeEach('add thoughts', () => {
        return helper.seedThoughts(db, helper.makeThoughts());
      });

      it('responds with first 20 thoughts or less', () => {
        return supertest(app)
          .get('/thoughts')
          .expect(200, helper.makeThoughts())
          .then((res) => {
            expect(res.body).to.have.lengthOf.below(20);
          });
      });

      it('responds with user-specific thoughts', () => {
        return supertest(app)
          .get('/thoughts')
          .query({ userId: helper.USER })
          .expect(200, helper.makeThoughts().filter((thought) => thought.user_id === helper.USER));
      });
    });
  });

  describe('GET /thoughts/:thoughtId', () => {
    context('Given no thoughts', () => {
      it('responds with a 404 if thought doesn\'t exist', () => {
        return supertest(app)
          .get('/thoughts/333')
          .expect(404);
      });
    });

    context('Given thoughts', () => {
      beforeEach('add thoughts', () => {
        return helper.seedThoughts(db, helper.makeThoughts());
      });

      it('responds with the requested thought', () => {
        return supertest(app)
          .get('/thoughts/3')
          .expect(200, helper.makeThoughts().find((thought) => thought.id === 3));
      });
    });
  });

  describe('POST /thoughts', () => {
    let wss;
    beforeEach('setup websocket', () => {
      const server = http.createServer(app);
      wss = new Server({ server });

      app.set('websocket', wss);
    });

    context('Given no thoughts', () => {
      it('creates a new thought', () => {
        const newThought = {
          userId: helper.USER,
          content: 'It\'s a beautiful thing, the destruction of words.',
        };
        return supertest(app)
          .post('/thoughts')
          .set('Authorization', `Bearer ${helper.makeToken(helper.USER)}`)
          .send(newThought)
          .expect(201)
          .then((res) => {
            expect(res.body).to.have.property('id');
            expect(res.body.content).to.eql(newThought.content);
            expect(res.body.userId).to.eql(newThought.user_id);
            return supertest(app)
              .get(`/thoughts/${res.body.id}`)
              .expect(200, res.body);
          });
      });

      it.skip('sends new thoughts over socket connection', () => {
        const newThought = {
          userId: helper.USER,
          content: 'It\'s a beautiful thing, the destruction of words.',
        };
        supertest(app)
          .post('/thoughts')
          .set('Authorization', `Bearer ${helper.makeToken(helper.USER)}`)
          .send(newThought)
          .expect(201);

        return wss.on('message', () => { });
      });
    });
  });

  describe('PATCH /thoughts/:thoughtId', () => {
    context('Given no thoughts', () => {
      it('responds with a 404 if thought doesn\'t exist', () => {
        return supertest(app)
          .patch('/thoughts/333')
          .expect(404);
      });
    });

    context('Given thoughts', () => {
      beforeEach('add thoughts', () => {
        return helper.seedThoughts(db, helper.makeThoughts());
      });

      it('responds with the updated thought', () => {
        const updatedThought = {
          userId: helper.USER,
          content: 'It\'s a beautiful thing, the destruction of words.',
        };
        return supertest(app)
          .patch('/thoughts/1')
          .set('Authorization', `Bearer ${helper.makeToken(helper.USER)}`)
          .send(updatedThought)
          .expect(200)
          .then((res) => {
            expect(res.body.id).to.eql(1);
            expect(res.body.content).to.eql(updatedThought.content);
            expect(res.body.user_id).to.eql(updatedThought.userId);
            return supertest(app)
              .get(`/thoughts/${res.body.id}`)
              .expect(200, res.body);
          });
      });
    });
  });

  describe('DELETE /thoughts/:thoughtId', () => {
    context('Given no thoughts', () => {
      it('responds with a 404 if thought doesn\'t exist', () => {
        return supertest(app)
          .delete('/thoughts/333')
          .expect(404);
      });
    });

    context('Given thoughts', () => {
      beforeEach('add thoughts', () => {
        return helper.seedThoughts(db, helper.makeThoughts());
      });

      it('deletes the thought and responds with 204', () => {
        return supertest(app)
          .delete('/thoughts/1')
          .set('Authorization', `Bearer ${helper.makeToken(helper.USER)}`)
          .expect(204);
      });
    });
  });
});
