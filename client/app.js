import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose as reduxCompose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '@app/root-reducer'
import App from '@app/app/App'

const composeEnhancers = process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose
    : reduxCompose

window.elevenfifty = {
    start: (el, config) => {
        // TODO -- get initial state from local storage
        const initialState = {
            config,
            form: undefined, // will get initial state from reducer
        }

        const store = createStore(
            rootReducer,
            initialState,
            composeEnhancers(
                applyMiddleware(thunk)
            )
        )

        render(
            <Provider store={store}>
                <App />
            </Provider>, el
        )
    },
}
