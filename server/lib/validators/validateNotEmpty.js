const {curry} = require('ramda')
const {messageObj} = require('@app/lib/messages')

module.exports = curry((value, params) => {
    return value === '' || value === undefined || value === null || value === false
        ? Promise.resolve(messageObj('is-empty', 'Please provide a value.'))
        : Promise.resolve(null)
})
