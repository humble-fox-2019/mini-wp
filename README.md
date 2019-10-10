## Fox-overflow
    Darkside it an app to manage your article online, so you can keep in touch with your work anytime anywhere.
    you can upload an article with image in it, beside it you can edit your article and delete it.

## Link
### User Site
	http://miniwp.ardynn14.com/
## Users
	Before can use Fox-overflow, you must create an account.
	Then login with it next time you want to open the apps.
### Customers
### register
	Method		: post
	Endpoint	: http://localhost:3000/users/register
	Requierment	: 
		1. email	: String (email format)
		2. password : String
		3. username : String
		4. file		: .jpg
	Responses	:
		Success	: 
			1. status   : 201
			2. token    : String
			3. username : String
			4. img		: String (img file url)
		Error	:
			1. status 	: 400
			2. message	: Array
### login
	Method		: post
	Endpoint	: http://localhost:3000/users/login
	Requierment	: 
		1. email	: String (email format)
		2. password : String
	Responses	:
		Success	: 
			1. status   : 201
			2. token    : String
			3. username : String
			4. img		: String (img file url)
		Error	:
			1. status 	: 400
			2. message	: Array

## Article
### 	readAll
	Method		: get
	Endpoint	: http://localhost:3000/articles
	Requierment	: 
		1. headers : token (String)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : Array
		Error	:
			1. status 	: 500
			2. message	: Internal server error
### create
	Method		: post
	Endpoint	: http://localhost:3000/articles
	Requierment	: 
		1. title	: String
		2. content	: String
		3. tag 		: String
		4. file		: .jpg
		5. headers	: token
	Responses	:
		Success	: 
			1. status   : 201
			2. title    : String
			3. content 	: String
			4. img		: String (img file url)
			5. tag		: Array
			6. userId	: String
		Error	:
			1. status 	: 400
			2. message	: Array
### delete
	Method		: delete
	Endpoint	: http://localhost:3000/articles/:id
	Requierment	: 
		1. headers	: token (admin)
		2. :id	    : Article Id (String)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : `Delete Successful`
		Error	:
			1. status 	: 403
			2. message	: `Unautorized action`
			3. 
### 	readOne
	Method		: get
	Endpoint	: http://localhost:3000/articles/:id
	Requierment	: 
		1. headers : token (String)
		2. :id	   : Article Id (String)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : article {Object}
		Error	:
			1. status 	: 500
			2. message	: Internal server error
###  read All
	Method		: get
	Endpoint	: http://localhost:3000/articles
	Requierment	: 
		1. headers	: token
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : articles (Array)
		Error	:
			1. status 	: 401
			2. message	: `please login first`
### read by Tag
	Method		: get
	Endpoint	: http://localhost:3000/articles/tag?key=$tag
	Requierment	: 
		1. headers	: token
		2. ?tag		: String
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : articles (Array)
		Error	:
			1. status 	: 401
			2. message	: `please login first`

### find by word
	Method		: get
	Endpoint	: http://localhost:3000/articles/find?key=$word
	Requierment	: 
		1. headers	: token
		2. ?word		: String
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : articles (Array)
		Error	:
			1. status 	: 401
			2. message	: `please login first`
			3. 
### update Article
	Method		: patch
	Endpoint	: http://localhost:3000/articles/:id
	Requierment	: 
		1. title	: String
		2. content	: String
		3. tag 		: String
		4. file		: .jpg
		5. headers	: token
	Responses	:
		Success	: 
			1. status   : 200
			2. message	: articles (Object)
		Error	:
			1. status 	: 400
			2. message	: Array
#