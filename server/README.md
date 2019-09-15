
## LIST OF BASIC ROUTER

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/` | `GET` | `none` | `none`

Code : `200`  
Response :
```
{
    "message": "app is running"
}
```

## LIST OF USER ROUTER

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/users/register` | `POST` | `none` | `email:String, password:String`

Code : `201`  
Response :
```
{
    "_id": "5d7b993f3e28e725c5af3f16",
    "email": "admin@mail.com"
}
```  

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/users/login` | `POST` | `none` | `email:String, password:String`

Code : `200`  
Response :
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5c.........."
}
```  

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/users/oauth` | `POST` | `none` | `id_token:String`

Code : `200`  
Response :
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5c.........."
}
``` 

## LIST OF ARTICLE ROUTER

Route | HTTP | Headers | Body | Descrition | Additional info
----- | ---- | ------- | ---- | ---------- | ---------------
`/articles` | `GET` | `token:String` | `none` | get all user's articles | Authentication required

Code : `200`  
Response :
```
[
    {
        "tags": [
            "bali",
            "pura"
        ],
        "_id": "5d7e0a7f70339075d39cef0a",
        "title": "pura bali",
        "content": "artikel tentang kehidupan di bali",
        "userId": {
            "_id": "5d7dfb3a568ea771d7ddd0a3",
            "email": "admin@mail.com"
        },
        "url": "https://storage.googleapis.com/storage-mini-wp.zakiarsyad.com/1568541310778bali.jpg",
        "createdAt": "2019-09-15T09:55:11.477Z",
        "updatedAt": "2019-09-15T09:55:11.477Z",
        "__v": 0
    },
    {
        "tags": [
            "klasik",
            "mobil"
        ],
        "_id": "5d7e0a4270339075d39cef09",
        "title": "mobil klasik",
        "content": "artikel tentang mobil-mobil klasik",
        "userId": {
            "_id": "5d7dfb3a568ea771d7ddd0a3",
            "email": "admin@mail.com"
        },
        "url": "https://storage.googleapis.com/storage-mini-wp.zakiarsyad.com/1568541246358markus-spiske-TzyIQe2SxHk-unsplash.jpg",
        "createdAt": "2019-09-15T09:54:10.580Z",
        "updatedAt": "2019-09-15T09:54:10.580Z",
        "__v": 0
    }
]
``` 

Route | HTTP | Headers | Body | Descrition | Additional info
----- | ---- | ------- | ---- | ---------- | ---------------
`/articles` | `POST` | `token:String` | `title:String, content:String, tags:Array, image:File` | post a new article | Authentication required

Code : `201`  
Response :
```
{
    "tags": [
        "klasik",
        "mobil"
    ],
    "_id": "5d7e0a4270339075d39cef09",
    "title": "mobil klasik",
    "content": "artikel tentang mobil-mobil klasik",
    "userId": "5d7dfb3a568ea771d7ddd0a3",
    "url": "https://storage.googleapis.com/storage-mini-wp.zakiarsyad.com/1568541246358markus-spiske-TzyIQe2SxHk-unsplash.jpg",
    "createdAt": "2019-09-15T09:54:10.580Z",
    "updatedAt": "2019-09-15T09:54:10.580Z",
    "__v": 0
}
```  

Route | HTTP | Headers | Body | Descrition | Additional info
----- | ---- | ------- | ---- | ---------- | ---------------
`/articles/:id` | `GET` | `token:String` | `none` | get single article | Authentication and Authorization required

Code : `200`  
Response :
```
{
    "tags": [
        "bali",
        "pura"
    ],
    "_id": "5d7e0a7f70339075d39cef0a",
    "title": "pura bali",
    "content": "artikel tentang kehidupan di bali",
    "userId": {
        "_id": "5d7dfb3a568ea771d7ddd0a3",
        "email": "admin@mail.com"
    },
    "url": "https://storage.googleapis.com/storage-mini-wp.zakiarsyad.com/1568541310778bali.jpg",
    "createdAt": "2019-09-15T09:55:11.477Z",
    "updatedAt": "2019-09-15T09:55:11.477Z",
    "__v": 0
}
```  

Route | HTTP | Headers | Body | Descrition | Additional info
----- | ---- | ------- | ---- | ---------- | ---------------
`/articles/:id` | `PATCH` | `token:String` | `title:String, content:String, tags:Array, image:File` | edit single article | Authentication and Authorization required

Code : `200`  
Response :
```
{
    "tags": [
        "pura",
        "denpasar"
    ],
    "_id": "5d7e0a7f70339075d39cef0a",
    "title": "pura denpasar",
    "content": "artikel tentang kehidupan di denpsar",
    "userId": "5d7dfb3a568ea771d7ddd0a3",
    "url": "https://storage.googleapis.com/storage-mini-wp.zakiarsyad.com/1568544689468john-westrock-7Q-x0TH6z4w-unsplash.jpg",
    "createdAt": "2019-09-15T09:55:11.477Z",
    "updatedAt": "2019-09-15T10:51:35.282Z",
    "__v": 1
}
```  

Route | HTTP | Headers | Body | Descrition | Additional info
----- | ---- | ------- | ---- | ---------- | ---------------
`/articles/:id` | `DELETE` | `token:String` | `none` | delete single article | Authentication and Authorization required

Code : `200`  
Response :
```
{
    "tags": [
        "klasik",
        "mobil"
    ],
    "_id": "5d7e0a4270339075d39cef09",
    "title": "mobil klasik",
    "content": "artikel tentang mobil-mobil klasik",
    "userId": "5d7dfb3a568ea771d7ddd0a3",
    "url": "https://storage.googleapis.com/storage-mini-wp.zakiarsyad.com/1568541246358markus-spiske-TzyIQe2SxHk-unsplash.jpg",
    "createdAt": "2019-09-15T09:54:10.580Z",
    "updatedAt": "2019-09-15T09:54:10.580Z",
    "__v": 0
}
```  

Route | HTTP | Headers | Body | Descrition | Additional info
----- | ---- | ------- | ---- | ---------- | ---------------
`/articles/search/:tag` | `GET` | `token:String` | `none` | get user's articles by tag | Authentication required

Code : `200`  
Response :
```
[
    {
        "tags": [
            "klasik",
            "mobil"
        ],
        "_id": "5d7e0a4270339075d39cef09",
        "title": "mobil klasik",
        "content": "artikel tentang mobil-mobil klasik",
        "userId": {
            "_id": "5d7dfb3a568ea771d7ddd0a3",
            "email": "admin@mail.com"
        },
        "url": "https://storage.googleapis.com/storage-mini-wp.zakiarsyad.com/1568541246358markus-spiske-TzyIQe2SxHk-unsplash.jpg",
        "createdAt": "2019-09-15T09:54:10.580Z",
        "updatedAt": "2019-09-15T09:54:10.580Z",
        "__v": 0
    },
    {
        "tags": [
            "pura",
            "denpasar"
        ],
        "_id": "5d7e0a7f70339075d39cef0a",
        "title": "pura denpasar",
        "content": "artikel tentang kehidupan di denpsar",
        "userId": {
            "_id": "5d7dfb3a568ea771d7ddd0a3",
            "email": "admin@mail.com"
        },
        "url": "https://storage.googleapis.com/storage-mini-wp.zakiarsyad.com/1568544689468john-westrock-7Q-x0TH6z4w-unsplash.jpg",
        "createdAt": "2019-09-15T09:55:11.477Z",
        "updatedAt": "2019-09-15T10:51:35.282Z",
        "__v": 1
    }
]
```

## Error Status
Code | Name | Description
---- | ---- | -----------
400 | Bad request | We could not process that action. Please double check your input
401 | Unauthorized | You are not authorized to access tha page. Authorization is required
403 | Forbidden | You are not authenticated to access tha page. Authentication is required
404 | Not Found | The requested resource could not be found
500 | Internal Server Error | We had a problem with our server. Please try again later