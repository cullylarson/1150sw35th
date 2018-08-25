const {messageObj} = require('@app/lib/messages')
const {toString} = require('@app/lib/f')
const {getParams} = require('@app/lib/params')
const {responseFromValidationResult, responseError} = require('@app/lib/response')
const formRepo = require('./form-repository')
const validator = require('./form-validator')
const {sendEntryNotification} = require('./form-email')

const getFormParams = getParams({
    firstName: ['', toString],
    middleName: ['', toString],
    lastName: ['', toString],
    ssn: ['', toString],
    driversLicenseNumber: ['', toString],
    driversLicenseState: ['', toString],
    phone: ['', toString],
    phoneAlt: ['', toString],
    email: ['', toString],
    presentAddress: ['', toString],
    presentCityStateZip: ['', toString],
    presentLength: ['', toString],
    presentLandlord: ['', toString],
    presentLandlordPhone: ['', toString],
    presentReason: ['', toString],
    presentRent: ['', toString],
    presentRentUpToDate: ['', toString],
    previousAddress: ['', toString],
    previousCityStateZip: ['', toString],
    previousLength: ['', toString],
    previousLandlord: ['', toString],
    previousLandlordPhone: ['', toString],
    previousReason: ['', toString],
    previousRent: ['', toString],
    previousRentUpToDate: ['', toString],
    nextPreviousAddress: ['', toString],
    nextPreviousCityStateZip: ['', toString],
    nextPreviousLength: ['', toString],
    nextPreviousLandlord: ['', toString],
    nextPreviousLandlordPhone: ['', toString],
    nextPreviousReason: ['', toString],
    nextPreviousRent: ['', toString],
    nextPreviousRentUpToDate: ['', toString],
    carLienHolder: ['', toString],
    carBalance: ['', toString],
    carMonthlyPayment: ['', toString],
    carCreditorsPhone: ['', toString],
    creditCard1Company: ['', toString],
    creditCard1Balance: ['', toString],
    creditCard1MonthlyPayment: ['', toString],
    creditCard1CreditorsPhone: ['', toString],
    creditCard2Company: ['', toString],
    creditCard2Balance: ['', toString],
    creditCard2MonthlyPayment: ['', toString],
    creditCard2CreditorsPhone: ['', toString],
    creditCard3Company: ['', toString],
    creditCard3Balance: ['', toString],
    creditCard3MonthlyPayment: ['', toString],
    creditCard3CreditorsPhone: ['', toString],
    otherCredit: ['', toString],
    otherCreditBalance: ['', toString],
    otherCreditMonthlyPayment: ['', toString],
    otherCreditCreditorsPhone: ['', toString],
    bankAccountName: ['', toString],
    bankAccountBalance: ['', toString],
    bankAccountMonthlyPayment: ['', toString],
    bankAccountNumber: ['', toString],
    questionBeenSued: ['', toString],
    questionLockedOutSheriff: ['', toString],
    questionBeenBankrupt: ['', toString],
    questionBroughtToCourt: ['', toString],
    questionFelony: ['', toString],
    questionMovedOwingMoney: ['', toString],
    questionBrokenLease: ['', toString],
    questionMoveInAmountAvailable: ['', toString],
    emergency1Address: ['', toString],
    emergency1CityStateZip: ['', toString],
    emergency1Name: ['', toString],
    emergency1Phone1: ['', toString],
    emergency1Phone2: ['', toString],
    emergency1Relation: ['', toString],
    emergency2Address: ['', toString],
    emergency2CityStateZip: ['', toString],
    emergency2Name: ['', toString],
    emergency2Phone1: ['', toString],
    emergency2Phone2: ['', toString],
    emergency2Relation: ['', toString],
    employment1Address: ['', toString],
    employment1CityStateZip: ['', toString],
    employment1Employer: ['', toString],
    employment1Occupation: ['', toString],
    employment1Phone: ['', toString],
    employment1Supervisor: ['', toString],
    employment1WeeklyHours: ['', toString],
    employment1Years: ['', toString],
    employment2Address: ['', toString],
    employment2CityStateZip: ['', toString],
    employment2Employer: ['', toString],
    employment2Occupation: ['', toString],
    employment2Phone: ['', toString],
    employment2Supervisor: ['', toString],
    employment2WeeklyHours: ['', toString],
    employment2Years: ['', toString],
    income1Amount: ['', toString],
    income1Period: ['', toString],
    income1Proof: ['', toString],
    income1Source: ['', toString],
    income2Amount: ['', toString],
    income2Period: ['', toString],
    income2Proof: ['', toString],
    income2Source: ['', toString],
    income3Amount: ['', toString],
    income3Period: ['', toString],
    income3Proof: ['', toString],
    income3Source: ['', toString],
    occupant1Age: ['', toString],
    occupant1Name: ['', toString],
    occupant1Occupation: ['', toString],
    occupant1Relationship: ['', toString],
    occupant2Age: ['', toString],
    occupant2Name: ['', toString],
    occupant2Occupation: ['', toString],
    occupant2Relationship: ['', toString],
    occupant3Age: ['', toString],
    occupant3Name: ['', toString],
    occupant3Occupation: ['', toString],
    occupant3Relationship: ['', toString],
    occupant4Age: ['', toString],
    occupant4Name: ['', toString],
    occupant4Occupation: ['', toString],
    occupant4Relationship: ['', toString],
    reference1Address: ['', toString],
    reference1CityStateZip: ['', toString],
    reference1Name: ['', toString],
    reference1Phone1: ['', toString],
    reference1Phone2: ['', toString],
    reference1Relation: ['', toString],
    reference2Address: ['', toString],
    reference2CityStateZip: ['', toString],
    reference2Name: ['', toString],
    reference2Phone1: ['', toString],
    reference2Phone2: ['', toString],
    reference2Relation: ['', toString],
    vehicle1Color: ['', toString],
    vehicle1Make: ['', toString],
    vehicle1Model: ['', toString],
    vehicle1Plate: ['', toString],
    vehicle1State: ['', toString],
    vehicle1Year: ['', toString],
    vehicle2Color: ['', toString],
    vehicle2Make: ['', toString],
    vehicle2Model: ['', toString],
    vehicle2Plate: ['', toString],
    vehicle2State: ['', toString],
    vehicle2Year: ['', toString],
    vehicle3Color: ['', toString],
    vehicle3Make: ['', toString],
    vehicle3Model: ['', toString],
    vehicle3Plate: ['', toString],
    vehicle3State: ['', toString],
    vehicle3Year: ['', toString],
    finalConfirmation: ['', toString],
})

module.exports = {
    submit: (pool, viewBaseUrl, notifyFrom, notifyRecipients) => (req, res) => {
        const params = getFormParams(req.body)

        validator.validateAdd(pool, params)
            .then(validationResult => {
                if(!validationResult.isValid) {
                    res
                        .status(400)
                        .json(responseFromValidationResult(validationResult))
                }
                else {
                    formRepo.add(pool, params)
                        .then(id => formRepo.getOne(pool, id))
                        .then(entry => {
                            return sendEntryNotification(viewBaseUrl, notifyFrom, notifyRecipients, entry)
                                .then(() => entry)
                        })
                        .then(entry => {
                            res.json({...params})
                        })
                        .catch(err => {
                            console.error(err)

                            res
                                .status(500)
                                .json(responseError(messageObj('database-error', 'Something went wrong and your application could not be submitted. Please try again.')))
                        })
                }
            })
            .catch(err => {
                console.error(err)

                res
                    .status(500)
                    .json(responseError(messageObj('database-error', 'Something went wrong and your application could not be submitted. Please try again.')))
            })
    },
}
