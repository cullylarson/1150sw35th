const {curry} = require('ramda')
const {messageObj} = require('@app/lib/messages')

module.exports = curry((mustEqual, value, params) => {
    return mustEqual !== value
        ? Promise.resolve(messageObj('not-equal', 'The value you have provided is not valid.'))
        : Promise.resolve(null)
})
