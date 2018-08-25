const {get} = require('@app/lib/f')
const {query} = require('@app/lib/mysql')

const add = (pool, data) => {
    const name = [
        data.firstName,
        data.middleName,
        data.lastname,
    ].filter(x => !!x).join(' ')

    return query(pool, "INSERT INTO applications (version, name, email, data, created) VALUES('1', ?, ?, ?, NOW())", [
        name,
        data.email,
        JSON.stringify(data),
    ])
        .then(get(['results', 'insertId'], undefined))
}

module.exports = {
    add,
}
