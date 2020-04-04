# Post New A Thought

Post the thought of the authenticated user if they are owner.

**URL** : `/thoughts/`

**Method** : `POST`

**Auth required** : YES

**Required Headers** : 
* `Authorization` : `Bearer [token from /token]`


**Data constraints**

```json
{
    "userId": "[string that matches the user ID in your JWT]",
    "content": "[string between 3 and 400 characters]"
}
```

**Data example**

```json
{
  "userId": "8b5f97ac-9dad-4f35-bf00-37a193aae76c",
  "content": "Dogs reached space before humans."
}
```

## Success Response

**Condition** : If the thought content is valid and the user is the owner.

**Code** : `201 CREATED`

**Content** : 

```json
{
  "id": 12898,
  "user_id": "8b5f97ac-9dad-4f35-bf00-37a193aae76c",
  "content": "Dogs reached space before humans.",
  "created_at": "2020-04-04T15:39:28.763Z"
}
```

## Error Responses

**Condition** : If there was no content key in the request body.

**Code** : `400 BAD REQUEST`

**Content** : `Thought must contain content`

### Or

**Condition** : Authorized user is not owner of the thought.

**Code** : `401 UNAUTHORIZED`

**Content** : `Invalid token`

### Or

**Condition** : User didn't provide an authorization token

**Code** : `401 UNAUTHORIZED`

**Content** : `No token provided`

