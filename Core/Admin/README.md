# Run development

```Shell
ng serve --port 44402
```

# Run PWA

```Shell
ng build --prod
node server.js
```

# Run production (in docker)

```Shell
docker build -t cellar.hub.core.admin .
docker run -d -p 44402:44402 -t cellar.hub.core.admin
```
