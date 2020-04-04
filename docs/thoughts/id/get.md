# Get A Specific Thought

This endpoint is used for getting a specific thought based on the supplied thought ID. This is used for the sharing feature on the client.

**URL** : `/thoughts/:id`

**URL Parameters** : 
* `id=[integer]` where `id` is the ID of the thought to fetch.

**Method** : `GET`

**Auth required** : NO

**Data**: `{}`

## Success Response

**Condition** : The provided ID matches the ID of a thought in the database.

**Code** : `200 OK`

**Content example**

```json
{
  "id": 12898,
  "user_id": "8b5f97ac-9dad-4f35-bf00-37a193aae76c",
  "content": "Dogs reached space before humans.",
  "created_at": "2020-04-04T15:39:28.763Z"
}
```

## Error Responses

**Condition** : If there is no thought to return.

**Code** : `404 NOT FOUND`

**Content** : `That thought doesn't exist`
