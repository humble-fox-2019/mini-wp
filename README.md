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

**Articles Api**

Body: body