function isNumber(value) {
    return typeof (value) === 'number' && !isNaN(value) && isFinite(value);
}

module.exports = isNumber;
