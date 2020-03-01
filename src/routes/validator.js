const { body, validationResult } = require('express-validator');

const formValidationRules = () => {
    return [
        body('lat').isLength({min:1}).withMessage('Required').bail()
            .isDecimal({force_decimal: false, locale: "en-GB"}).withMessage('Must be a number between -90.00 and 90.00').bail(),

        body('lon').isLength({min:1}).withMessage('Required.').bail()
            .isDecimal({force_decimal: false, locale: "en-GB"}, ).withMessage('Must be a number between -180.00 and 180.00').bail(),

        body('rad').isLength({min:1}).withMessage('Required').bail()
            .isDecimal({force_decimal: false, locale: "en-GB"}).withMessage('Must be a number').bail(),
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    })
};

module.exports = {
    formValidationRules,
    validate,
};
