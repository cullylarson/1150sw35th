const {validate, customMessages} = require('@common/lib/validate')
const validateNotEmpty = require('@common/lib/validators/validateNotEmpty')

const validateGeneral = (pool, id, params) => {
    return validate([
    ], {
        name: [validateNotEmpty],
        email: [validateNotEmpty],
    }, params)
}

const validateAdd = (pool, params) => {
    return validateGeneral(pool, undefined, params)
}

module.exports = {
    validateAdd,
}
