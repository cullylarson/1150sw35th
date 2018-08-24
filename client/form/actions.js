import {scrollTop} from '@app/lib/scroll'
import * as api from './api'
import * as actionTypes from './action-types'

export function clearForm() {
    return {
        type: actionTypes.CLEAR_FORM,
    }
}

function sendFormRequest() {
    return {
        type: actionTypes.SEND_FORM_REQUEST,
    }
}

function sendFormSuccess(account) {
    scrollTop()

    return {
        type: actionTypes.SEND_FORM_SUCCESS,
        account,
    }
}

function sendFormFailure(errors, paramErrors) {
    scrollTop()

    return {
        type: actionTypes.SEND_FORM_FAILURE,
        errors,
        paramErrors,
    }
}

export function sendForm(fields) {
    return (dispatch, getState) => {
        dispatch(sendFormRequest())

        const state = getState()

        api.sendForm({
            apiUrl: state.config.apiUrl,
            ...fields,
        })
            .then(data => {
                if(!data.success) dispatch(sendFormFailure(data.errors, data.paramErrors))
                else dispatch(sendFormSuccess(data.account))
            })
            .catch(_ => dispatch(sendFormFailure(['Something went wrong and your application could not be submitted. Please try again.'])))
    }
}
