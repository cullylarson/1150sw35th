import {h} from 'preact'
import FormFieldErrors from './FormFieldErrors'
import {classnames} from '@app/lib/classes'

export default ({name, isEnabled, title, value, isChecked, onChange, description, errors}) => {
    const haveErrors = errors && errors.length

    const classNames = classnames([
        'form-group',
    ])

    return (
        <div className={classNames}>
            <input type='checkbox' id={name} name={name} value={value} checked={isChecked} onChange={onChange} className={haveErrors ? 'is-invalid' : ''} />
            <label htmlFor={name} className={haveErrors ? 'text-danger' : ''}>{title}</label>
            {description ? <div className='help-block'>{description}</div> : ''}
            <FormFieldErrors errors={errors} />
        </div>
    )
}
