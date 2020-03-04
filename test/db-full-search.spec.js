const assert = require('chai').assert;
const describe = require('mocha').describe;
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
});
