# Get All Posted Thoughts

Show all the thoughts on ThoughtBin

**URL** : `/thoughts`

**Query Parameters** : 
* `userId=[string]` where `userId` is the ID of the profile to fetch thoughts from.
* `offset=[integer]` where `offset` is which index to get 10 thoughts from.

**Method** : `GET`

**Auth required** : NO

**Data**: `{}`

## Success Response

**Condition** : If sufficient thoughts exist or if the userId belongs to a real user with thoughts.

**Code** : `200 OK`

**Content example**

```json
[
  {
    "id": 12898,
    "user_id": "8b5f97ac-9dad-4f35-bf00-37a193aae76c",
    "content": "Dogs reached space before humans.",
    "created_at": "2020-04-04T15:39:28.763Z"
  },
  {
    "id": 12698,
    "user_id": "8b5f97ac-9dad-4f35-bf00-37a193aae76c",
    "content": "Wooden cabins are treehouses.",
    "created_at": "2020-04-04T13:58:26.311Z"
  }
]
```

## Error Responses

**Condition** : If there are no thoughts to return.

**Code** : `404 NOT FOUND`

**Content** : `[]`


## Notes

This endpoint is used for getting the initial thoughts on page load and then getting more thoughts as the user scrolls down with the client's infinite scroll feature.

