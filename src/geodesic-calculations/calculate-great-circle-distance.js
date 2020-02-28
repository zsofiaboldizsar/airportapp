function calculateGreatCircleDistance(lat1, lat2, lon1, lon2) {
    const earthRadius = 6371.01;

    return Math.acos(Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.cos(lon1 - (lon2))) * earthRadius;
}

module.exports = calculateGreatCircleDistance;
