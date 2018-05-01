
# gRPC

Generate gRPC

`make generate`


# GrapQL

```JS
query GetDashboard {
  cellarspace{
    name
  },
  cellarplace{
    name
  },
  cellarsenzor{
    name
  }  
}
```


```JS
query GetAllSpaces {
  cellarspace{
    id,
    name,
    state,
    image,
    path
  }
}
```


```JS
query GetSpace($id: String) {
  cellarspace(id: $id){
    id,
    name
  }
}
```

sample

```JSON
{
  "id": "5a86c0d864a8810007816053"
}
```



```JS
query GetPlace {
  cellarplace{
    id,
    name,
    path
  }
}
```




# Mutations

## Create

```JS
mutation CreateSpace($name: String!, 
                     $state: String!, 
                     $image: String!, 
                     $path: String! ) {
  createCellarSpace(name: $name, 
                    state: $state, 
                    image: $image, 
                    path: $path) {
    id
    name,
    state,
    image,
    path
  }
}
```

sample
```JSON
{
  "name": "SpaceFromGraphQL",
  "state": "asdf",
  "image": "asdf",
  "path": "/graphqlpath"
}
```


```JS
mutation CreatePlace($input: CreatePlaceType!) {
  createCellarPlace(input: $input) {
    id
    name,
    path
  }
}
```


sample
```JSON
{
  "input": {
    "name": "PlaceFromGraphQL",
    "path": "asdf",
    "state": "2",
    "country": "asdf",
    "city": "asdf",
    "street": "asdf",
    "zipcode": "11111",
    "latitude": "44",
    "longtitude": "44"
  }
}
```


## Delete

```JS
mutation DeleteSpace($id: String!) {
  deleteCellarSpace(id: $id)
}
```

sample
```JSON
{
  "id": "5aae739558c48c50c548e18f"
}
```


```JS
mutation DeletePlace($id: String!) {
  deleteCellarPlace(id: $id) 
}
```

sample
```JSON
{
  "id": "5aae739558c48c50c548e18f"
}
```


## Update


```JS
mutation UpdateSpace($id: String!, 
                     $name: String!, 
                     $state: String!, 
                     $image: String!, 
                     $path: String! ) {
  updateCellarSpace(id: $id,
                    name: $name, 
                    state: $state, 
                    image: $image, 
                    path: $path) {
    id
    name,
    state,
    image,
    path
  }
}
```

sample
```JSON
{
  "id": "5aad719358c48c5d62df0c86",
  "name": "SpaceFromGraphQLEDITED",
  "state": "asdf",
  "image": "asdf",
  "path": "/graphqlpath"
}
```



```JS
mutation UpdatePlace($input: UpdatePlaceType!) {
  updateCellarPlace(input: $input) {
    id
    name,
    path
  }
}
```


sample
```JSON
{
  "input": {
    "id": "5aad7d9658c48c28b406d9b9",
    "name": "PlaceFromGraphQLEDITED",
    "state": "2",
    "path": "asdf",
    "country": "asdf",
    "city": "asdf",
    "street": "asdf",
    "zipcode": "11111",
    "latitude": "44",
    "longtitude": "44"
  }
}
```


# Subsciptions



```JS
s
```