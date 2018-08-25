const {query} = require('@app/lib/mysql')
const {get, toString, toInt} = require('@app/lib/f')
const {getParams} = require('@app/lib/params')
const {randomString} = require('@app/lib/rando')

const prepareResult = getParams({
    id: [undefined, toInt(undefined)],
    name: ['', toString],
    email: ['', toString],
    data: ['', toString],
    created: [null, x => x],
})

const getOne = (pool, id) => {
    return query(pool, 'SELECT * FROM applications WHERE id = ? LIMIT 1', [id])
        .then(get(['results', 0], undefined))
        .then(x => x ? prepareResult(x) : x)
}

const getOneByPublicId = (pool, publicId) => {
    return query(pool, 'SELECT * FROM applications WHERE publicIdentifier = ? LIMIT 1', [publicId])
        .then(get(['results', 0], undefined))
        .then(x => x ? prepareResult(x) : x)
}

const add = (pool, data) => {
    const name = [
        data.firstName,
        data.middleName,
        data.lastname,
    ].filter(x => !!x).join(' ')

    return query(pool, "INSERT INTO applications (version, publicIdentifier, name, email, data, created) VALUES('1', ?, ?, ?, ?, NOW())", [
        randomString(48),
        name,
        data.email,
        JSON.stringify(data),
    ])
        .then(get(['results', 'insertId'], undefined))
}

module.exports = {
    getOne,
    getOneByPublicId,
    add,
}
