const {curry} = require('ramda')
const {getOnly, map} = require('./f')

// keyDef looks like: [defaultValue, filterFunction]
const getParams = curry((keyDefs, x) => {
    const keyToDefaultValue = map((def) => def[0], keyDefs)

    const unfilteredValues = getOnly(keyToDefaultValue, x)

    return map((value, k) => keyDefs[k][1](value), unfilteredValues)
})

module.exports = {
    getParams,
}
