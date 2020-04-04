# Get A Token For Auth

This endpoint is used to get a token to use in subsequent requests to the server.

**URL** : `/thoughts/token`

**Method** : `POST`

**Auth required** : NO

## Success Response

**Condition** : If the thought content is valid and the user is the owner.

**Code** : `201 CREATED`

**Content** : 

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MTY0YjQ5MS1lM2JhLTQ4NzEtOTBjZC1lODA2YWVjOTBjMDkiLCJpYXQiOjE1ODYwMzA5NzJ9.tjyoNcpocoxXypRIEp0zX4NG27FVh6mRu6j5BnAu0RE"
}
```

## Error Responses

**Condition** : Something went wrong.

**Code** : `500 Internal Server Error`

## Note
Make sure to place this in the `Authorization` header with a value of `Bearer [token]`.