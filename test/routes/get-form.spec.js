const path = require('path');
const describe = require('mocha').describe;
const request = require('supertest');
const expect = require('chai').expect;
const pug = require('pug');
const sinon = require('sinon');
const app = require('../../app');

describe('getFormRouter', () => {

    const spy = sinon.spy(pug, '__express');

    it('should render the form', done => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(spy.calledWith(path.join(__dirname, '../src/views/index')));
                spy.restore();
                done();
            });
    });
});
