# mini-wp

## **Deploy**
```
http://mini-wp.ayusudi.com
```

#  List of Routes API
| HTTP   | Routes              | Headers  | Body                         | Description                  |
| ---    | -----               | ---      | ---                          | ---                          |
| POST   | /users/create       | none     | name,email, password         | Register new user            |
| POST   | /users/login        | none     | email, password              | For login                    |
| POST   | /users/signGoogle   | none     | googleToken                  | For login with google signin |
| POST   | /articles/upload    | none     | image(file.jpeg)             | For upload to google storage |
| POST   | /articles/create    | token    | title,content,image(jpg)     | Create an article            |
| GET    | /articles/myarticle | token    | none                         | To get all of user articles  |
| PUT    | /articles/:id       | token    | title,content,image(jpg)     | Edit one article             |
| DELETE | /articles/:id       | token    | none                         | Deleta one article           |


---

## Register
- URL:  `/users/register`
- Method: `POST`
- Status Code:  **`200`**

Request (Example): 
```
{
	name : "Luffy Cat",
	email : "admin@mail.com"
	password : "12345678",
}
```

Respond (Example):
```
{
    "message": "Success Create",
    "user": {
        "_id": "5d7ed4b151c2590c1a35df25",
        "name": "Luffy Cat",
        "email": "admin@mail.com",
        "password": "$2a$10$CdMCLtFY2L3I5cbUx7//UuAbZXAoXDHWpCT6VYTQKy00kEgjTjXSO",
        "createdAt": "2019-09-16T00:17:54.136Z",
        "updatedAt": "2019-09-16T00:17:54.136Z"
    }
}
```
<br>

## Login
- URL:  `/users/login`
- Method: `POST`
- Status Code:  **`200`**

Request (Example): 
```
{
	email : "admin@mail.com",
	password : "12345678"
}
```

Respond (Example):
```
{
    "token": "eyJhbGciOiJIUzI1Ni,IsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlZDRiMTUxYzI1OTBjMWEzN"
}
```


# Error handler

Error Status:
`401` : Unauthorized access, Authentication needed
`403` :  Wrong Email/Password, No Access to certain post
`404` : No post found
`500`: Internal Server Error

