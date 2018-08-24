const {curry} = require('ramda')
const {messageObj} = require('@common/lib/messages')

module.exports = curry((value, params) => {
    const valueInt = Number.parseInt(value)
    const valueStr = value + ''
    const valueIntStr = valueInt + ''

    return Number.isNaN(valueInt) || valueStr !== valueIntStr
        ? Promise.resolve(messageObj('not-integer', 'Please provide an integer.'))
        : Promise.resolve(null)
})
