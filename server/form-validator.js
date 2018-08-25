const {validate, customMessages} = require('@app/lib/validate')
const validateNotEmpty = require('@app/lib/validators/validateNotEmpty')
const validateEmail = require('@app/lib/validators/validateEmail')

const validateGeneral = (pool, id, params) => {
    return validate([
    ], {
        name: [validateNotEmpty],
        email: [validateNotEmpty, validateEmail],
    }, params)
}

const validateAdd = (pool, params) => {
    return validateGeneral(pool, undefined, params)
}

module.exports = {
    validateAdd,
}
