const express = require('express');

const AirportDatabase = require('../db-full-search');
const radiansToDegrees = require('../geodesic-calculations/radians-to-degree');
const degreesToRadians = require('../geodesic-calculations/degrees-to-radians');
const calculateGreatCircleDistance = require('../geodesic-calculations/calculate-great-circle-distance');
const {formValidationRules, validate} = require('./validator');

const postAirportsRouter = express.Router();

postAirportsRouter.post('/airports', formValidationRules(), validate, async (req, res) => {
    try {
        const lat = parseInt(req.body.lat);
        const lon = parseInt(req.body.lon);
        const rad = parseInt(req.body.rad);

        if (lat < -90 || lat > 90)
            return res.status(409).json({message: 'Latitude must be a number between -90.00 and 90.00'});
        if (lon < -180 || lon > 180)
            return res.status(409).json({message: 'Longitude must be a number between -180.00 and 180.00'});

        const latInDegrees = degreesToRadians(lat);
        const deltaLon = radiansToDegrees(Math.asin(Math.sin(rad / 6371.01) / Math.cos(latInDegrees)));
        const r = radiansToDegrees(rad / 6371.01);

        // bounding box in degrees
        const maxLat = lat + r;
        const minLat = lat - r;
        const maxLon = lon + deltaLon;
        const minLon = lon - deltaLon;

        const maxDistance = calculateGreatCircleDistance(lat, maxLat, lon, maxLon);

        // DB search
        const params = {
            q: `lat:[${minLat} TO ${maxLat}] AND lon:[${minLon} TO ${maxLon}]`,
            limit: 200
        };
        const airportDatabase = new AirportDatabase('airportdb');
        const result = await airportDatabase.fullSearch('view1', 'geo', params);

        const airportsWithinDistance = [];
        for (const row of result) {
            let airportField = row.fields;
            let latInDb = airportField.lat;
            let lonInDb = airportField.lon;

            let distance = calculateGreatCircleDistance(lat, latInDb, lon, lonInDb);

            if (distance <= maxDistance)
                airportsWithinDistance.push({airportField, distance});
        }

        if (airportsWithinDistance.length < 1)
            return res.status(404).json({
                message: `Sorry, we couldn't find any airports for coordinates: 
            ${lat}, ${lon} and radius: ${rad}. Change your input and try again.`
            });

        return res.status(200).json(airportsWithinDistance.sort((a, b) => a.distance - b.distance));

    } catch (e) {
        return res.status(500).json(e);
    }
});

module.exports = postAirportsRouter;


