const {messageObj} = require('@common/lib/messages')
const {toString} = require('@common/lib/f')
const {getParams} = require('@common/lib/params')
const {responseFromValidationResult, responseError} = require('@common/lib/response')
const formRepo = require('./form-repository')
const validator = require('./form-validator')

const getFormParams = getParams({
    name: ['', toString],
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
                                .json(responseError(messageObj('database-error', 'Something went wrong and your application could not be submitted. Please try again.')))
                        })
                }
            })
            .catch(_ => {
                res
                    .status(500)
                    .json(responseError(messageObj('database-error', 'Something went wrong and your application could not be submitted. Please try again.')))
            })
    }
}
