const {query} = require('@common/lib/mysql')

const add = (pool, params) => {
    return query(pool, 'INSERT INTO applications (name, email, params, created) VALUES(?, ?, ?, NULL, NOW())', [
        params.name,
        params.email,
        JSON.stringify(params),
    ])
        .then(get(['results', 'insertId'], undefined))
}
