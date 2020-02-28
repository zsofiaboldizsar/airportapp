const express = require('express');

const airportDb = require('../../src/connect-to-db');
const radiansToDegrees = require('../geodesic-calculations/radians-to-degree');
const degreesToRadians = require('../geodesic-calculations/degrees-to-radians');
const calculateGreatCircleDistance = require('../geodesic-calculations/calculate-great-circle-distance');

const getAirportsRouter = express.Router();

getAirportsRouter.post('/airports', async (req, res) => {
    try {
        const lat = parseInt(req.body.lat);
        const lon = parseInt(req.body.lon);
        const rad = parseInt(req.body.rad);

        const R = 6371.01;
        const r = radiansToDegrees(rad / R);
        const deltaLon = radiansToDegrees(Math.asin(Math.sin(r) / Math.cos(degreesToRadians(lat)))); // asin(sin(r)/cos(lat))

        // bounding box in degrees
        const maxLat = lat + r;
        const minLat = lat - r;
        const maxLon = lon + deltaLon;
        const minLon = lon - deltaLon;
        console.log(maxLat, minLat, maxLon, minLon);

        const maxDistance = calculateGreatCircleDistance(lat, maxLat, lon, maxLon);
        console.log('max distance: ', maxDistance);

        const params = {
            q: `lat:[${minLat} TO ${maxLat}] AND lon:[${minLon} TO ${maxLon}]`,
            limit: 200
        };
        await airportDb.search('view1', 'geo', params)
            .then(result => {

                let airportsWithinRad = [];
                console.log('Showing %d out of a total %d results', result.rows.length, result.total_rows);
                for (let i = 0; i < result.rows.length; i++) {
                    let airportField = result.rows[i].fields;
                    let latInDb = airportField.lat;
                    let lonInDb = airportField.lon;

                    let distance = calculateGreatCircleDistance(lat, latInDb, lon, lonInDb);

                    if (distance <= maxDistance)
                        airportsWithinRad.push({airportField, distance});

                }
                console.log(airportsWithinRad.length);
                res.send(airportsWithinRad);
            });

    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = getAirportsRouter;


