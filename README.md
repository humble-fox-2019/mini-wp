# mini-wp

server : http:localhost:3000

**User Api**

POST /users/register

Body: email, username, password

Reponse: 201,{

    "message": "Success"

}

Error Example: 400,{

    "message": "This email is already
    exist, This username is already exist"

}


POST /users/loginform

Body: email, password

Response: 200,{

    "token": "eyJhbGciOiJIUzIalksdlakdnclaskd",
    "username": "test"

}

ErrorExample: 400,{

    "message": "invalid password"

}

POST /users/logingoogle

Body: token

Response: 200,{

    "token": "eyJhbGciOiJIUzIalksdlakdnclaskd",
    "username": "test"

}

ErrorExample: 500,{

    "message": "Internal server Error"

}

**Articles Api**

**GET /articles**

*Ada bug disini nggak tau kenapa req.body gak bisa keluar jadi data saya taruh di headers, Sudah tanya dua orang mereka juga gak tau solusinya*

Headers: token, publish

Body: -

Response: [

{

    "publish": true,
    "_id": "5d7e28d6cb206e9e10c13d31",
    "tag": [],
    "categorize": [],
    "title": "China Basically Admits It’s Been Sanctioning U.S. Soy",
    "content": "<p class=\"speakable-paragraph\" style=\"box-sizing: border-box; margin-top: 1.2rem; margin-bottom: 1.2rem; color: rgb(51, 51, 51); font-family: tabular-numbers, Georgia, Cambria, &quot;Times New Roman&quot;, Times, serif; font-size: 18px; font-variant-ligatures: common-ligatures; background-color: rgb(252, 252, 252);\">China and the U.S. agreed yet again to a cease fire that may or may not last until though their 25% tariff does not make U.S. soy any more expensive than Brazilian soy.</p>",

    "userId": "5d7c4b5efdacdc629e551966",

    "createdAt": "2019-09-15T12:04:38.397Z",

    "updatedAt": "2019-09-15T12:08:04.162Z",

    "__v": 0

},

Error: 401,{
    "message": "You need to login first"
}


**POST /articles**

Headers: token

Body:

Response:

Error:


**PATCH /articles/:_id**

Headers: token

Body:

Response:

Error:


**DELETE /articles/:_id**

Headers: token

Body: -

Response:200,{
    "n": 1,
    "ok": 1,
    "deletedCount": 1

}

Error: 401,{

    "message": "You need to login first"

}

``local``:

npm install on server and client

npm run dev on server

parcel on client

Or you can visit the website through this link http://wp.thproject.in

