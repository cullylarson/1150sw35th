const responseFromValidationResult = (validationResult) => {
    return {
        validation: {
            errors: validationResult.errors,
            paramErrors: validationResult.paramErrors,
        },
    }
}

const responseError = (messages) => {
    return {
        errors: messages,
    }
}

module.exports = {
    responseFromValidationResult,
    responseError,
}
