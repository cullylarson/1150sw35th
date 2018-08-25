import {h} from 'preact'
import {bindActionCreators} from 'redux'
import {connect} from 'preact-redux'
import {preventDefault} from '@app/lib/events'
import {get} from '@app/lib/f'
import {setFormField, sendForm} from './actions'
import FormText from '@app/components/FormText'
import FormYesNo from '@app/components/FormYesNo'
import FormRadioList from '@app/components/FormRadioList'
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

    const renderOccupantRow = (i) => {
        return (
            <div className='row many-row'>
                <div className='col-md-4'>
                    <FormText
                        name={`occupant${i}Name`}
                        title='Name'
                        value={form.fields[`occupant${i}Name`]}
                        onChange={setField(`occupant${i}Name`)}
                        errors={get(`occupant${i}Name`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-3'>
                    <FormText
                        name={`occupant${i}Relationship`}
                        title='Relationship'
                        value={form.fields[`occupant${i}Relationship`]}
                        onChange={setField(`occupant${i}Relationship`)}
                        errors={get(`occupant${i}Relationship`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-3'>
                    <FormText
                        name={`occupant${i}Occupation`}
                        title='Occupation'
                        value={form.fields[`occupant${i}Occupation`]}
                        onChange={setField(`occupant${i}Occupation`)}
                        errors={get(`occupant${i}Occupation`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-2'>
                    <FormText
                        name={`occupant${i}Age`}
                        title='Age'
                        value={form.fields[`occupant${i}Age`]}
                        onChange={setField(`occupant${i}Age`)}
                        errors={get(`occupant${i}Age`, [], paramErrors)}
                    />
                </div>
            </div>
        )
    }

    const renderPetRow = (i) => {
        return (
            <div className='row many-row'>
                <div className='col-md-4'>
                    <FormText
                        name={`pet${i}Name`}
                        title='Name'
                        value={form.fields[`pet${i}Name`]}
                        onChange={setField(`pet${i}Name`)}
                        errors={get(`pet${i}Name`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-4'>
                    <FormText
                        name={`pet${i}Type`}
                        title='Type/Breed'
                        value={form.fields[`pet${i}Type`]}
                        onChange={setField(`pet${i}Type`)}
                        errors={get(`pet${i}Type`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-2'>
                    <FormRadioList
                        name={`pet${i}IndoorOutdoor`}
                        title='Indoor/Outdoor'
                        options={{'Indoor': 'Indoor', 'Outdoor': 'Outdoor'}}
                        value={form.fields[`pet${i}IndoorOutdoor`]}
                        onChange={setField(`pet${i}IndoorOutdoor`)}
                        errors={get(`pet${i}IndoorOutdoor`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-2'>
                    <FormText
                        name={`pet${i}Age`}
                        title='Age'
                        value={form.fields[`pet${i}Age`]}
                        onChange={setField(`pet${i}Age`)}
                        errors={get(`pet${i}Age`, [], paramErrors)}
                    />
                </div>
            </div>
        )
    }

    const renderVehicleRow = (i) => {
        return (
            <div className='row many-row'>
                <div className='col-md-2'>
                    <FormText
                        name={`vehicle${i}Year`}
                        title='Year'
                        value={form.fields[`vehicle${i}Year`]}
                        onChange={setField(`vehicle${i}Year`)}
                        errors={get(`vehicle${i}Year`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-2'>
                    <FormText
                        name={`vehicle${i}Make`}
                        title='Make'
                        value={form.fields[`vehicle${i}Make`]}
                        onChange={setField(`vehicle${i}Make`)}
                        errors={get(`vehicle${i}Make`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-2'>
                    <FormText
                        name={`vehicle${i}Model`}
                        title='Model'
                        value={form.fields[`vehicle${i}Model`]}
                        onChange={setField(`vehicle${i}Model`)}
                        errors={get(`vehicle${i}Model`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-2'>
                    <FormText
                        name={`vehicle${i}Color`}
                        title='Color'
                        value={form.fields[`vehicle${i}Color`]}
                        onChange={setField(`vehicle${i}Color`)}
                        errors={get(`vehicle${i}Color`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-2'>
                    <FormText
                        name={`vehicle${i}Plate`}
                        title='Plate #'
                        value={form.fields[`vehicle${i}Plate`]}
                        onChange={setField(`vehicle${i}Plate`)}
                        errors={get(`vehicle${i}Plate`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-2'>
                    <FormText
                        name={`vehicle${i}State`}
                        title='State'
                        value={form.fields[`vehicle${i}State`]}
                        onChange={setField(`vehicle${i}State`)}
                        errors={get(`vehicle${i}State`, [], paramErrors)}
                    />
                </div>
            </div>
        )
    }

    const renderContactRow = (kindShort, kindHuman, i) => {
        return (
            <div className='row many-row'>
                <div className='col-md-4'>
                    <FormText
                        name={`${kindShort}${i}Name`}
                        title={kindHuman}
                        value={form.fields[`${kindShort}${i}Name`]}
                        onChange={setField(`${kindShort}${i}Name`)}
                        errors={get(`${kindShort}${i}Name`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-4'>
                    <FormText
                        name={`${kindShort}${i}Phone1`}
                        title='Phone'
                        value={form.fields[`${kindShort}${i}Phone1`]}
                        onChange={setField(`${kindShort}${i}Phone1`)}
                        errors={get(`${kindShort}${i}Phone1`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-4'>
                    <FormText
                        name={`${kindShort}${i}Phone2`}
                        title='Phone'
                        value={form.fields[`${kindShort}${i}Phone2`]}
                        onChange={setField(`${kindShort}${i}Phone2`)}
                        errors={get(`${kindShort}${i}Phone2`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-4'>
                    <FormText
                        name={`${kindShort}${i}Relation`}
                        title='Relation'
                        value={form.fields[`${kindShort}${i}Relation`]}
                        onChange={setField(`${kindShort}${i}Relation`)}
                        errors={get(`${kindShort}${i}Relation`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-4'>
                    <FormText
                        name={`${kindShort}${i}Address`}
                        title='Address'
                        value={form.fields[`${kindShort}${i}Address`]}
                        onChange={setField(`${kindShort}${i}Address`)}
                        errors={get(`${kindShort}${i}Address`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-4'>
                    <FormText
                        name={`${kindShort}${i}CityStateZip`}
                        title='City, State, Zip'
                        value={form.fields[`${kindShort}${i}CityStateZip`]}
                        onChange={setField(`${kindShort}${i}CityStateZip`)}
                        errors={get(`${kindShort}${i}CityStateZip`, [], paramErrors)}
                    />
                </div>
            </div>
        )
    }

    const renderIncomeRow = (i) => {
        return (
            <div className='row many-row'>
                <div className='col-md-3'>
                    <FormText
                        name={`income${i}Amount`}
                        title='Current Icome ($)'
                        value={form.fields[`income${i}Amount`]}
                        onChange={setField(`income${i}Amount`)}
                        errors={get(`income${i}Amount`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-3'>
                    <FormRadioList
                        name={`income${i}Period`}
                        title='Pay Period'
                        options={{'Weekly': 'Weekly', 'Biweekly': 'Biweekly', 'Monthly': 'Monthly', 'Yearly': 'Yearly'}}
                        value={form.fields[`income${i}Period`]}
                        onChange={setField(`income${i}Period`)}
                        errors={get(`income${i}Period`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-4'>
                    <FormText
                        name={`income${i}Source`}
                        title='Source'
                        value={form.fields[`income${i}Source`]}
                        onChange={setField(`income${i}Source`)}
                        errors={get(`income${i}Source`, [], paramErrors)}
                    />
                </div>
                <div className='col-md-2'>
                    <FormYesNo
                        name={`income${i}Proof`}
                        title='Proof of Income'
                        value={form.fields[`income${i}Proof`]}
                        onChange={setField(`income${i}Proof`)}
                        errors={get(`income${i}Proof`, [], paramErrors)}
                    />
                </div>
            </div>
        )
    }

    const renderEmploymentCard = (i) => {
        return (
            <div className='card'>
                <div className='card-header'><h4>{`Current Employment #${i}`}</h4></div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <FormText
                                name={`employment${i}Employer`}
                                title='Current Employer'
                                value={form.fields[`employment${i}Employer`]}
                                onChange={setField(`employment${i}Employer`)}
                                errors={get(`employment${i}Employer`, [], paramErrors)}
                            />
                        </div>
                        <div className='col-md-5'>
                            <FormText
                                name={`employment${i}Occupation`}
                                title='Occupation'
                                value={form.fields[`employment${i}Occupation`]}
                                onChange={setField(`employment${i}Occupation`)}
                                errors={get(`employment${i}Occupation`, [], paramErrors)}
                            />
                        </div>
                        <div className='col-md-2'>
                            <FormText
                                name={`employment${i}WeeklyHours`}
                                title='Hours/Week'
                                value={form.fields[`employment${i}WeeklyHours`]}
                                onChange={setField(`employment${i}WeeklyHours`)}
                                errors={get(`employment${i}WeeklyHours`, [], paramErrors)}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-5'>
                            <FormText
                                name={`employment${i}Supervisor`}
                                title='Supervisor'
                                value={form.fields[`employment${i}Supervisor`]}
                                onChange={setField(`employment${i}Supervisor`)}
                                errors={get(`employment${i}Supervisor`, [], paramErrors)}
                            />
                        </div>
                        <div className='col-md-5'>
                            <FormText
                                name={`employment${i}Phone`}
                                title='Phone'
                                value={form.fields[`employment${i}Phone`]}
                                onChange={setField(`employment${i}Phone`)}
                                errors={get(`employment${i}Phone`, [], paramErrors)}
                            />
                        </div>
                        <div className='col-md-2'>
                            <FormText
                                name={`employment${i}Years`}
                                title='Years Employed'
                                value={form.fields[`employment${i}Years`]}
                                onChange={setField(`employment${i}Years`)}
                                errors={get(`employment${i}Years`, [], paramErrors)}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <FormText
                                name={`employment${i}Address`}
                                title='Address'
                                value={form.fields[`employment${i}Address`]}
                                onChange={setField(`employment${i}Address`)}
                                errors={get(`employment${i}Address`, [], paramErrors)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <FormText
                                name={`employment${i}CityStateZip`}
                                title='City, State, Zip'
                                value={form.fields[`employment${i}CityStateZip`]}
                                onChange={setField(`employment${i}CityStateZip`)}
                                errors={get(`employment${i}CityStateZip`, [], paramErrors)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderForm = () => {
        const disabled = form.send.doing
        return (
            <div className='container'>
                <div className='row'><div className='col-sm'>
                    <Messages error={form.send.errors} />
                </div></div>

                <form onSubmit={handleSubmit}>
                    <div className='card'>
                        <div className='card-header'><h4>Personal Information</h4></div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <FormText
                                        name='firstName'
                                        title='First Name'
                                        value={form.fields.firstName}
                                        onChange={setField('firstName')}
                                        errors={get('firstName', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <FormText
                                        name='middleName'
                                        title='Middle Name'
                                        value={form.fields.middleName}
                                        onChange={setField('middleName')}
                                        errors={get('middleName', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <FormText
                                        name='lastName'
                                        title='Last Name'
                                        value={form.fields.lastName}
                                        onChange={setField('lastName')}
                                        errors={get('lastName', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <FormText
                                        name='ssn'
                                        title='Social Security #'
                                        value={form.fields.ssn}
                                        onChange={setField('ssn')}
                                        errors={get('ssn', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <FormText
                                        name='driversLicenseNumber'
                                        title='Drivers License #'
                                        value={form.fields.driversLicenseNumber}
                                        onChange={setField('driversLicenseNumber')}
                                        errors={get('driversLicenseNumber', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <FormText
                                        name='driversLicenseState'
                                        title='Drivers License State'
                                        value={form.fields.driversLicenseState}
                                        onChange={setField('driversLicenseState')}
                                        errors={get('driversLicenseState', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <FormText
                                        name='phone'
                                        title='Phone Number'
                                        value={form.fields.phone}
                                        onChange={setField('phone')}
                                        errors={get('phone', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <FormText
                                        name='phoneAlt'
                                        title='Alternative Phone Number'
                                        value={form.fields.phoneAlt}
                                        onChange={setField('phoneAlt')}
                                        errors={get('phoneAlt', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <FormText
                                        name='email'
                                        title='Email Address'
                                        value={form.fields.email}
                                        onChange={setField('email')}
                                        errors={get('email', [], paramErrors)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-header'><h4>Present Housing</h4></div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <FormText
                                        name='presentAddress'
                                        title='Present Home Address'
                                        value={form.fields.presentAddress}
                                        onChange={setField('presentAddress')}
                                        errors={get('presentAddress', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-5'>
                                    <FormText
                                        name='presentCityStateZip'
                                        title='City, State, Zip'
                                        value={form.fields.presentCityStateZip}
                                        onChange={setField('presentCityStateZip')}
                                        errors={get('presentCityStateZip', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <FormText
                                        name='presentLength'
                                        title='Length of Time'
                                        value={form.fields.presentLength}
                                        onChange={setField('presentLength')}
                                        errors={get('presentLength', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-5'>
                                    <FormText
                                        name='presentLandlord'
                                        title='Present Landlord'
                                        value={form.fields.presentLandlord}
                                        onChange={setField('presentLandlord')}
                                        errors={get('presentLandlord', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <FormText
                                        name='presentLandlordPhone'
                                        title='Landlord Phone'
                                        value={form.fields.presentLandlordPhone}
                                        onChange={setField('presentLandlordPhone')}
                                        errors={get('presentLandlordPhone', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <FormText
                                        name='presentReason'
                                        title='Reason for Leaving'
                                        value={form.fields.presentReason}
                                        onChange={setField('presentReason')}
                                        errors={get('presentReason', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name='presentRent'
                                        title='Amount of Rent'
                                        value={form.fields.presentRent}
                                        onChange={setField('presentRent')}
                                        errors={get('presentRent', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormYesNo
                                        name='presentRentUpToDate'
                                        title='Is your rent up to date?'
                                        value={form.fields.presentRentUpToDate}
                                        onChange={setField('presentRentUpToDate')}
                                        errors={get('presentRentUpToDate', [], paramErrors)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-header'><h4>Previous Housing</h4></div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <FormText
                                        name='previousAddress'
                                        title='Previous Home Address'
                                        value={form.fields.previousAddress}
                                        onChange={setField('previousAddress')}
                                        errors={get('previousAddress', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-5'>
                                    <FormText
                                        name='previousCityStateZip'
                                        title='City, State, Zip'
                                        value={form.fields.previousCityStateZip}
                                        onChange={setField('previousCityStateZip')}
                                        errors={get('previousCityStateZip', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <FormText
                                        name='previousLength'
                                        title='Length of Time'
                                        value={form.fields.previousLength}
                                        onChange={setField('previousLength')}
                                        errors={get('previousLength', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-5'>
                                    <FormText
                                        name='previousLandlord'
                                        title='Previous Landlord'
                                        value={form.fields.previousLandlord}
                                        onChange={setField('previousLandlord')}
                                        errors={get('previousLandlord', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <FormText
                                        name='previousLandlordPhone'
                                        title='Landlord Phone'
                                        value={form.fields.previousLandlordPhone}
                                        onChange={setField('previousLandlordPhone')}
                                        errors={get('previousLandlordPhone', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <FormText
                                        name='previousReason'
                                        title='Reason for Leaving'
                                        value={form.fields.previousReason}
                                        onChange={setField('previousReason')}
                                        errors={get('previousReason', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name='previousRent'
                                        title='Amount of Rent'
                                        value={form.fields.previousRent}
                                        onChange={setField('previousRent')}
                                        errors={get('previousRent', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormYesNo
                                        name='previousRentUpToDate'
                                        title='Was your rent up to date?'
                                        value={form.fields.previousRentUpToDate}
                                        onChange={setField('previousRentUpToDate')}
                                        errors={get('previousRentUpToDate', [], paramErrors)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-header'><h4>Next Previous Housing</h4></div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <FormText
                                        name='nextPreviousAddress'
                                        title='Next Previous Home Address'
                                        value={form.fields.nextPreviousAddress}
                                        onChange={setField('nextPreviousAddress')}
                                        errors={get('nextPreviousAddress', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-5'>
                                    <FormText
                                        name='nextPreviousCityStateZip'
                                        title='City, State, Zip'
                                        value={form.fields.nextPreviousCityStateZip}
                                        onChange={setField('nextPreviousCityStateZip')}
                                        errors={get('nextPreviousCityStateZip', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <FormText
                                        name='nextPreviousLength'
                                        title='Length of Time'
                                        value={form.fields.nextPreviousLength}
                                        onChange={setField('nextPreviousLength')}
                                        errors={get('nextPreviousLength', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-5'>
                                    <FormText
                                        name='nextPreviousLandlord'
                                        title='Next Previous Landlord'
                                        value={form.fields.nextPreviousLandlord}
                                        onChange={setField('nextPreviousLandlord')}
                                        errors={get('nextPreviousLandlord', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <FormText
                                        name='nextPreviousLandlordPhone'
                                        title='Landlord Phone'
                                        value={form.fields.nextPreviousLandlordPhone}
                                        onChange={setField('nextPreviousLandlordPhone')}
                                        errors={get('nextPreviousLandlordPhone', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <FormText
                                        name='nextPreviousReason'
                                        title='Reason for Leaving'
                                        value={form.fields.nextPreviousReason}
                                        onChange={setField('nextPreviousReason')}
                                        errors={get('nextPreviousReason', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name='nextPreviousRent'
                                        title='Amount of Rent'
                                        value={form.fields.nextPreviousRent}
                                        onChange={setField('nextPreviousRent')}
                                        errors={get('nextPreviousRent', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormYesNo
                                        name='nextPreviousRentUpToDate'
                                        title='Was your rent up to date?'
                                        value={form.fields.nextPreviousRentUpToDate}
                                        onChange={setField('nextPreviousRentUpToDate')}
                                        errors={get('nextPreviousRentUpToDate', [], paramErrors)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-header'><h4>Proposed Occupants</h4></div>
                        <div className='card-body'>
                            {renderOccupantRow(1)}
                            {renderOccupantRow(2)}
                            {renderOccupantRow(3)}
                            {renderOccupantRow(4)}
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-header'><h4>Pets</h4></div>
                        <div className='card-body'>
                            {renderPetRow(1)}
                            {renderPetRow(2)}
                            {renderPetRow(3)}
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-header'><h4>Vehicles</h4></div>
                        <div className='card-body'>
                            {renderVehicleRow(1)}
                            {renderVehicleRow(2)}
                            {renderVehicleRow(3)}
                        </div>
                    </div>
                    {renderEmploymentCard(1)}
                    {renderEmploymentCard(2)}
                    <div className='card'>
                        <div className='card-header'><h4>Income</h4></div>
                        <div className='card-body'>
                            {renderIncomeRow(1)}
                            {renderIncomeRow(2)}
                            {renderIncomeRow(3)}
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-header'><h4>Credit Card / Financial Information</h4></div>
                        <div className='card-body'>
                            <div className='row many-row'>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'carLienHolder'}
                                        title='Car Loan: Lien Holder'
                                        value={form.fields['carLienHolder']}
                                        onChange={setField('carLienHolder')}
                                        errors={get('carLienHolder', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'carBalance'}
                                        title='Balance Owed'
                                        value={form.fields['carBalance']}
                                        onChange={setField('carBalance')}
                                        errors={get('carBalance', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'carMonthlyPayment'}
                                        title='Monthly Payment'
                                        value={form.fields['carMonthlyPayment']}
                                        onChange={setField('carMonthlyPayment')}
                                        errors={get('carMonthlyPayment', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'carCreditorsPhone'}
                                        title="Creditor's Phone Number"
                                        value={form.fields['carCreditorsPhone']}
                                        onChange={setField('carCreditorsPhone')}
                                        errors={get('carCreditorsPhone', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row many-row'>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard1Company'}
                                        title='Credit Card: Company'
                                        value={form.fields['creditCard1Company']}
                                        onChange={setField('creditCard1Company')}
                                        errors={get('creditCard1Company', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard1Balance'}
                                        title='Balance Owed'
                                        value={form.fields['creditCard1Balance']}
                                        onChange={setField('creditCard1Balance')}
                                        errors={get('creditCard1Balance', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard1MonthlyPayment'}
                                        title='Monthly Payment'
                                        value={form.fields['creditCard1MonthlyPayment']}
                                        onChange={setField('creditCard1MonthlyPayment')}
                                        errors={get('creditCard1MonthlyPayment', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard1CreditorsPhone'}
                                        title="Creditor's Phone Number"
                                        value={form.fields['creditCard1CreditorsPhone']}
                                        onChange={setField('creditCard1CreditorsPhone')}
                                        errors={get('creditCardCreditorsPhone', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row many-row'>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard2Company'}
                                        title='Credit Card: Company'
                                        value={form.fields['creditCard2Company']}
                                        onChange={setField('creditCard2Company')}
                                        errors={get('creditCard2Company', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard2Balance'}
                                        title='Balance Owed'
                                        value={form.fields['creditCard2Balance']}
                                        onChange={setField('creditCard2Balance')}
                                        errors={get('creditCard2Balance', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard2MonthlyPayment'}
                                        title='Monthly Payment'
                                        value={form.fields['creditCard2MonthlyPayment']}
                                        onChange={setField('creditCard2MonthlyPayment')}
                                        errors={get('creditCard2MonthlyPayment', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard2CreditorsPhone'}
                                        title="Creditor's Phone Number"
                                        value={form.fields['creditCard2CreditorsPhone']}
                                        onChange={setField('creditCard2CreditorsPhone')}
                                        errors={get('creditCardCreditorsPhone', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row many-row'>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard3Company'}
                                        title='Credit Card: Company'
                                        value={form.fields['creditCard3Company']}
                                        onChange={setField('creditCard3Company')}
                                        errors={get('creditCard3Company', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard3Balance'}
                                        title='Balance Owed'
                                        value={form.fields['creditCard3Balance']}
                                        onChange={setField('creditCard3Balance')}
                                        errors={get('creditCard3Balance', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard3MonthlyPayment'}
                                        title='Monthly Payment'
                                        value={form.fields['creditCard3MonthlyPayment']}
                                        onChange={setField('creditCard3MonthlyPayment')}
                                        errors={get('creditCard3MonthlyPayment', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'creditCard3CreditorsPhone'}
                                        title="Creditor's Phone Number"
                                        value={form.fields['creditCard3CreditorsPhone']}
                                        onChange={setField('creditCard3CreditorsPhone')}
                                        errors={get('creditCardCreditorsPhone', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row many-row'>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'otherCredit'}
                                        title='Child Support/Other Credit Owed'
                                        value={form.fields['otherCredit']}
                                        onChange={setField('otherCredit')}
                                        errors={get('otherCredit', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'otherCreditBalance'}
                                        title='Balance Owed'
                                        value={form.fields['otherCreditBalance']}
                                        onChange={setField('otherCreditBalance')}
                                        errors={get('otherCreditBalance', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'otherCreditMonthlyPayment'}
                                        title='Monthly Payment'
                                        value={form.fields['otherCreditMonthlyPayment']}
                                        onChange={setField('otherCreditMonthlyPayment')}
                                        errors={get('otherCreditMonthlyPayment', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'otherCreditCreditorsPhone'}
                                        title="Creditor's Phone Number"
                                        value={form.fields['otherCreditCreditorsPhone']}
                                        onChange={setField('otherCreditCreditorsPhone')}
                                        errors={get('otherCreditCreditorsPhone', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row many-row'>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'bankAccountName'}
                                        title='Bank Account: Name of Bank'
                                        value={form.fields['bankAccountName']}
                                        onChange={setField('bankAccountName')}
                                        errors={get('bankAccountName', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'bankAccountBalance'}
                                        title='Balance'
                                        value={form.fields['bankAccountBalance']}
                                        onChange={setField('bankAccountBalance')}
                                        errors={get('bankAccountBalance', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'bankAccountMonthlyPayment'}
                                        title='Monthly Payment'
                                        value={form.fields['bankAccountMonthlyPayment']}
                                        onChange={setField('bankAccountMonthlyPayment')}
                                        errors={get('bankAccountMonthlyPayment', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-3'>
                                    <FormText
                                        name={'bankAccountNumber'}
                                        title='Account Number'
                                        value={form.fields['bankAccountNumber']}
                                        onChange={setField('bankAccountNumber')}
                                        errors={get('bankAccountNumber', [], paramErrors)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-header'><h4>Emergency / Personal Reference</h4></div>
                        <div className='card-body'>
                            {renderContactRow('emergency', 'Emergency Contact', 1)}
                            {renderContactRow('emergency', 'Emergency Contact', 2)}
                            {renderContactRow('reference', 'Personal Reference', 1)}
                            {renderContactRow('reference', 'Personal Reference', 2)}
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-header'><h4>Questions</h4></div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <FormYesNo
                                        name={'questionBeenSued'}
                                        title='Has applicant ever been sued for bills?'
                                        value={form.fields['questionBeenSued']}
                                        onChange={setField('questionBeenSued')}
                                        errors={get('questionBeenSued', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <FormYesNo
                                        name={'questionLockedOutSheriff'}
                                        title='Has applicant ever been locked out of their apartment by the sheriff?'
                                        value={form.fields['questionLockedOutSheriff']}
                                        onChange={setField('questionLockedOutSheriff')}
                                        errors={get('questionLockedOutSheriff', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <FormYesNo
                                        name={'questionBeenBankrupt'}
                                        title='Has applicant ever been bankrupt?'
                                        value={form.fields['questionBeenBankrupt']}
                                        onChange={setField('questionBeenBankrupt')}
                                        errors={get('questionBeenBankrupt', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <FormYesNo
                                        name={'questionBroughtToCourt'}
                                        title='Has applicant ever been brought to court by a landlord?'
                                        value={form.fields['questionBroughtToCourt']}
                                        onChange={setField('questionBroughtToCourt')}
                                        errors={get('questionBroughtToCourt', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <FormYesNo
                                        name={'questionFelony'}
                                        title='Has applicant ever been guilty of a felony?'
                                        value={form.fields['questionFelony']}
                                        onChange={setField('questionFelony')}
                                        errors={get('questionFelony', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <FormYesNo
                                        name={'questionMovedOwingMoney'}
                                        title='Has applicant ever moved owing rent or damages to an apartment?'
                                        value={form.fields['questionMovedOwingMoney']}
                                        onChange={setField('questionMovedOwingMoney')}
                                        errors={get('questionMovedOwingMoney', [], paramErrors)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <FormYesNo
                                        name={'questionBrokenLease'}
                                        title='Has applicant ever been broken a lease?'
                                        value={form.fields['questionBrokenLease']}
                                        onChange={setField('questionBrokenLease')}
                                        errors={get('questionBrokenLease', [], paramErrors)}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <FormYesNo
                                        name={'questionMoveInAmountAvailable'}
                                        title='Is the total move-in amount available now (rent and deposit)?'
                                        value={form.fields['questionMoveInAmountAvailable']}
                                        onChange={setField('questionMoveInAmountAvailable')}
                                        errors={get('questionMoveInAmountAvailable', [], paramErrors)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-header'><h4>Authorization</h4></div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <p>By checking the box below an submitting this form, applicant authorizes the landlord to contact past and present landlords, employers, creditors, credit bureaus, neighbors, and any other sources deemed necessary to investigate applicant. All information is true, accurate, and complete to the best of applicant's knowledge. Landlord reserves the right to disqualify tenant if information is not as represented. ANY PERSON OR FIRM IS AUTHORIZED TO RELEASE INFORMATION ABOUT THE UNSIGNED UPON PRESENTATION OF THIS FORM OR A PHOTOCOPY OF THIS FORM AT ANY TIME.</p>
                                </div>
                                <div className='col-md-6'>
                                    <FormYesNo
                                        name={'finalConfirmation'}
                                        title='Do you agree to the above, confirming that it all true, accurate and complete?'
                                        value={form.fields['finalConfirmation']}
                                        onChange={setField('finalConfirmation')}
                                        errors={get('finalConfirmation', [], paramErrors)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'><div className='col-sm'>
                        <button type='submit' className='btn btn-primary' disabled={disabled}>Submit Application</button>
                    </div></div>
                </form>
            </div>
        )
    }

    const renderSuccess = () => {
        return (
            <div className='container'><div className='row'><div className='col-sm'>
                <Messages success={['Thank you for submitting an application! We will be in touch with you very soon.']} />
            </div></div></div>
        )
    }

    return form.send.success ? renderSuccess() : renderForm()
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
