const Cloudant = require('@cloudant/cloudant');

let cloudantInstance;

function getInstance() {
    if (!cloudantInstance) {
        const config = { url: 'https://mikerhodes.cloudant.com/'}
        cloudantInstance = Cloudant(config);
    }

    return cloudantInstance;
}

function releaseInstance() {
    cloudantInstance = undefined;
}

module.exports = {
    getInstance,
    releaseInstance,
};
