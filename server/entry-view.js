const escape = require('escape-html')
const dateFns = require('date-fns')

const yesNo = x => x.toLowerCase() === 'yes'
    ? 'Yes'
    : x.toLowerCase() === 'no'
    ? 'No'
    : '&mdash;'

const d = x => x ? dateFns.format(x, 'MMM Do, YYYY') : ''

const renderOccupantRow = (data, i) => {
    return `
        <div class='row'>
            <div class='col-sm-4'><label>Name</label><b>${escape(data[`occupant${i}Name`])}</b></div>
            <div class='col-sm-3'><label>Relationship</label><b>${escape(data[`occupant${i}Relationship`])}</b></div>
            <div class='col-sm-3'><label>Occupation</label><b>${escape(data[`occupant${i}Occupation`])}</b></div>
            <div class='col-sm-2'><label>Age</label><b>${escape(data[`occupant${i}Age`])}</b></div>
        </div>
    `
}

const renderVehicleRow = (data, i) => {
    return `
        <div class='row'>
            <div class='col-sm-2'><label>Year</label><b>${escape(data[`vehicle${i}Year`])}</b></div>
            <div class='col-sm-2'><label>Make</label><b>${escape(data[`vehicle${i}Make`])}</b></div>
            <div class='col-sm-2'><label>Model</label><b>${escape(data[`vehicle${i}Model`])}</b></div>
            <div class='col-sm-2'><label>Color</label><b>${escape(data[`vehicle${i}Color`])}</b></div>
            <div class='col-sm-2'><label>Plate</label><b>${escape(data[`vehicle${i}Plate`])}</b></div>
            <div class='col-sm-2'><label>State</label><b>${escape(data[`vehicle${i}State`])}</b></div>
        </div>
    `
}

const renderEmploymentCard = (data, i) => {
    return `
        <div class='container entry'>
            <div class='card'>
                <div class='card-header'><h4>Current Employment #${i}</h4></div>
                <div class='card-body'>
                    <div class='row'>
                        <div class='col-sm-5'><label>Current Employer</label><b>${escape(data[`employment${i}Employer`])}</b></div>
                        <div class='col-sm-5'><label>Occupation</label><b>${escape(data[`employment${i}Occupation`])}</b></div>
                        <div class='col-sm-2'><label>Hours/Week</label><b>${escape(data[`employment${i}WeeklyHours`])}</b></div>
                    </div>
                    <div class='row'>
                        <div class='col-sm-5'><label>Supervisor</label><b>${escape(data[`employment${i}Supervisor`])}</b></div>
                        <div class='col-sm-5'><label>Phone</label><b>${escape(data[`employment${i}Phone`])}</b></div>
                        <div class='col-sm-2'><label>Years Employed</label><b>${escape(data[`employment${i}Years`])}</b></div>
                    </div>
                    <div class='row'>
                        <div class='col-sm-6'><label>Address</label><b>${escape(data[`employment${i}Address`])}</b></div>
                        <div class='col-sm-6'><label>City, State, Zip</label><b>${escape(data[`employment${i}CityStateZip`])}</b></div>
                    </div>
                </div>
            </div>
        </div>
    `
}

const renderIncomeRow = (data, i) => {
    return `
        <div class='row'>
            <div class='col-sm-3'><label>Current Icome ($)</label><b>${escape(data[`income${i}Amount`])}</b></div>
            <div class='col-sm-3'><label>Pay Period</label><b>${escape(data[`income${i}Period`])}</b></div>
            <div class='col-sm-4'><label>Source</label><b>${escape(data[`income${i}Source`])}</b></div>
            <div class='col-sm-2'><label>Proof of Income</label><b>${yesNo(data[`income${i}Proof`])}</b></div>
        </div>
    `
}

const renderContactRow = (data, kindShort, kindHuman, i) => {
    return `
        <div class='row'>
            <div class='col-sm-4'><label>${escape(kindHuman)}</label><b>${escape(data[`${kindShort}${i}Name`])}</b></div>
            <div class='col-sm-4'><label>Phone #</label><b>${escape(data[`${kindShort}${i}Phone1`])}</b></div>
            <div class='col-sm-4'><label>Alternative Phone #</label><b>${escape(data[`${kindShort}${i}Phone2`])}</b></div>
            <div class='col-sm-4'><label>Relation</label><b>${escape(data[`${kindShort}${i}Relation`])}</b></div>
            <div class='col-sm-4'><label>Address</label><b>${escape(data[`${kindShort}${i}Address`])}</b></div>
            <div class='col-sm-4'><label>City, State, Zip</label><b>${escape(data[`${kindShort}${i}CityStateZip`])}</b></div>
        </div>
    `
}

const render = (entry) => {
    const data = JSON.parse(entry.data)

    const fullName = [
        data.firstName,
        data.middleName,
        data.lastName,
    ].filter(x => !!x).join(' ')

    return `
    <html>
        <head>
            <meta charset='utf8'>
            <title>${escape(fullName)} / Application</title>

            <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:300,300i,400,400i,500,500i" rel="stylesheet">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

            <style>
                body {
                    font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                h1,
                h2,
                h3,
                h4,
                h5 {
                    font-family: "Roboto Condensed", Georgia, Times, Times New Roman, serif;
                }

                .page {
                    position: relative;
                    width: 215.9mm;
                    display: block;
                    margin: 50px;
                }

                @media print {
                    body {
                        background: white;
                    }
                    .page {
                        margin: 0;
                        height: 100%;
                        width: 100%;
                    }

                    .container {
                        padding: 0 1px 0 0;
                        width: 100%;
                        max-width: 100%;
                    }
                }

                h1 {
                    position: relative;
                    border-bottom: 1px solid rgba(0,0,0,.125);
                    margin-bottom: 40px;
                    padding-right: 140px;
                }

                h1 .submitted {
                    font-weight: 400;
                    font-size: 18px;
                    position: absolute;
                    right: 0;
                    bottom: 5px;
                }

                .card {
                    margin-bottom: 30px;
                }

                .container:last-child .card:last-child {
                    margin-bottom: 0;
                }

                .entry {
                    page-break-inside: avoid;
                }

                .entry .row {
                    border-bottom: 1px solid rgba(0,0,0,.125);
                    margin-bottom: 20px;
                }

                .entry .row > * {
                    padding-bottom: 20px;
                }

                .entry .row:last-child {
                    border: 0;
                    margin-bottom: 0;
                }

                .entry .row:last-child > * {
                    padding-bottom: 0;
                }

                .entry b {
                    display: block;
                    font-weight: 400;
                }

                .entry label {
                    display: block;
                    font-weight: 500;
                    margin-bottom: 5px;
                }
            </style>
        </head>
      <body>
        <div class='page'>
            <h1>${escape(fullName)} <span class='submitted'>${d(entry.created)}</h1>

            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Personal Information</h4></div>
                    <div class='card-body'>
                        <div class='row'>
                            <div class='col-sm-4'><label>First Name</label><b>${escape(data.firstName)}</b></div>
                            <div class='col-sm-4'><label>Middle</label><b>${escape(data.middleName)}</b></div>
                            <div class='col-sm-4'><label>Last</label><b>${escape(data.lastName)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-4'><label>Social Security #</label><b>${escape(data.ssn)}</b></div>
                            <div class='col-sm-4'><label>Drivers License #</label><b>${escape(data.driversLicenseNumber)}</b></div>
                            <div class='col-sm-4'><label>Drivers License State</label><b>${escape(data.driversLicenseState)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-4'><label>Phone #</label><b>${escape(data.phone)}</b></div>
                            <div class='col-sm-4'><label>Alternative Phone #</label><b>${escape(data.phoneAlt)}</b></div>
                            <div class='col-sm-4'><label>Email Address</label><b>${escape(data.email)}</b></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Present Housing</h4></div>
                    <div class='card-body'>
                        <div class='row'>
                            <div class='col-sm-7'><label>Present Home Address</label><b>${escape(data.presentAddress)}</b></div>
                            <div class='col-sm-5'><label>City, State, Zip</label><b>${escape(data.presentCityStateZip)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'><label>Length of Time</label><b>${escape(data.presentLength)}</b></div>
                            <div class='col-sm-5'><label>Present Landlord</label><b>${escape(data.presentLandlord)}</b></div>
                            <div class='col-sm-4'><label>Landlord Phone</label><b>${escape(data.presentLandlordPhone)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-6'><label>Reason for Leaving</label><b>${escape(data.presentReason)}</b></div>
                            <div class='col-sm-3'><label>Amount of Rent</label><b>${escape(data.presentRent)}</b></div>
                            <div class='col-sm-3'><label>Is your rent up to date?</label><b>${yesNo(data.presentRentUpToDate)}</b></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Previous Housing</h4></div>
                    <div class='card-body'>
                        <div class='row'>
                            <div class='col-sm-7'><label>Previous Home Address</label><b>${escape(data.previousAddress)}</b></div>
                            <div class='col-sm-5'><label>City, State, Zip</label><b>${escape(data.previousCityStateZip)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'><label>Length of Time</label><b>${escape(data.previousLength)}</b></div>
                            <div class='col-sm-5'><label>Previous Landlord</label><b>${escape(data.previousLandlord)}</b></div>
                            <div class='col-sm-4'><label>Landlord Phone</label><b>${escape(data.previousLandlordPhone)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-6'><label>Reason for Leaving</label><b>${escape(data.previousReason)}</b></div>
                            <div class='col-sm-3'><label>Amount of Rent</label><b>${escape(data.previousRent)}</b></div>
                            <div class='col-sm-3'><label>Is your rent up to date?</label><b>${yesNo(data.previousRentUpToDate)}</b></div>
                        </div>
                    </div>
                </div>
            </div>


            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Next Previous Housing</h4></div>
                    <div class='card-body'>
                        <div class='row'>
                            <div class='col-sm-7'><label>Next Previous Home Address</label><b>${escape(data.nextPreviousAddress)}</b></div>
                            <div class='col-sm-5'><label>City, State, Zip</label><b>${escape(data.nextPreviousCityStateZip)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'><label>Length of Time</label><b>${escape(data.nextPreviousLength)}</b></div>
                            <div class='col-sm-5'><label>Next Previous Landlord</label><b>${escape(data.nextPreviousLandlord)}</b></div>
                            <div class='col-sm-4'><label>Landlord Phone</label><b>${escape(data.nextPreviousLandlordPhone)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-6'><label>Reason for Leaving</label><b>${escape(data.nextPreviousReason)}</b></div>
                            <div class='col-sm-3'><label>Amount of Rent</label><b>${escape(data.nextPreviousRent)}</b></div>
                            <div class='col-sm-3'><label>Is your rent up to date?</label><b>${yesNo(data.nextPreviousRentUpToDate)}</b></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Proposed Occupants</h4></div>
                    <div class='card-body'>
                        ${renderOccupantRow(data, 1)}
                        ${renderOccupantRow(data, 2)}
                        ${renderOccupantRow(data, 3)}
                        ${renderOccupantRow(data, 4)}
                    </div>
                </div>
            </div>

            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Vehicles</h4></div>
                    <div class='card-body'>
                        ${renderVehicleRow(data, 1)}
                        ${renderVehicleRow(data, 2)}
                        ${renderVehicleRow(data, 3)}
                    </div>
                </div>
            </div>

            ${renderEmploymentCard(data, 1)}


            ${renderEmploymentCard(data, 2)}

            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Income</h4></div>
                    <div class='card-body'>
                        ${renderIncomeRow(data, 1)}
                        ${renderIncomeRow(data, 2)}
                        ${renderIncomeRow(data, 3)}
                    </div>
                </div>
            </div>

            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Credit Card / Financial Information</h4></div>
                    <div class='card-body'>
                        <div class='row'>
                            <div class='col-sm-3'><label>Car Loan: Lien Holder</label><b>${escape(data.carLienHolder)}</b></div>
                            <div class='col-sm-3'><label>Balance Owed</label><b>${escape(data.carBalance)}</b></div>
                            <div class='col-sm-3'><label>Monthly Payment</label><b>${escape(data.carMonthlyPayment)}</b></div>
                            <div class='col-sm-3'><label>Creditor's Phone Number</label><b>${escape(data.carCreditorsPhone)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'><label>Credit Card: Company</label><b>${escape(data.creditCard1Company)}</b></div>
                            <div class='col-sm-3'><label>Balance Owed</label><b>${escape(data.creditCard1Balance)}</b></div>
                            <div class='col-sm-3'><label>Monthly Payment</label><b>${escape(data.creditCard1MonthlyPayment)}</b></div>
                            <div class='col-sm-3'><label>Creditor's Phone Number</label><b>${escape(data.creditCard1CreditorsPhone)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'><label>Credit Card: Company</label><b>${escape(data.creditCard2Company)}</b></div>
                            <div class='col-sm-3'><label>Balance Owed</label><b>${escape(data.creditCard2Balance)}</b></div>
                            <div class='col-sm-3'><label>Monthly Payment</label><b>${escape(data.creditCard2MonthlyPayment)}</b></div>
                            <div class='col-sm-3'><label>Creditor's Phone Number</label><b>${escape(data.creditCard2CreditorsPhone)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'><label>Credit Card: Company</label><b>${escape(data.creditCard3Company)}</b></div>
                            <div class='col-sm-3'><label>Balance Owed</label><b>${escape(data.creditCard3Balance)}</b></div>
                            <div class='col-sm-3'><label>Monthly Payment</label><b>${escape(data.creditCard3MonthlyPayment)}</b></div>
                            <div class='col-sm-3'><label>Creditor's Phone Number</label><b>${escape(data.creditCard3CreditorsPhone)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'><label>Child Support/Other Credit Owed</label><b>${escape(data.otherCredit)}</b></div>
                            <div class='col-sm-3'><label>Balance Owed</label><b>${escape(data.otherCreditBalance)}</b></div>
                            <div class='col-sm-3'><label>Monthly Payment</label><b>${escape(data.otherCreditMonthlyPayment)}</b></div>
                            <div class='col-sm-3'><label>Creditor's Phone Number</label><b>${escape(data.otherCreditCreditorsPhone)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'><label>Bank Account: Name of Bank</label><b>${escape(data.bankAccountName)}</b></div>
                            <div class='col-sm-3'><label>Balance</label><b>${escape(data.bankAccountBalance)}</b></div>
                            <div class='col-sm-3'><label>Monthly Payment</label><b>${escape(data.bankAccountMonthlyPayment)}</b></div>
                            <div class='col-sm-3'><label>Account Number</label><b>${escape(data.bankAccountNumber)}</b></div>
                        </div>
                    </div>
                </div>
            </div>


            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Emergency / Personal Reference</h4></div>
                    <div class='card-body'>
                        ${renderContactRow(data, 'emergency', 'Emergency Contact', 1)}
                        ${renderContactRow(data, 'emergency', 'Emergency Contact', 2)}
                        ${renderContactRow(data, 'reference', 'Personal Reference', 1)}
                        ${renderContactRow(data, 'reference', 'Personal Reference', 2)}
                    </div>
                </div>
            </div>

            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Questions</h4></div>
                    <div class='card-body'>
                        <div class='row'>
                            <div class='col-sm-6'><label>Has applicant ever been sued for bills?</label><b>${yesNo(data.questionBeenSued)}</b></div>
                            <div class='col-sm-6'><label>Has applicant ever been locked out of their apartment by the sheriff?</label><b>${yesNo(data.questionLockedOutSheriff)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-6'><label>Has applicant ever been bankrupt?</label><b>${yesNo(data.questionBeenBankrupt)}</b></div>
                            <div class='col-sm-6'><label>Has applicant ever been brought to court by a landlord?</label><b>${yesNo(data.questionBroughtToCourt)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-6'><label>Has applicant ever been guilty of a felony?</label><b>${yesNo(data.questionFelony)}</b></div>
                            <div class='col-sm-6'><label>Has applicant ever moved owing rent or damages to an apartment?</label><b>${yesNo(data.questionMovedOwingMoney)}</b></div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-6'><label>Has applicant ever broken a lease?</label><b>${yesNo(data.questionBrokenLease)}</b></div>
                            <div class='col-sm-6'><label>Is the total move-in amount available now (rent and deposit)?</label><b>${yesNo(data.questionMoveInAmountAvailable)}</b></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='container entry'>
                <div class='card'>
                    <div class='card-header'><h4>Authorization</h4></div>
                    <div class='card-body'>
                        <div class='row'>
                            <div class='col-sm-12'>
                                <p>By checking the box below an submitting this form, applicant authorizes the landlord to contact past and present landlords, employers, creditors, credit bureaus, neighbors, and any other sources deemed necessary to investigate applicant. All information is true, accurate, and complete to the best of applicant's knowledge. Landlord reserves the right to disqualify tenant if information is not as represented. ANY PERSON OR FIRM IS AUTHORIZED TO RELEASE INFORMATION ABOUT THE UNSIGNED UPON PRESENTATION OF THIS FORM OR A PHOTOCOPY OF THIS FORM AT ANY TIME.</p>
                            </div>
                            <div class='col-sm-6'><label>Do you agree to the above, confirming that it is all true, accurate, and complete?</label><b>${yesNo(data.finalConfirmation)}</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </body>
    </html>
    `
}

module.exports = {
    render,
}
