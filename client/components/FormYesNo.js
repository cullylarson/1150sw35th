import {h} from 'preact'
import FormRadioList from './FormRadioList'

export default ({name, isEnabled, title, value, onChange, description, errors}) => {
    return <FormRadioList
        name={name}
        isEnabled={isEnabled}
        title={title}
        value={value}
        options={{'yes': 'Yes', 'no': 'No'}}
        onChange={onChange}
        description={description}
        errors={errors}
    />
}
