# 1150sw35th

> A simple app for submitting a rental application form.

## Development

Copy `config.json.dist` to `config.json` and edit it.

```
npm install
npm run client:watch
docker-compose up -d
```

## Production

Copy `config.json.dist` to `config.json` and edit it.

```
npm run client:build
tar cf - build config.json server node_modules package.json | gzip -> 1150.tgz
```

_or using rsync_

```
rsync -avzh --delete --exclude '/config.json' --exclude '/.db' --exclude '/.git' /local/path/to/1151sw35th/ username@remove-server.com:~/path/to/web/root/
```

### Hacky Way to Run Server

This will start the server, keep it running, and stay running after disconnecting from SSH:

```
nohup npm run server:forever &
```

## Example `config.json`

```
{
    "db": {
        "host": "db",
        "user": "dev",
        "pass": "dev",
        "name": "dev"
    },
    "api": {
        "baseUrl": "http://localhost:3020/api"
    },
    "view": {
        "baseUrl": "http://localhost:3020/view"
    },
    "contact": {
        "email": "me@example.com",
        "phone": "555-555-5555"
    },
    "notify": {
        "from": "Your Name <no-reply@example.com>",
        "recipients": "me@example.com, another-person@example.com"
    }
}
```
