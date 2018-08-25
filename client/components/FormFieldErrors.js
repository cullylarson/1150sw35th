import {h} from 'preact'
import {getMessage} from '@app/lib/messages'

export default ({errors}) => {
    const haveErrors = errors && errors.length

    if(!haveErrors) return ''

    return (
        <div className='field-errors'>
            {errors.map((x, i) => <div className='text-danger' key={i}>{getMessage(x)}</div>)}
        </div>
    )
}
