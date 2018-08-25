import * as actionTypes from './action-types'

const initialState = {
    fields: {
        name: '',
        email: '',
    },
    send: {
        success: false,
        doing: false,
        errors: [],
        paramErrors: {},
    },
}

const actionsMap = {
    [actionTypes.SET_FORM_PARAM]: (state, action) => {
        return {
            ...state,
            fields: {
                ...state.fields,
                [action.name]: action.value,
            },
            send: {
                ...state.send,
                errors: [],
                paramErrors: {},
            },
        }
    },

    [actionTypes.SEND_FORM_REQUEST]: (state, action) => {
        return {
            ...state,
            send: {
                ...state.send,
                doing: true,
                errors: [],
                paramErrors: {},
            },
        }
    },

    [actionTypes.SEND_FORM_SUCCESS]: (state, action) => {
        return {
            ...initialState,
            send: {
                ...initialState.send,
                success: true,
            },
        }
    },

    [actionTypes.SEND_FORM_FAILURE]: (state, action) => {
        return {
            ...state,
            send: {
                ...state.send,
                doing: false,
                errors: action.errors,
                paramErrors: action.paramErrors,
            },
        }
    },
}

export default function(state = initialState, action = {}) {
    const fn = actionsMap[action.type]
    return fn ? fn(state, action) : state
}
