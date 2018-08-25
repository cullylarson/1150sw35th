const R = require('ramda')
const {reduce, map, doesMap} = require('./f')

const then = R.curry((f, p) => p.then(f))

const thenMap = R.curry((f, p) => {
    return new Promise((resolve, reject) => {
        p
            .then(containedX => {
                // it doesn't map so it won't do anything, just resolve
                if(!doesMap(containedX)) {
                    resolve(containedX)
                }
                else {
                    // x is wrapped in a container, and f might return a promise. So mapping over
                    // x may return a promise inside the container. we need to get the
                    // promise out
                    R.map(x => {
                        const result = f(x)

                        if(result && result.then) {
                            result
                                // we want to resolve the value, not the promise.
                                // the value needs to be wrapped in the same container.
                                .then(y => resolve(containedX.constructor['fantasy-land/of'](y)))
                                .catch(err => reject(err))
                        }
                        else {
                            // the value needs to be wrapped in the same container.
                            resolve(containedX.constructor['fantasy-land/of'](result))
                        }
                    }, containedX)
                }
            })
            .catch(err => reject(err))
    })
})

const thenChain = R.curry((f, p) => {
    return new Promise((resolve, reject) => {
        p
            .then(containedX => {
                // it doesn't map so it won't do anything, just resolve
                if(!doesMap(containedX)) {
                    resolve(containedX)
                }
                else {
                    // x is wrapped in a container, and f might return a promise. So mapping over
                    // x may return a promise inside the container. we need to get the
                    // promise out
                    R.map(x => {
                        const result = f(x)

                        if(result && result.then) {
                            result
                                // we want to resolve the value, not the promise.
                                // no need to containe the value, it already is.
                                .then(y => resolve(y))
                                .catch(err => reject(err))
                        }
                        else {
                            // no need to containe the value, it already is.
                            resolve(result)
                        }
                    }, containedX)
                }
            })
            .catch(err => reject(err))
    })
})

const pCatch = R.curry((f, p) => p.catch(f))

// If an array, will assume an array of promises and return a single promise
// that resolves to all of the results of the promises (e.g. Promise.all)
// If an object, will assume each value is one or more promises. Will return
// a single promise that resolves to the object with values as resolved values
// (the values will no longer be promises). In this case the order of keys
// will not be preserved.
const allP = ps => {
    if(Array.isArray(ps)) return Promise.all(ps)

    return R.compose(
        reduce((accP, p, k) => {
            return Promise.all([accP, p])
                .then(([acc, x]) => {
                    return {
                        ...acc,
                        [k]: x,
                    }
                })
        }, Promise.resolve({})),
        map(x => {
            return Array.isArray(x)
                ? Promise.all(x)
                : x
        })
    )(ps)
}

// only allows a function to be run a certain number of times at once. if
// that number is reached, will queue the other function calls and wait
// until a spot opens up.
//
// f must return a Promise.
const nConcurrent = (n, f) => {
    let numRunning = 0
    let queue = []

    const runOne = ({args, resolve}) => {
        numRunning++

        return f.apply(null, args)
            .then(result => {
                numRunning--

                if(queue.length) {
                    runOne(queue.pop())
                }

                resolve(result)
            })
    }

    return (...args) => {
        return new Promise((resolve, reject) => {
            if(numRunning >= n) {
                queue.push({args, resolve})
            }
            else {
                runOne({args, resolve})
            }
        })
    }
}

module.exports = {
    then,
    thenMap,
    thenChain,
    pCatch,
    allP,
    nConcurrent,
}
