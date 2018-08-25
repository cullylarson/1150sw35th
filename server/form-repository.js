const {get} = require('@app/lib/f')
const {query} = require('@app/lib/mysql')

const add = (pool, params) => {
    return query(pool, 'INSERT INTO applications (name, email, params, created) VALUES(?, ?, ?, NOW())', [
        params.name,
        params.email,
        JSON.stringify(params),
    ])
        .then(get(['results', 'insertId'], undefined))
}

module.exports = {
    add,
}
