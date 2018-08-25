const {curry} = require('ramda')
const {messageObj} = require('@app/lib/messages')

module.exports = curry((smallest, largest, value, params) => {
    return value < smallest || value > largest
        ? Promise.resolve(messageObj('too-small', `Please provide a value between ${smallest} and ${largest}.`))
        : Promise.resolve(null)
})
