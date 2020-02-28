const Cloudant = require('@cloudant/cloudant');

const airportDb = Cloudant({ url: 'https://mikerhodes.cloudant.com/'})
    .db.use('airportdb');

module.exports = airportDb;
