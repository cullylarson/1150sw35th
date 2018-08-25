import {h} from 'preact'
import FormFieldErrors from './FormFieldErrors'
import {classnames} from '@app/lib/classes'
import {map} from '@app/lib/f'

export default ({name, isEnabled, title, options, value, onChange, description, errors}) => {
    const haveErrors = errors && errors.length

    const wrapperClass = classnames([
        'form-group',
    ])

    const inputClass = classnames([
        'form-check-input',
        haveErrors ? 'is-invalid' : '',
    ])

    const renderOption = (optionTitle, optionValue) => {
        const checked = value === optionValue
        const id = name.replace(/\s/g, '-') + '-' + optionValue.replace(/\s/g, '-')

        return (
            <div key={id} className='form-check'>
                <input className={inputClass} type='radio' name={name} id={id} value={optionValue} checked={checked} onChange={onChange} />
                <label className='form-check-label' htmlFor={id}>{optionTitle}</label>
            </div>
        )
    }

    return (
        <div className={wrapperClass}>
            <label className={haveErrors ? 'text-danger' : ''}>{title}</label>
            {Object.values(map(renderOption, options))}
            {description ? <div className='help-block'>{description}</div> : ''}
            <FormFieldErrors errors={errors} />
        </div>
    )
}
