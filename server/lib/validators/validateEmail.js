const {curry} = require('ramda')
const {messageObj} = require('@app/lib/messages')

module.exports = curry((value, params) => {
    return /^.+@.+\..+$/.test(value)
        ? Promise.resolve(null)
        : Promise.resolve(messageObj('not-valid', 'Please provide a valid email address.'))
})
