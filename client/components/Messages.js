import {h} from 'preact'
import {liftA} from '@app/lib/f'
import {getMessage} from '@app/lib/messages'

export default ({error, success}) => {
    error = liftA(error).filter(x => !!x)
    success = liftA(success).filter(x => !!x)

    const renderSet = (classNames, messages) => {
        return (
            <span>
                {messages.map((x, i) => <div className='alert alert-danger' key={i}>{getMessage(x)}</div>)}
            </span>
        )
    }

    return (
        <span>
            {error && error.length ? renderSet('messages messages-error', error) : ''}
            {success && success.length ? renderSet('messages messages-success', success) : ''}
        </span>
    )
}
