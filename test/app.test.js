'use strict';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App', () => {
  it('returns 400 if input is blank, with msg \'invalid request\'', ()=> {
    return supertest(app)
      .get('/frequency')
      .expect(400, 'Invalid request');
  });

  it('returns count: 1 when given aA', ()=> {
    return supertest(app)
      .get('/frequency')
      .query({ s: 'aA' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.have.property('count', 1);
      });
  });

  it('returns average: 5 when given aaVVAAvvaa', () => {
    return supertest(app)
      .get('/frequency')
      .query({ s: 'Dffppo'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.have.property('average', 1.5);
      });
  });
  
  it(`returns highest:'C' when given 'abcC'`, () => {
    return supertest(app)
      .get('/frequency')
      .query({ s: 'abcC'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res=> {
        expect(res.body).to.have.property('highest', 'c');
      });
  });

  it(`returns accurate number of object keys; given 'abc', should return 6`, ()=> {
    return supertest(app)
      .get('/frequency')
      .query({ s: 'abc'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res=> {
        expect(Object.keys(res.body)).to.have.lengthOf(6);
      });
  });

});