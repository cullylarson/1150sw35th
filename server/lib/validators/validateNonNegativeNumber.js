const {curry} = require('ramda')
const {messageObj} = require('@app/lib/messages')

module.exports = curry((value, params) => {
    return value < 0
        ? Promise.resolve(messageObj('is-negative', 'Please provide a positive number or zero.'))
        : Promise.resolve(null)
})
