import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {preventDefault} from '@common/lib/events'
import {sendForm} from './actions'

const mapStateToProps = ({form}) => ({form})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        sendForm,
    }, dispatch),
})

const Form = ({form, actions}) => {
    const handleSubmit = preventDefault(() => {
        actions.sendForm({name: 'asdf'})
    })

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='email'>Email address</label>
                <input type='email' className='form-control' id='email' name='email' />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
