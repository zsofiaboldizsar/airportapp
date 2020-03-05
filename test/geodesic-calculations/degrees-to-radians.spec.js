const {assert} = require('chai');
const {describe} = require('mocha');

const degreesToRadians = require('../../src/geodesic-calculations/degrees-to-radians');

describe('degreesToRadians', () => {
    it('should convert degrees to radians', () => {
        const expectedResult = 0.7853981633974483;
        const actualResult = degreesToRadians(45);

        assert.equal(actualResult, expectedResult);
    });
});
