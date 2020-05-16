const nodemailer = require('nodemailer')
const dateFns = require('date-fns')
const Twilio = require('twilio')

const getFullName = (data) => {
    return [
        data.firstName,
        data.middleName,
        data.lastName,
    ].filter(x => !!x).join(' ')
}

const formatDate = x => x ? dateFns.format(x, 'MMM Do, YYYY') : ''

const getSubject = (data) => {
    return 'Application / ' + getFullName(data)
}

const getEmailBody = (viewBaseUrl, publicId, created, data) => {
    viewBaseUrl = viewBaseUrl.replace(/\/$/, '') // no trailing slash

    return `
${formatDate(created)}

Name: ${getFullName(data)}
Email: ${data.email}
Phone: ${data.phone}

${viewBaseUrl}/${publicId}
`
}

const getSmsMessage = (viewBaseUrl, publicId, created, data) => {
    viewBaseUrl = viewBaseUrl.replace(/\/$/, '') // no trailing slash

    return `
${formatDate(created)}

Name: ${getFullName(data)}
Email: ${data.email}
Phone: ${data.phone}

${viewBaseUrl}/${publicId}
`
}

const sendEntryNotificationEmail = (viewBaseUrl, from, recipients, entry) => {
    const data = JSON.parse(entry.data)

    const transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail',
    })

    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: from,
            to: recipients,
            subject: getSubject(data),
            text: getEmailBody(viewBaseUrl, entry.publicIdentifier, entry.created, data),
        }, (err, info) => {
            if(err) reject(err)
            else resolve(info)
        })
    })
}

const sendEntryNotificationSms = (viewBaseUrl, twilioAccountSid, twilioAuthToken, from, toList, entry) => {
    if(!twilioAccountSid || !twilioAuthToken || !from || !toList) return Promise.resolve()

    const client = Twilio(twilioAccountSid, twilioAuthToken)

    const recipients = toList.split(',').map(x => x.trim())

    return Promise.all(recipients.map(to => {
        return client.messages.create({body: getSmsMessage(viewBaseUrl, entry.publicIdentifier, entry.created, JSON.parse(entry.data)), from, to})
    }))
}

module.exports = {
    sendEntryNotificationEmail,
    sendEntryNotificationSms,
}
