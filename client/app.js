import {h, render} from 'preact'
import {Provider} from 'preact-redux'
import {createStore, applyMiddleware, compose as reduxCompose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '@app/root-reducer'
import formReducer from '@app/form/reducer'
import App from '@app/app/App'

const composeEnhancers = process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose
    : reduxCompose

const LOCAL_STORAGE_KEY = 'elevenFityFormState'

const getFormIntialState = () => {
    if(!localStorage.getItem(LOCAL_STORAGE_KEY)) return formReducer()

    return {
        ...formReducer(),
        fields: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {},
    }
}

window.elevenfifty = {
    start: (el, config) => {
        const initialState = {
            config,
            form: getFormIntialState(),
        }

        const store = createStore(
            rootReducer,
            initialState,
            composeEnhancers(
                applyMiddleware(thunk)
            )
        )

        store.subscribe(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState().form.fields))
        })

        render(
            <Provider store={store}>
                <App />
            </Provider>, el
        )
    },
}
