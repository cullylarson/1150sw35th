import {combineReducers} from 'redux'
import config from '@app/config/reducer'
import form from '@app/form/reducer'

export default combineReducers({
    config,
    form,
})
