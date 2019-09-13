
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDdiOTYxNzU3ZWQ0MTI0ZTYyNDJlODAiLCJlbWFpbCI6Inpha2lAbWFpbC5jb20iLCJpYXQiOjE1NjgzODA1MDN9.........."
}
```  

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/users/oauth` | `POST` | `none` | `id_token:String`

Code : `200`  
Response :
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDdiOTYxNzU3ZWQ0MTI0ZTYyNDJlODAiLCJlbWFpbCI6Inpha2lAbWFpbC5jb20iLCJpYXQiOjE1NjgzODA1MDN9.........."
}
``` 

## LIST OF ARTICLE ROUTER

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/articles` | `GET` | `token:String` | `none`

Code : `200`  
Response :
```
[
    {
        "tags": [
            "sequelize",
            "mongodb"
        ],
        "_id": "5d7ba424b7225e2a2b7dffbf",
        "title": "Eleventh Articles",
        "content": "Artikel yang ke sekian",
        "userId": {
            "_id": "5d7b961757ed4124e6242e80",
            "email": "zaki@mail.com"
        },
        "createdAt": "2019-09-13T14:13:56.060Z",
        "updatedAt": "2019-09-13T14:13:56.060Z",
        "__v": 0
    },
    {
        "tags": [
            "Database",
            "Mongoose"
        ],
        "_id": "5d7ba51aafe84c2a58c1cb16",
        "title": "Search Articles",
        "content": "Artikel yang ke sekian",
        "userId": {
            "_id": "5d7b961757ed4124e6242e80",
            "email": "zaki@mail.com"
        },
        "createdAt": "2019-09-13T14:18:02.559Z",
        "updatedAt": "2019-09-13T14:18:02.559Z",
        "__v": 0
    }
]
``` 

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/articles` | `POST` | `token:String` | `title:String, content:String, tags:Array`

Code : `201`  
Response :
```
{
    "tags": [
        "Database",
        "Mongoose"
    ],
    "_id": "5d7ba51aafe84c2a58c1cb16",
    "title": "Search Articles",
    "content": "Artikel yang ke sekian",
    "userId": "5d7b961757ed4124e6242e80",
    "createdAt": "2019-09-13T14:18:02.559Z",
    "updatedAt": "2019-09-13T14:18:02.559Z",
    "__v": 0
}
```  

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/articles/:id` | `GET` | `token:String` | `none`

Code : `200`  
Response :
```
{
        "tags": [
            "Database",
            "Mongoose"
        ],
        "_id": "5d7ba51aafe84c2a58c1cb16",
        "title": "Search Articles",
        "content": "Artikel yang ke sekian",
        "userId": {
            "_id": "5d7b961757ed4124e6242e80",
            "email": "zaki@mail.com"
        },
        "createdAt": "2019-09-13T14:18:02.559Z",
        "updatedAt": "2019-09-13T14:18:02.559Z",
        "__v": 0
    }
```  

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/articles/:id` | `PATCH` | `token:String` | `title:String, content:String`

Code : `200`  
Response :
```
{
    "message": "Success update an article"
}
```  

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/articles/:id` | `DELETE` | `token:String` | `none`

Code : `200`  
Response :
```
{
    "message": "Success delete an article"
}
```  

Route | HTTP | Headers | Body
----- | ---- | ------- | ----
`/articles/search/:tag` | `GET` | `token:String` | `none`

Code : `200`  
Response :
```
[
    {
        "tags": [
            "sequelize",
            "mongodb"
        ],
        "_id": "5d7ba424b7225e2a2b7dffbf",
        "title": "Eleventh Articles",
        "content": "Artikel yang ke sekian",
        "userId": {
            "_id": "5d7b961757ed4124e6242e80",
            "email": "zaki@mail.com"
        },
        "createdAt": "2019-09-13T14:13:56.060Z",
        "updatedAt": "2019-09-13T14:13:56.060Z",
        "__v": 0
    },
    {
        "tags": [
            "Database",
            "Mongoose"
        ],
        "_id": "5d7ba51aafe84c2a58c1cb16",
        "title": "Search Articles",
        "content": "Artikel yang ke sekian",
        "userId": {
            "_id": "5d7b961757ed4124e6242e80",
            "email": "zaki@mail.com"
        },
        "createdAt": "2019-09-13T14:18:02.559Z",
        "updatedAt": "2019-09-13T14:18:02.559Z",
        "__v": 0
    }
]
```