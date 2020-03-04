const delay = require('delay');

const {getInstance} = require('../src/cloudant/get-cloudant-instance');

class AirportDatabase {
    cloudant;

    constructor(dbName) {
        this.dbName = dbName;
        this.cloudant = getInstance();
    }

    async rawSearch(designDoc, index, params) {
        const db = this.cloudant.db.use(this.dbName);

        return db.search(designDoc, index, params);
    }

    async fullSearch(designDoc, index, params) {

        const limit = params.limit || 25;
        let resultData = await this.rawSearch(designDoc, index, params);
        const resultDocuments = resultData.rows;

        while (resultData.bookmark && resultData.rows.length === limit) {
            await delay(500);
            const paramsWithBookmarks = {...params, bookmark: resultData.bookmark};
            resultData = await this.rawSearch(designDoc, index, paramsWithBookmarks);
            resultDocuments.push(...resultData.rows);

        }

        return Promise.resolve(resultDocuments);
    }
}

module.exports = AirportDatabase;
