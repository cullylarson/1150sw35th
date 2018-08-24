const R = require('ramda')
const {map, get, toInt} = require('@common/lib/f')
const {messageObj} = require('@common/lib/messages')
const {query} = require('@common/lib/mysql')

module.exports = R.curry((pool, tableName, idColumnName, ignoreId, paramNameToColumnName, _, params) => {
    const whereInfo = R.compose(
        xs => {
            return ignoreId === undefined
                ? xs
                : [...xs, [
                    `${idColumnName} != ?`,
                    ignoreId,
                ]]
        },
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
        .then(get(['results', 0, 'count'], 1))
        .then(toInt(1))
        .then(count => {
            return count > 0
                ? messageObj('is-duplicate', 'This entry already exists.')
                : null
        })
})
