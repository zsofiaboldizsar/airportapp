const express = require('express');

const AirportDatabase = require('../db-full-search');
const radiansToDegrees = require('../geodesic-calculations/radians-to-degree');
const degreesToRadians = require('../geodesic-calculations/degrees-to-radians');
const calculateGreatCircleDistance = require('../geodesic-calculations/calculate-great-circle-distance');

const getAirportsRouter = express.Router();

getAirportsRouter.post('/airports', async (req, res) => {
    try {
        const lat = parseInt(req.body.lat);
        const lon = parseInt(req.body.lon);
        const rad = parseInt(req.body.rad);

        const r = radiansToDegrees(rad / 6371.01);
        const latInDegrees = degreesToRadians(lat);
        const deltaLon = radiansToDegrees(Math.asin(Math.sin(r) / Math.cos(latInDegrees))); // asin(sin(r)/cos(lat))
        console.log(`deltalon: ${deltaLon}`);

        // bounding box in degrees
        const maxLat = lat + r;
        const minLat = lat - r;
        const maxLon = lon + deltaLon;
        const minLon = lon - deltaLon;
        console.log(maxLat, minLat, maxLon, minLon);

        const maxDistance = calculateGreatCircleDistance(lat, maxLat, lon, maxLon);
        console.log('max distance: ', maxDistance);

        // DB search
        const params = {
            q: `lat:[${minLat} TO ${maxLat}] AND lon:[${minLon} TO ${maxLon}]`,
            limit: 200
        };
        const airportDatabase = new AirportDatabase('airportdb');
        const result = await airportDatabase.fullSearch('view1', 'geo', params)
            .then(result => {
                console.log(`Total results: ${result.length}`);
                return result;
            });

        const airportsWithinDistance = [];
        for (const row of result) {
            let airportField = row.fields;
            let latInDb = airportField.lat;
            let lonInDb = airportField.lon;

            let distance = calculateGreatCircleDistance(lat, latInDb, lon, lonInDb);

            if (distance <= maxDistance)
                airportsWithinDistance.push({airportField, distance});

        }
        console.log(`Within distance: ${airportsWithinDistance.length}`);
        res.send(airportsWithinDistance.sort((a, b) => a.distance - b.distance));

    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = getAirportsRouter;


