const describe = require('mocha').describe;
const request = require('supertest');
const {expect} = require('chai');
const {createSandbox} = require('sinon');

const app = require('../../app');
const AirportDatabase = require('../../src/db-full-search');

describe('postAirportsRouter', () => {

    let airportDatabaseStub;
    let sandbox;
    const testReqBody = {lat: '44', lon: '55', rad: '400'};
    const dbResult = {rows: [{id: 'aa'}, {id: 'ab'}]};

    beforeEach(() => {
        sandbox = createSandbox();
        airportDatabaseStub = sandbox.stub(AirportDatabase.prototype, 'fullSearch');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should send airports to the client', done => {
        airportDatabaseStub.resolves(dbResult);

        request(app)
            .post('/airports')
            .send(testReqBody)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                const result = res.body;
                expect(airportDatabaseStub.calledOnce);
                expect(result.body, dbResult);
                done();
            });
    });

    it('should return 404 if no results found', done => {
        airportDatabaseStub.resolves(dbResult);

        request(app)
            .post('/airports')
            .send(testReqBody)
            .expect(404)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                const result = res.body;
                expect(airportDatabaseStub.calledOnce);
                expect(result.message.startsWith(`Sorry, we couldn't find any`))
                done();
            });
    });


    it('should return 500', done => {
        airportDatabaseStub.rejects({statusCode: 500});

        request(app)
            .post('/airports')
            .send(testReqBody)
            .expect(500, done);
    });
});
