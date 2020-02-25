const express = require('express');
const Cloudant = require('@cloudant/cloudant');

const radiansToDegrees = require('../../src/geographic-calculations');
const degreesToRadians = require('../../src/geographic-calculations');

const getAirportsRouter = express.Router();

getAirportsRouter.post('/airports', async (req, res) => {
    try {
        const lat = req.body.lat;
        const lon = req.body.lon;
        const rad = req.body.rad;
        const R = 6371.01; // Earth's radius in km

        const maxLat = lat + radiansToDegrees(rad/R);
        const minLat = lat - radiansToDegrees(rad/R);
        const maxLon = lon + radiansToDegrees(Math.asin(rad/R) / Math.cos(degreesToRadians(lat)));
        const minLon = lon - radiansToDegrees(Math.asin(rad/R) / Math.cos(degreesToRadians(lat)));

        const airportDb = Cloudant({ url: 'https://mikerhodes.cloudant.com/'})
            .db.use('airportdb');

       await airportDb.search('view1', 'geo', { q: `lat:[${minLat} TO ${maxLat}] AND lon:[${minLon} TO ${maxLon}]` }, (err, result) => {
            if (err) {
                throw err;
            }

            console.log('Showing %d out of a total %d results', result.rows.length, result.total_rows);
            for (let i = 0; i < result.rows.length; i++) {
                console.log('Document fields: %s', result.rows[i].fields);
            }
           res.send(result);
        });

    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = getAirportsRouter;
