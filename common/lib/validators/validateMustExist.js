const R = require('ramda')
const {map, get, toInt} = require('@common/lib/f')
const {messageObj} = require('@common/lib/messages')
const {query} = require('@common/lib/mysql')

module.exports = R.curry((pool, tableName, paramNameToColumnName, _, params) => {
    const whereInfo = R.compose(
        R.values,
        map((columnName, paramName) => {
            return [
                `${columnName} = ?`, // the condition query
                params[paramName], // the value to fill in for the '?'
            ]
        })
    )(paramNameToColumnName)

    // nothing to check
    if(!whereInfo.length) return null

    const where = whereInfo.map(get(0, '')).join(' AND ')
    const values = whereInfo.map(get(1, ''))

    return query(pool, `SELECT COUNT(*) as count FROM ${tableName} WHERE ${where}`, values)
        .then(get(['results', 0, 'count'], 0))
        .then(toInt(0))
        .then(count => {
            return count === 0
                ? messageObj('not-found', 'The entry could not be found.')
                : null
        })
})
