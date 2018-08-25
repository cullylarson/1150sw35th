export const preventDefault = (f) => (e) => {
    e.preventDefault()
    f(e)
}
