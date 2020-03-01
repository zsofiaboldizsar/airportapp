const assert = require('chai').assert;
const describe = require('mocha').describe;

const calculateGreatCircleDistance = require('../../src/geodesic-calculations/calculate-great-circle-distance');

describe('calculateGreatCircleDistance', () => {
    it('should calculate the great circle distance between 2 points', () => {
        const lat1 = 45;
        const lat2 = -33;
        const lon1 = -120;
        const lon2 = 77;

        const expectedResult = 16439.563583569365;
        const actualResult = calculateGreatCircleDistance(lat1, lat2, lon1, lon2);

        assert.equal(actualResult, expectedResult);
    });
});
