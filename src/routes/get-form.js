const express = require('express');
const {check, validationResult, matchedData} = require('express-validator');

const getFormRouter = express.Router();

getFormRouter.get('/', (req, res) => {
    res.render('index', {
        data: {},
        errors: [],
        errorMap: {},
    });
});

getFormRouter.post('/', [
    check('lat')
        .isLength({min: 1})
        .withMessage('Required'),
    check('lon')
        .isLength({min: 1})
        .withMessage('Required')
        .bail(),
    check('rad')
        .isLength({min: 1})
        .withMessage('Required')
        .bail(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('index', {
            data: req.body,
            errors: errors.array(),
            errorMap: errors.mapped(),
        });
    }


    const data = matchedData(req);
    console.log('Sanitized:', data);

});

module.exports = getFormRouter;
