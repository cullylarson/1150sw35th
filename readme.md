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
