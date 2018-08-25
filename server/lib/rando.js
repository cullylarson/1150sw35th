const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const characters = "abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

const randomString = (length) => {
    let x = ''
    for(let i = 0; i < length; i++) {
        x += characters.substr(randomInt(0, characters.length), 1)
    }

    return x
}

module.exports = {
    randomString,
    randomInt,
}
