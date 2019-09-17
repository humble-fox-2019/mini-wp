# Hackticle

```
Client :
http://winiwp-ghz.maulanaghozi.web.id

BaseURL / Server :
http://35.187.228.79
```

## **List of User Routes** :

| HTTP    | Routes         | Headers | Body                     | Description                  |
| ---     | -----          | ---     | ---                      | ---                          |
| POST    | /users         | none    | name,email, password     | Register new user            |
| POST    | /users/login   | none    | email,password           | Login user                   |
| POST    | /users/signin  | none    | token                    | Login 3rd API (google)       |

---

## **List of Article Routes**

| HTTP    | Routes           | Headers | Body                                     | Description                                   |
| ---     | -----            | ---     | ---                                      | ---                                           |
| GET     | /articles/userId | token   | none                                     | read all article where author is user id      |
| POST    | /articles        | token   | {title, content, tags, published, photo} | Create new Article (authentication)           |
| PUT     | /articles/:id    | token   | {title, content, tags, published, photo} | Update article (authentication, authoriation) |
| DELETE  | /articles/:id    | token   | none                                     | Delete image (authentication, authorization)  |

---

## **Response**

1. Routes   : /users
- Method   : POST
```
Response :
{
    "data": {
        "_id": "5d7eedb4e0824c0c4dxxxxx",
        "name": "admin",
        "password": "xxxxxxxxxxxxxxxxxxx",
        "email": "xxxxx@gmail.com",
        "createdAt": "2019-09-16T02:04:36.901Z",
        "updatedAt": "2019-09-16T02:04:36.901Z",
        "__v": 0

    }
}
```

2. Routes   : /users/login
- Method   : POST
```
Response :
{
    "message": "Login Success",
    "id": "5d7eedb4e0xxxxxxxxxxxx",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2VlZGI0ZTA4MjRjMGM0ZGE1ZWFjYiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNTY4NTk5NTkzfQ.Lxxxxxxxxxxxxxxxxxxxxxxx"
}
```

3. Routes   : /users/signin
- Method   : POST
```
Response :
{
    "message": "Login Success",
    "id": "5d7eedb4e0xxxxxxxxxxxx",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2VlZGI0ZTA4MjRjMGM0ZGE1ZWFjYiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNTY4NTk5NTkzfQ.Lxxxxxxxxxxxxxxxxxxxxxxx"
}
```

4. Routes   : /articles
- Method   : POST
```
Response :
{
    "tags": [
        "makan",
        "minum",
        "hacktiv8",
        "tidur"
    ],
    "_id": "5d7f16ffe0824xxxxxxx",
    "title": "Siswa kelas 9 berhasil menembus security google",
    "author": "5d7eedb4e0824c0c4dxxxxxx",
    "content": "kita harus bangga pada siswa kelas 9 ini karena kecerdasannya dia dapat masuk ke dalam security google",
    "published": true,
    "photo": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "createdAt": "2019-09-16T05:00:47.303Z",
    "updatedAt": "2019-09-16T05:00:47.303Z"
}
```


4. Routes   : /articles/userId
- Method   : GET
```
Response : 
{
    "articles": [
        {
        "tags": [
            "makan",
            "minum",
            "hacktiv8",
            "tidur"
        ],
        "_id": "5d7f16ffe0824c0c4xxxxxxx",
        "title": "Siswa kelas 9 berhasil menembus security google",
        "author": "5d7eedb4e0824c0c4dxxxxx",
        "content": "kita harus bangga pada siswa kelas 9 ini karena kecerdasannya dia dapat masuk ke dalam security google",
        "published": true,
        "photo": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "createdAt": "2019-09-16T05:00:47.303Z",
        "updatedAt": "2019-09-16T05:00:47.303Z"
        }, ........
    ],
    "Author": "admin"
}
```
