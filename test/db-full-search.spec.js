const {assert} = require('chai');
const {describe} = require('mocha');
const {createSandbox} = require('sinon');

const {releaseInstance} = require('../src/cloudant/get-cloudant-instance');
const AirportDatabase = require('../src/db-full-search');


describe('Airport db fullSearch', async () => {

    let airportDatabaseStub;
    let sandbox;

    beforeEach(() => {
        sandbox = createSandbox();
        airportDatabaseStub = sandbox.stub(AirportDatabase.prototype, 'rawSearch');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('rawSearch should be called once', () => {
        const queryParams = {
            q: `lat:[0 TO 20] AND lon:[20 TO $40]`,
            limit: 200
        };
        const designDoc = 'test1';
        const index = 'geo';

        AirportDatabase.prototype.rawSearch(designDoc, index, queryParams);

        sandbox.assert.calledOnce(airportDatabaseStub);
        airportDatabaseStub.calledWith(designDoc, index, queryParams);
    });

    it('fullSearch should be called twice', async () => {
        const firstResult = {
            total_rows: 201,
            bookmark: 'aaa',
            rows: [
                {id: 'a0487237c4362b941f7332d7eb768ba0'},
                {id: 'a0487237c4362b941f7332d7eb78bb55'},
            ],
        };
        const secondResult = {
            bookmark: 'bbb',
            rows: [
                {id: 'a0487237c4362b941f7332d7eb7645fe'},
            ],
        };
        airportDatabaseStub.onFirstCall().returns(firstResult);
        airportDatabaseStub.onSecondCall().returns(secondResult);

        releaseInstance();
        const airportDB = new AirportDatabase('airportdb');
        const queryParams = {
            q: 'lat:[0 TO 20] AND lon:[20 TO 40]',
            limit: 2
        };
        const result = await airportDB.fullSearch('view1', 'geo', queryParams);

        assert.equal(airportDatabaseStub.callCount, 2);
        assert.equal(airportDatabaseStub.returnValues[0], firstResult);
        assert.equal(airportDatabaseStub.returnValues[1], secondResult);
        assert.equal(result.length, 3);
        assert.equal(result[0], firstResult.rows[0]);
        assert.equal(result[1], firstResult.rows[1]);
        assert.equal(result[2], secondResult.rows[0]);

    }).timeout(15000);
});
