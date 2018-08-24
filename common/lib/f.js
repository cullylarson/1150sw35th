const R = require('ramda')

const report = x => { console.log(x); return x }

const reportM = R.curry((msg, x) => { console.log(msg, x); return x })

const liftA = (x) => Array.isArray(x) ? x : [x]

const has = R.curry((idx, x) => {
    return Array.isArray(x)
        ? (x[idx] !== void 0)
        : (idx in x)
})

const get = R.curry((idx, defaultValue, x) => {
    if(!idx && idx !== 0) return defaultValue
    const path = liftA(idx)
    if(!path.length) return defaultValue

    const getOne = R.curry((idx, defaultValue, x) => {
        return has(idx, x)
            ? x[idx]
            : defaultValue
    })

    const firstIdx = R.head(path)
    const theRest = R.tail(path)

    // we don't have the index
    if(!has(firstIdx, x)) return defaultValue

    return theRest.length
        ? get(theRest, defaultValue, getOne(firstIdx, [], x))
        : getOne(firstIdx, defaultValue, x)
})

// only returns the value if it's in the provided set, otherwise returns the default value. case sensitive.
const getSet = R.curry((validSet, defaultValue, x) => {
    return validSet.includes(x)
        ? x
        : defaultValue
})

const set = R.curry((idx, val, x) => {
    const idxArr = liftA(idx)

    return (!idx && idx !== 0) || !idxArr.length
        ? val
        : Object.assign({}, x, {[R.head(idxArr)]: set(R.tail(idxArr), val, get(R.head(idxArr), {}, x))})
})

// works on arrays and objects
const map = R.curry((f, x) => {
    const mapObj = (f, obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = f(obj[key], key)
            return acc
        }, {})
    }

    return Array.isArray(x)
        ? x.map(f)
        : mapObj(f, x)
})

const getOnly = R.curry((keys, x) => {
    return map((defaultValue, k) => get(k, defaultValue, x), keys)
})

// works on arrays and objects
const reduce = R.curry((f, initial, x) => {
    const reduceObj = (f, initial, obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            return f(acc, obj[key], key)
        }, initial)
    }

    return Array.isArray(x)
        ? x.reduce(f, initial)
        : reduceObj(f, initial, x)
})

const toInt = R.curry((defaultValue, x) => {
    const val = Number.parseInt(x)

    return isNaN(val)
        ? defaultValue
        : val
})

const getInt = R.curry((idx, defaultValue, x) => {
    const value = get(idx, defaultValue, x)

    if(value === defaultValue) return value

    return toInt(defaultValue, value)
})

const isString = x => typeof x === 'string' || x instanceof String

const toString = (x) => '' + x

const toBool = x => !!x

const identity = x => x

const doesMap = x => {
    let mapped = false
    R.map(() => { mapped = true }, x)
    return mapped
}

const bimap = R.curry((fLeft, fRight, x) => {
    return x.constructor['fantasy-land/of'](
        doesMap(x)
            ? fRight(x.value)
            : fLeft(x.value)
    )
})

const trim = x => ('' + x).trim()

module.exports = {
    liftA,
    has,
    get,
    set,
    getInt,
    map,
    reduce,
    getOnly,
    toInt,
    report,
    reportM,
    isString,
    toString,
    toBool,
    identity,
    doesMap,
    bimap,
    trim,
    getSet,
}
