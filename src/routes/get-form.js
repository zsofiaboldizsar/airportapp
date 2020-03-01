const express = require('express');

const getFormRouter = express.Router();

getFormRouter.get('/', (req, res) => {
    res.render('index');
});

module.exports = getFormRouter;
