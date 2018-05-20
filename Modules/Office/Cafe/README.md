# Run development

```Shell
ng serve --port 44514
```

# Run production (in docker)

```Shell
docker build -t cellar.office.cafe .
docker run -d -p 44514:44514 -t cellar.office.cafe
```

# Create Project

```Shell
ng config -g cli.packageManager yarn
```

```Shell
ng new materialTest2 --style=scss
```

```Shell
cd materialTest2
ng add @angular/material
```

# Material schematics 
You can generate directly a new material component - 
https://material.angular.io/guide/schematics


Generate side navigation
```Shell
ng generate @angular/material:material-nav --name=main-nav
```

Generate table
```Shell
ng generate @angular/material:material-table --name=main-table
```

Generate dashboard
```Shell
ng generate @angular/material:material-dashboard --name=main-dash
```

# Custom

Generate empty component
```Shell
ng generate component main-empty
```

Generate routing module
```Shell
ng generate module app-routing --flat --module=app
```


