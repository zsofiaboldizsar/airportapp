/**
 * Calculations based on http://www.movable-type.co.uk/scripts/latlong-db.html
 */

const DEG2RAD = Math.PI / 180, // degrees to radian conversion
    RAD2DEG = 180 / Math.PI, // radians to degrees conversion
    MI2KM = 1.6093439999999999, // miles to kilometers conversion
    KM2MI = 0.621371192237334, // kilometers to miles conversion
    EARTH_RADIUS_KM = 6371.01, // Earth's radius in km
    EARTH_RADIUS_MI = 3958.762079, // Earth's radius in miles
    MAX_LAT = Math.PI / 2, // 90 degrees in radian
    MIN_LAT = -MAX_LAT, // -90 degrees in radian
    MAX_LON = Math.PI, // 180 degrees in radian
    MIN_LON = -MAX_LON, // -180 degrees radian
    FULL_CIRCLE_RAD = Math.PI * 2; // Full circle (360 degrees) in radian


function isNumber(value) {
    return typeof (value) === 'number' && !isNaN(value) && isFinite(value);
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function radiansToDegrees(radians) {
    return radians * (180/Math.PI);
}

function milesToKilometers(miles) {
    return miles * 1.6093439999999999;
}

function kilometersToMiles(kilometers) {
    return kilometers * 0.621371192237334;
}


module.exports = radiansToDegrees;
module.exports = degreesToRadians;
