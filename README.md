# rest-api

# MINI-WP


  #### REST API built Express and Mongoose
 

##### List of user Routes

### POST user/register
***
to register new User
#### URL
http://34.87.89.246/user/register

#### METHOD
POST
#### URL PARAMS
none
#### data 
	username : STRING (required)
	email : STRING (required)
	password : STRING (required)
#### Succes Response
	{
		token : '<your token>',
		user : {
		"_id": "5d8067d979d2453f9d4e08b6",
        "username": "ando5",
        "password": "$2a$10$FKUNaNVmJrEfMia3usm4.uiP7eu61vaqZ9pShy.5g1UUnTR..vNie",
        "email": "ando5@mail.com",
        "__v": 0
		},
		message : 'sukses add data'
	}
#### Error Response


		 {
		    "message": ""User validation failed: username: Path `username` is required",
		    "data": ""User validation failed: username: Path `username` is required"
		 }	
		status : 400 (Bad Request)
.
	
	   {
			"message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)

### POST user/login
***
to login User
#### URL
http://34.87.89.246/user/login

#### METHOD
POST
#### URL PARAMS
none
#### data 
	email : STRING (required)
	password : STRING (required)
#### Succes Response
	{
		token : '<your token>',
		user : {
		"_id": "5d8067d979d2453f9d4e08b6",
        "username": "ando5",
        "password": "$2a$10$FKUNaNVmJrEfMia3usm4.uiP7eu61vaqZ9pShy.5g1UUnTR..vNie",
        "email": "ando5@mail.com",
        "__v": 0
		},
		message : 'ando5 Anda Berhasil Login',
		user : {
		    "_id": "5d8067d979d2453f9d4e08b6",
	        "username": "ando5",
	        "password": "$2a$10$FKUNaNVmJrEfMia3usm4.uiP7eu61vaqZ9pShy.5g1UUnTR..vNie",
	        "email": "ando5@mail.com",
	        "__v": 0
		}
	}
#### Error Response

	
		{
		    "message": "Email or Password NOT FOUND!!!!!"
		}	
		status : 400 (Bad Request)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)

### GET article
***
get all data article
#### URL
http://34.87.89.246/article

#### METHOD
GET
#### URL PARAMS
none
#### data 
none
####  headers
	token : ''
#### Succes Response
	[
		{
	        "tagList": [
	            "5d80234547fdf61d31b014b1",
	            "5d802e1f47fdf61d31b3124a",
	            "5d806bbe47fdf61d31c49221",
	            "5d806c0447fdf61d31c4a81f"
	        ],
	        "_id": "5d806bbf4edef66764a33aae",
	        "title": "Punya ku wkwk",
	        "content": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
	        "featured_image": "https://storage.googleapis.com/sultanrh32/1568697327249car22.jpeg",
	        "author": "5d802bcb73194c5dce0c2a3f",
	        "created_at": "2019-09-17T05:14:39.149Z",
	        "updatedAt": "2019-09-17T05:19:59.857Z",
	        "__v": 0
	    },
	]
#### Error Response

	
		{
		    "message":  "You don't have access"
		}	
		status : 401 (Unauthorized)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)
			
### POST article
***
create new article
#### URL
http://34.87.89.246/article

#### METHOD
POST
#### URL PARAMS
none
#### data 
	{
		title : STRING (required),
		content : STRING (required),
		featured_image : FILE(require)
	}
####  headers
	token : ''
#### Succes Response
	{
        "tagList": [
            "5d80234547fdf61d31b014b1",
            "5d802e1f47fdf61d31b3124a",
            "5d806bbe47fdf61d31c49221",
            "5d806c0447fdf61d31c4a81f"
        ],
        "_id": "5d806bbf4edef66764a33aae",
        "title": "Punya ku wkwk",
        "content": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        "featured_image": "https://storage.googleapis.com/sultanrh32/1568697327249car22.jpeg",
        "author": "5d802bcb73194c5dce0c2a3f",
        "created_at": "2019-09-17T05:14:39.149Z",
        "updatedAt": "2019-09-17T05:19:59.857Z",
        "__v": 0
	},
	
#### Error Response

	
		{
		    "message":  "You don't have access"
		}	
		status : 401 (Unauthorized)

.

		{
		    "message": "Artitcle validation failed: title: Path `title` is required. ",
		    "data": "Artitcle validation failed: title: Path `title` is required., "
		}
		status : 400 (Bad Request)
		
.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)
	

### GET article/:id
***
get single article
#### URL
http://34.87.89.246/article/:id

#### METHOD
GET
#### URL PARAMS
	id : '<article ID >'
#### data 
none
####  headers
	token : ''
#### Succes Response
	{
        "tagList": [
            "5d80234547fdf61d31b014b1",
            "5d802e1f47fdf61d31b3124a",
            "5d806bbe47fdf61d31c49221",
            "5d806c0447fdf61d31c4a81f"
        ],
        "_id": "5d806bbf4edef66764a33aae",
        "title": "Punya ku wkwk",
        "content": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        "featured_image": "https://storage.googleapis.com/sultanrh32/1568697327249car22.jpeg",
        "author": "5d802bcb73194c5dce0c2a3f",
        "created_at": "2019-09-17T05:14:39.149Z",
        "updatedAt": "2019-09-17T05:19:59.857Z",
        "__v": 0
	},
	
#### Error Response

	
		{
		    "message":  "You don't have access"
		}	
		status : 401 (Unauthorized)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)
	   
### PUT article
***
Edit single article
#### URL
http://34.87.89.246/article/:id

#### METHOD
PUT
#### URL PARAMS
	id : '<article ID >'
#### data 
	{
		title : STRING (required),
		content : STRING (required),
		featured_image : FILE(require)
	}
####  headers
	token : ''
#### Succes Response
	{
        "tagList": [
            "5d80234547fdf61d31b014b1",
            "5d802e1f47fdf61d31b3124a",
            "5d806bbe47fdf61d31c49221",
            "5d806c0447fdf61d31c4a81f"
        ],
        "_id": "5d806bbf4edef66764a33aae",
        "title": "Punya ku wkwk",
        "content": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        "featured_image": "https://storage.googleapis.com/sultanrh32/1568697327249car22.jpeg",
        "author": "5d802bcb73194c5dce0c2a3f",
        "created_at": "2019-09-17T05:14:39.149Z",
        "updatedAt": "2019-09-17T05:19:59.857Z",
        "__v": 0
	},
	
#### Error Response

	
		{
		    "message":  "You don't have access"
		}	
		status : 401 (Unauthorized)

.

		{
		    "message": "Artitcle validation failed: title: Path `title` is required. ",
		    "data": "Artitcle validation failed: title: Path `title` is required., "
		}
		status : 400 (Bad Request)
.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)	   

### DELETE article
***
delete single article
#### URL
http://34.87.89.246/article/:id

#### METHOD
DELETE
#### URL PARAMS
	id : '<article ID >'
#### data 
none
####  headers
	token : ''
#### Succes Response
	{
        "message": "Berhasil menghapus"
	},
	
#### Error Response

	
		{
		    "message":  "You don't have access"
		}	
		status : 401 (Unauthorized)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)	   
	   
### GET article/tag/?tag='tagname'
***
get article by tag
#### URL
http://34.87.89.246/article/tag?tag='satu'

#### METHOD
GET
#### URL PARAMS
	tag : '<tag name>(query)
#### data 
none
####  headers
	token : ''
#### Succes Response
	{
        "message": "Berhasil menghapus"
	},
	
#### Error Response

	
		{
		    "message":  "You don't have access"
		}	
		status : 401 (Unauthorized)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)	   


  




