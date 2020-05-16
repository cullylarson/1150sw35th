require('module-alias/register')
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const {createPool} = require('mysql')
const apiController = require('./api-controller')
const entryController = require('./entry-controller')
const port = process.env.PORT || 3020
const app = express()

const devMode = process.env.NODE_ENV !== 'production'

const getConfig = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../config.json'))

        return data
            ? JSON.parse(data)
            : null
    }
    catch(e) {
        return null
    }
}

const getManifest = (() => {
    let cachedManifest

    return () => {
        // don't cache in dev mode; just re-read it every time
        if(!devMode && cachedManifest) return cachedManifest

        cachedManifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/client/manifest.json'), 'utf8'))

        return cachedManifest
    }
})()

const manifestEntryToEl = (path) => {
    if(/\.js$/.test(path)) return `<script type="text/javascript" src="${path}"></script>`
    else if(/\.css$/.test(path)) return `<link rel="stylesheet" type="text/css" href="${path}">`
    else return ''
}

const formatApiUrl = (url) => {
    if(!url) return null

    return url.replace(/\/$/, '') // no trailing slash
}

const config = getConfig()
if(!config) process.exit(1)

// check that the manifest exists
if(!getManifest()) process.exit(1)

const renderGoogleAnalytics = (trackingId) => {
    if(!trackingId) return ''

    return `
<script async src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${trackingId}');
</script>
    `
}

const pool = createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.pass,
    database: config.db.name,
})

const clientConfig = {
    api: {
        ...config.api,
        baseUrl: formatApiUrl(config.api.baseUrl),
    },
    contact: config.contact,
}

const staticPath = path.resolve(__dirname, '../build/client/')

// serves all static files
app.use(express.static(staticPath))

app.post('/api/submit', bodyParser.json(), apiController.submit(pool, config.view.baseUrl, config.notify.from, config.notify.recipients, config.twilio.accountSid, config.twilio.authToken, config.twilio.from, config.twilio.to))
app.get('/view/:publicId', entryController.view(pool))

// all other paths defer to the SPA
app.get('*', (req, res) => {
    const manifest = getManifest()

    res.send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        ${renderGoogleAnalytics(config.ga.trackingId)}

        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:300,300i,400,400i,500,500i" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

        ${manifestEntryToEl(manifest['bundle.js'])}
        ${manifestEntryToEl(manifest['bundle.css'])}

        <title>1150 SW 35th St. Corvallis, OR 97333</title>
    </head>
    <body>
        <div id="app"></div>
        <script>
            (function() {
                if(!window.elevenfifty) return

                const clientConfig = ${JSON.stringify(clientConfig)}

                window.elevenfifty.start(document.getElementById('app'), clientConfig)
            })()
        </script>
    </body>
</html>`)
})

app.listen(port)
