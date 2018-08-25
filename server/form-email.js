const nodemailer = require('nodemailer')
const dateFns = require('date-fns')

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

const getBody = (viewBaseUrl, publicId, created, data) => {
    viewBaseUrl = viewBaseUrl.replace(/\/$/, '') // no trailing slash

    return `
${formatDate(created)}

Name: ${getFullName(data)}
Email: ${data.email}
Phone: ${data.phone}

${viewBaseUrl}/${publicId}
`
}

const sendEntryNotification = (viewBaseUrl, from, recipients, entry) => {
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
            text: getBody(viewBaseUrl, entry.publicIdentifier, entry.created, data),
        }, (err, info) => {
            if(err) reject(err)
            else resolve(info)
        })
    })
}

module.exports = {
    sendEntryNotification,
}
