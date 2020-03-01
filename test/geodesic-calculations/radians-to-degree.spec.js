const assert = require('chai').assert;
const describe = require('mocha').describe;

const radiansToDegrees = require('../../src/geodesic-calculations/radians-to-degree');

describe('radiansToDegrees', () => {
    it('should convert radians to degrees', () => {
        const expectedResult = 45;
        const actualResult = radiansToDegrees(0.7853981633974483);

        assert.equal(actualResult, expectedResult);
    });
});
