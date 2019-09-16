# Mini-WP

## User Api

**POST**  /users/register
Body: email: String, username: String, password: String
Reponse:
201,

    {
    	"message": "Success"
    }
    

 400,

    {
    	"message": "This email is already exist, This username is already exist"
    }



**POST**  /users/loginform
Body: email: String, password: String
Response: 
200,

    {
    	"token": "eyJhbGciOiJIUzIalksdlakdnclaskd",
    	"username": "test"
    }

400,

    {
    	"message": "invalid password"
    }



**POST**  /users/logingoogle
Body: token
Response: 
200,

    {
    	"token": "eyJhbGciOiJIUzIalksdlakdnclaskd",
    	"username": "test"
    }

500,

    {
    	"message": "Internal server Error"
    }



## Articles Api

**GET** /articles

*Ada bug disini nggak tau kenapa req.body gak bisa keluar jadi data(publish) saya taruh di headers, Sudah tanya dua orang mereka juga gak tau solusinya*

Headers: token, publish: Boolean
Body: -
Response: 
200,

    [
    	{
    				"publish": true,
            "_id": "5d7f955422521127a43d5db8",
            "title": "aku ingin makan bakso",
            "content": "laper bro",
            "userId": "5d7f951d22521127a43d5db6",
            "featured_image": "https://storage.googleapis.com/miniwp_images/1568642387671imgur-						meme-generator.jpg",
            "createdAt": "2019-09-16T13:59:48.018Z",
            "updatedAt": "2019-09-16T13:59:48.018Z",
            "__v": 0
    	}
    ]

401

```
{
    "message": "You need to login first"
}
```



**POST**  /articles
Headers: token
Body: image: File, title: String, content: String, publish: Boolean
Response:
201

```
{
    "publish": true,
    "_id": "5d7f96c822521127a43d5dba",
    "title": "ini mobil",
    "content": "ini gambar mobil",
    "userId": "5d7f951d22521127a43d5db6",
    "featured_image": 											    "https://storage.googleapis.com/miniwp_images/1568642759606maxresdefault.jpg",
    "createdAt": "2019-09-16T14:06:00.052Z",
    "updatedAt": "2019-09-16T14:06:00.052Z",
    "__v": 0
}
```

400,

```
{
    "message": "Title must be filled"
}
```



**PATCH** /articles/:_id
Headers: token
Body: image: File, title: String, content: String, publish: Boolean
Response:
200

```
{
    "publish": true,
    "_id": "5d7f96c822521127a43d5dba",
    "title": "ini mobil",
    "content": "ini gambar mobil",
    "userId": "5d7f951d22521127a43d5db6",
    "featured_image": "https://storage.googleapis.com/miniwp_images/1568642759606maxresdefault.jpg",
    "createdAt": "2019-09-16T14:06:00.052Z",
    "updatedAt": "2019-09-16T14:06:00.052Z",
    "__v": 0
}
```

401

```
{
    "message": "You need to login first"
}
```



**DELETE**  /articles/:_id

Headers: token
Body: -
Response:
200

```
{
    "publish": true,
    "_id": "5d7f96c822521127a43d5dba",
    "title": "ini jadi meme",
    "content": "ini gambar mobil",
    "userId": "5d7f951d22521127a43d5db6",
    "featured_image": "https://storage.googleapis.com/miniwp_images/1568642854393imgur-meme-generator.jpg",
    "createdAt": "2019-09-16T14:06:00.052Z",
    "updatedAt": "2019-09-16T14:07:34.728Z",
    "__v": 0
}
```

401

```
{
    "message": "You need to login first"
}
```



***local***:

npm install on server and client
npm run dev on server
parcel on client

Or you can visit the website through this link http://wp.thproject.in

