import {scrollTop} from '@app/lib/scroll'
import * as api from './api'
import * as actionTypes from './action-types'

export function setFormField(name, value) {
    return {
        type: actionTypes.SET_FORM_PARAM,
        name,
        value,
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

        api.sendForm(state.config.api.baseUrl, fields)
            .then(data => {
                if(!data.success) dispatch(sendFormFailure(data.errors, data.paramErrors))
                else dispatch(sendFormSuccess(data.account))
            })
            .catch(_ => dispatch(sendFormFailure(['Something went wrong and your application could not be submitted. Please try again.'])))
    }
}
