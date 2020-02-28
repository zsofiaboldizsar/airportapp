// const Cloudant = require('@cloudant/cloudant');
//
// const airportDb = Cloudant({ url: 'https://mikerhodes.cloudant.com/'})
//     .db.use('airportdb');
//
// function fullSearch2(designDoc, index, params) {
//     const options = {
//         method: 'get',
//
//     };
//     airportDb.request();
// }
//
//
// async function search(designDoc, index, params) {
//
//     return this.rawSearch(designDoc, index, params)
//         .then((data) =>   Promise.resolve(data.rows.map((row) => row.doc)));
//
// }
//
// async function fullSearch(designDoc, index, params) {
//     const db = this.cloudant.db.use(this.dbName);
//
// const limit = params.limit || 25;
// let resultData = await this.rawSearch(designDoc, index, params);
// const resultDocuments = resultData.rows.map((row) => row.doc);
//
// while (resultData.bookmark && resultData.rows.length === limit) {
//     // await delay(500);
//     const paramsWithBookmarks = {...params, bookmark: resultData.bookmark};
//     resultData = await this.rawSearch(designDoc, index, paramsWithBookmarks);
//     resultDocuments.push(...resultData.rows.map((row) => row.doc));
//
// }
//
// return Promise.resolve(resultDocuments);
//
// }
