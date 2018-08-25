import {h} from 'preact'
import FormFieldErrors from './FormFieldErrors'
import {classnames} from '@app/lib/classes'

export default ({name, title, value, onChange, description, errors, className}) => {
    const haveErrors = errors && errors.length

    const containerClass = classnames([
        'form-group',
        className,
    ])

    const inputClass = classnames([
        'form-control',
        haveErrors ? 'is-invalid' : null,
    ])

    return (
        <div className={containerClass}>
            <label htmlFor={name} className={haveErrors ? 'text-danger' : ''}>{title}</label>
            <input type='text' id={name} name={name} value={value} onChange={onChange} className={inputClass} />
            {description ? <div className='help-block'>{description}</div> : ''}
            <FormFieldErrors errors={errors} />
        </div>
    )
}
