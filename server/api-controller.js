const {messageObj} = require('@app/lib/messages')
const {toString} = require('@app/lib/f')
const {getParams} = require('@app/lib/params')
const {responseFromValidationResult, responseError} = require('@app/lib/response')
const formRepo = require('./form-repository')
const validator = require('./form-validator')

const getFormParams = getParams({
    name: ['', toString],
    email: ['', toString],
})

module.exports = {
    submit: (pool) => (req, res) => {
        const params = getFormParams(req.body)

        validator.validateAdd(pool, params)
            .then(validationResult => {
                if(!validationResult.isValid) {
                    res
                        .status(400)
                        .json(responseFromValidationResult(validationResult))
                }
                else {
                    formRepo.add(pool, params)
                        .then(id => res.json({...params, id}))
                        .catch(_ => {
                            res
                                .status(500)
                                .json(responseError(messageObj('database-error', 'Something went wrong and your application could not be submitted. Please try again.' + _)))
                        })
                }
            })
            .catch(_ => {
                res
                    .status(500)
                    .json(responseError(messageObj('database-error', 'Something went wrong and your application could not be submitted. Please try again.' + _)))
            })
    }
}
