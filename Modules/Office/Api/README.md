
This is whole office API

# Run

```Shell
go run server.d/main.go
```



# Queries

```JS
{
  cellarmeetingroom{
    id,
    email
  }
}
```

```JS
query GetMeetingRoom($id: String) {
  cellarmeetingroom(id: $id){
    id,
    email
  }
}
```

sample

```JSON
{
  "id": "5a929e871d91830009560e6f"
}
```


# Mutations

## Create


```JS
mutation CreateMeetingRoom($id: String!, 
                     $email: String!) {
  createCellarMeetingRoom(id: $id, 
                    email: $email) {
    id
    email
  }
}
```

sample
```JSON
{
  "id": "5a86c0d864a8810007816053",
  "email": "blabla@asdf.cz"
}
```


## Delete

```JS
mutation DeleteMeetingRoom($id: String!) {
  deleteCellarMeetingRoom(id: $id)
}
```

sample
```JSON
{
  "id": "5a929e871d91830009560e6f"
}
```


## Update


```JS
mutation UpdateMeetingRoom($id: String!, 
                     $email: String!) {
  updateCellarMeetingRoom(id: $id,
                    email: $email) {
    id
    email
  }
}
```

sample
```JSON
{
  "id": "5a929e871d91830009560e6f",
  "email": "asdf2222@asddf.com"
}
```