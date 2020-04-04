# Update A Thought

Update the thought of the authenticated user if they are owner.

**URL** : `/thoughts/:id`

**URL Parameters** : 
* `id=[integer]` where `id` is the ID of the thought to update.

**Method** : `PATCH`

**Auth required** : YES

**Required Headers** : 
* `Authorization` : `Bearer [token from /token]`

**Permissions required** : User is owner of that thought

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

**Condition** : If the thought exists and the user is the owner.

**Code** : `200 OK`

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

