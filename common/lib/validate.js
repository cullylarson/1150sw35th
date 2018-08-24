const R = require('ramda')
const {messageObj} = require('@common/lib/messages')
const {map, reduce, get, liftA} = require('@common/lib/f')
const {then, allP} = require('@common/lib/promise')

const validate = (generalValidators, paramValidators, params) => {
    const hasParamErrors = reduce((acc, results) => {
        // if acc is true, already found an error
        return acc || results.filter(x => x !== null).length > 0
    }, false)

    const validateOne = (validators, paramName) => {
        // need to be able to stop if a validator fails (i.e. don't continue validating)
        return validators
            // some validators might be null if set conditionally
            .filter(x => !!x)
            .reduce((accP, f) => {
                return accP.then(acc => {
                    if(acc.foundError) return Promise.resolve(acc)

                    return f(params[paramName], params)
                        .then(result => {
                            return result === null
                                ? {foundError: false, results: acc.results}
                                : {foundError: true, results: [...acc.results, ...liftA(result)]}
                        })
                })
            }, Promise.resolve({foundError: false, results: []}))
    }

    // all of the general validators will run, even if one fails
    const generalErrorsP = R.compose(
        // validators return null on success and a code on error
        then(R.filter(x => x !== null)),
        xs => Promise.all(xs),
        map(f => f(undefined, params)),
        // some validators might be null if set conditionally
        R.filter(x => !!x)
    )(generalValidators)

    const paramErrorsP = R.compose(
        then(map(get('results', []))),
        allP,
        map(validateOne)
    )(paramValidators)

    return R.compose(
        then(([generalErrors, paramErrors]) => {
            return {
                isValid: !(generalErrors.length || hasParamErrors(paramErrors)),
                errors: generalErrors,
                paramErrors,
            }
        }),
        allP
    )([generalErrorsP, paramErrorsP])
}

const customMessages = R.curry((customMessages, validator) => {
    // returns a validator that wraps the provided validator
    return R.curry((value, params) => {
        return validator(value, params)
            // returns an array of messages
            .then(messages => {
                const mapOne = message => {
                    return customMessages[message.code]
                        ? messageObj(message.code, customMessages[message.code])
                        : message
                }
                return messages === null
                    ? null
                    : Array.isArray(messages)
                        ? map(mapOne, messages)
                        : mapOne(messages)
            })
    })
})

module.exports = {
    validate,
    customMessages,
}
