'use strict';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello express!');
  });
});

describe('GET /sum', () => {
  it('8/4 should be 2', ()=> {
    return supertest(app)
      .get('/sum')
      .query({a: 8, b: 4})
      .expect(200, '8 divided by 4 is 2');
  });

  it(`should return 400 if 'a' is missing.`, ()=> {
    return supertest(app)
      .get('/sum')
      .query({b: 4})
      .expect(400, 'Value for a is needed');
  });

  it(`should return 400 if 'b' is missing.`, () => {
    return supertest(app)
      .get('/sum')
      .query({ a:4 })
      .expect(400, 'Value for b is needed'); 
  });

  it(`should return 400 if 'a' is not of type number.`, ()=>{
    return supertest(app)
      .get('/sum')
      .query({ a:'b', b:4 })
      .expect(400, 'Value for a must be numeric');
  });

  it(`should return 400 if 'b' is not of type number`, ()=> {
    return supertest(app)
      .get('/sum')
      .query({ a: 4, b: 'a'})
      .expect(400, 'Value for b must be numeric');
  });

});