# Delete User's Thought

Delete the thought of the authenticated user if they are owner.

**URL** : `/thoughts/:id`

**URL Parameters** : 
* `id=[integer]` where `id` is the ID of the thought to delete.

**Method** : `DELETE`

**Auth required** : YES

**Required Headers** : 
* `Authorization` : `Bearer [token from /token]`

**Permissions required** : User is owner of that thought

**Data** : `{}`

## Success Response

**Condition** : If the thought exists and the user is the owner.

**Code** : `204 NO CONTENT`

**Content** : `{}`

## Error Responses

**Condition** : If there was no thought available to delete.

**Code** : `404 NOT FOUND`

**Content** : `That thought doesn't exist`

### Or

**Condition** : Authorized user is not owner of the thought.

**Code** : `401 UNAUTHORIZED`

**Content** : `Invalid token`

### Or

**Condition** : User didn't provide an authorization token

**Code** : `401 UNAUTHORIZED`

**Content** : `No token provided`