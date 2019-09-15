# mini-wp
Best Mini Wordpress in Town
link: http://miniwp.jackbloo.com

# Routing

Complete Routing of this App

#  User Routes

Includes SignIn, Google SignIn, and Resgitration

# POST /user/signin

To Sign In without using google authorization


* **URL** 

    http://34.87.37.210/user/signin
* **METHOD** 

    POST
* **URL Params**

    **none**
* **Data Params** 

        email:{
            type: string
            required: true
        } ,
        password:{
            type: string
            required: true
        }

* **Success Response** 

        {
            message: 'Login Success'
            status: 200
        }

* **Error Response** 

        {
            httpStatus: 400,
            message: 'Wrong Email/Password'
        }
        or
        {
            httpStatus: 404,
            message: 'Email Not Found'    
        }




# POST /user/Gsignin

To Sign In using google authorization
* **URL** 

    http://34.87.37.210/user/Gsignin
* **METHOD** 

    POST
* **URL Params** 

    **none**
* **Data Params** 

        email:{
            type: string
            required: true
        } ,
        password:{
            type: string
            required: true
        }
* **Success Response** 

        {
            message: 'Login Success'
            status: 200
        },
* **Error Response** 

        {
            httpStatus: 500,
            message: 'Internal Server Error'    
        }


# POST /user/register

To Register 

* **URL**

    http://34.87.37.210/user/register
* **METHOD** 

    POST
* **URL Params**

    **none**
* **Data Params** 

        name:{
        type: string
        required: true
        } ,
        email:{
            type: string
            required: true
        },
        password:{
            type:string,
            required:true
        }
* **Success Response** 

            {
                message: 'Account is successfully created',
                status: 201
            }

* **Error Response** 

            {
                message: 'Internal Sever Error'
                status: 500
            }




# Article Routes

Includes, CRUD of articles, Getting current user profile, filtering articles List

# POST /articles/create

User creating articles 

* **URL**

    http://34.87.37.210/articles/create
* **METHOD**

    POST
* **Headers**

    token
* **URL Params**

    **none**
* **Data Params**

        {
            title:{
                type: string
                required: true
            } ,
            content:{
                type: string
                required: true
            },
            createdAt:{
                type:Date,
                required:true
            },
            featured_image:{
                type:String,
                required:true
            },
            author:{
                type:String,
                required:true
            },
            tags: []
        }

* **Success Response** 

        {
            message: 'article is successfully created'
            status: 201
        }

* **Error Response** 

        {
            httpStatus: 500
            message: 'Internal Server Error'
        }


# PATCH /articles/update/:id

User can update their articles

* **URL**

    http://34.87.37.210/articles/update/:id
* **METHOD**

    PATCH

* **Headers**

    token

* **URL Params**

        {
            id=[integer]
        }
* **Data Params**

    {
        title:{
            type: string
        } ,
        content:{
            type: string
        },
        featured_image:{
            type:String,
        },
    } 

* **Success Response**

        {
            data : {

        title:{
            type: string
        } ,
        content:{
            type: string
        },
        featured_image:{
            type:String,
        }, 
        },
            message: 'Data is successfully updated'
            status: 201
        }

* **Error Response**

        {
            httpStatus: 500,
            message: 'Internal Server Error
        }

# DELETE /articles/delete/:id

## Deleting User's articles

* **URL**

    http://34.87.37.210/articles/delete/:id

* **METHOD**

    DELETE

* **Headers**

    token

* **URL Params**

        id=[integer]
* **Data Params**

    **none**
* **Success Response**

        {
            title,
            content,
            featured_image,
            UserId,
            author
            },

            message: 'article is successfully deleted'
            status: 200
        }
* **Error Response**

        {
            message: 'Internal Server Error'
            httpStatus: 500
        }

# GET /articles/

## Get All Article

* **URL**

    http://34.87.37.210/articles

* **METHOD**

    GET
* **Headers**
    
    token *required*    
* **URL Params**

    **none**
* **Data Params**

    **none**
* **Success Response**

        {
            name : {
                type: string
            },
            data,
            message: 'articles are found'
            status: 200
        }

* **Error Response**

        {
            message: 'Internal Server Error'
            httpStatus: 500
        }

# GET /articles/filter/:id

## Get Article by their Id


* **URL**

    http://34.87.37.210/articles/filter/:id
* **METHOD**

    GET
* **Headers**

    token *required*
* **URL Params**

    id=[integer]
* **Data Params**

    **none**
* **Success Response**


        {
            data : {
                title,
                content,
                featured_image,
                UserId,
                author,
                tags
            },
            message: 'found your article'
            status: 200
        }
* **Error Response**

        {
            message: 'Internal Server Error'
            httpStatus: 500
        }


# GET /articles/myArticles

## Get Current User's Articles


* **URL**

    http://34.87.37.210/articles/myArticles
* **METHOD**

    GET
* **Headers**

    token *required*
* **URL Params**

    **none**
* **Data Params**

    **none**
* **Success Response**


        {
            data : {
                data (array of articles)
            },
            message: 'found your articles'
            status: 200
        }
* **Error Response**


        {
            message: 'Internal Server Error'
            httpStatus: 500
        }

#ERROR

## Error Handling

Form of Error Handling


      code: httpStatus || 500,
      message,


## 400
Error caused by the Users ('Bad request')

      code: 400,
      'Email is already Registered',



## 401
Error due to the unauthorization


      code: 401,
      'Not Authorized',



## 403
Error caused by Token

      code: 403,
      'Token Undefined',



## 404
Error caused by Server could found

      code: 404,
      'Not Found',


## 500
Error cause by Internal Server Error

      code: 500,
      'Internal Server Error',