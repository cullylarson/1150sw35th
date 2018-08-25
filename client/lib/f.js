import curry from 'ramda/src/curry'
import head from 'ramda/src/head'
import tail from 'ramda/src/tail'

export const report = x => { console.log(x); return x }

export const reportM = curry((msg, x) => { console.log(msg, x); return x })

export const liftA = (x) => Array.isArray(x) ? x : [x]

export const has = curry((idx, x) => {
    if(!Array.isArray(x) && (x === null || typeof x !== 'object')) return false

    return Array.isArray(x)
        ? (x[idx] !== void 0)
        : (idx in x)
})

export const get = curry((idx, defaultValue, x) => {
    if(!idx && idx !== 0) return defaultValue
    const path = liftA(idx)
    if(!path.length) return defaultValue

    const getOne = curry((idx, defaultValue, x) => {
        return has(idx, x)
            ? x[idx]
            : defaultValue
    })

    const firstIdx = head(path)
    const theRest = tail(path)

    // we don't have the index
    if(!has(firstIdx, x)) return defaultValue

    return theRest.length
        ? get(theRest, defaultValue, getOne(firstIdx, [], x))
        : getOne(firstIdx, defaultValue, x)
})

export const set = curry((idx, val, x) => {
    const idxArr = liftA(idx)

    return (!idx && idx !== 0) || !idxArr.length
        ? val
        : Object.assign({}, x, {[head(idxArr)]: set(tail(idxArr), val, get(head(idxArr), {}, x))})
})

// works on arrays and objects
export const map = curry((f, x) => {
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

export const getOnly = curry((keys, x) => {
    return map((defaultValue, k) => get(k, defaultValue, x), keys)
})

// works on arrays and objects
export const reduce = curry((f, initial, x) => {
    const reduceObj = (f, initial, obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            return f(acc, obj[key], key)
        }, initial)
    }

    return Array.isArray(x)
        ? x.reduce(f, initial)
        : reduceObj(f, initial, x)
})

export const toInt = curry((defaultValue, x) => {
    const val = Number.parseInt(x)

    return isNaN(val)
        ? defaultValue
        : val
})

export const getInt = curry((idx, defaultValue, x) => {
    const value = get(idx, defaultValue, x)

    if(value === defaultValue) return value

    return toInt(defaultValue, value)
})

export const isObject = (x) => x !== null && typeof x === 'object'
export const isString = x => typeof x === 'string'

export const isFunction = x => x && {}.toString.call(x) === '[object Function]'
