# Run development

```Shell
ng serve --port 44515
```

# Run PWA

```Shell
ng build --prod
node server.js
```

# Run production (in docker)

```Shell
docker build -t cellar.office.welcome .
docker run -d -p 44515:44515 -t cellar.office.welcome
```