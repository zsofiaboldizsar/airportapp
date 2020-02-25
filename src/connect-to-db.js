const Cloudant = require('@cloudant/cloudant');

const airportDb = Cloudant({ url: 'https://mikerhodes.cloudant.com/'})
    .db.use('airportdb');

airportDb.search('view1', 'geo', { q: 'lon:[0 TO 50] AND lat:[0 TO 20]' }, (err, result) => {
    if (err) {
        throw err;
    }

    // console.log('Showing %d out of a total %d results', result.rows.length, result.total_rows);
    // for (let i = 0; i < result.rows.length; i++) {
    //     console.log('Document fields: %s', result.rows[i].fields);
    // }
});

module.exports = airportDb;
