import {h} from 'preact'
import {bindActionCreators} from 'redux'
import {connect} from 'preact-redux'
import {preventDefault} from '@app/lib/events'
import {get} from '@app/lib/f'
import {setFormField, sendForm} from './actions'
import FormText from '@app/components/FormText'
import Messages from '@app/components/Messages'

const mapStateToProps = ({form}) => ({form})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        setFormField,
        sendForm,
    }, dispatch),
})

const Form = ({form, actions}) => {
    const handleSubmit = preventDefault(() => {
        actions.sendForm(form.fields)
    })

    const paramErrors = form.send.paramErrors

    const setField = (name) => e => actions.setFormField(name, e.currentTarget.value)

    return (
        <div className='container'><div className='row'><div className='col-sm'>
            <Messages error={form.send.errors} />

            <form onSubmit={handleSubmit}>
                <FormText
                    name='name'
                    title='Name'
                    value={form.fields.name}
                    onChange={setField('name')}
                    errors={get('name', [], paramErrors)}
                />
                <FormText
                    name='email'
                    title='Email'
                    value={form.fields.email}
                    onChange={setField('email')}
                    errors={get('email', [], paramErrors)}
                />
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div></div></div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
