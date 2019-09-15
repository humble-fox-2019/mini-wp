# mini-wp

## User
### Login
Route : `/login`  
Method : `POST`  
Headers : -   
Body : 
```
{
	"email" : "johnDoe@email.com",
	"password" : "johnDoe123"
}
```
Response : 
```
Success :
{
    "status": 200,
    "token": <TOKEN>
}

Error :
{
    "status": 400,
    "message": "Invalid Email/Password"
}
```
# 

### Register
Route : `/register`  
Method : `POST`  
Headers : -   
Body : 
```
{
    "username" : "johnDoe"
	"email" : "johnDoe@email.com",
	"password" : "johnDoe123"
}
```
Response : 
```
Success :
{
    "status": 201,
    "message": "User Registered",
    "createdUser"
}
Error :
{
    "status": 401,
    "message": "User already registered"
}
```

## Articles 
```
All of routes below need token! [ Authentication ] 
```
Headers : `TOKEN`  

### Create Articles
Route : `/articles`  
Method : `POST`  
Body : 
```
{
    title : STRING,
    content : STRING,
    tags : [],
    file : <IMAGE TYPE FILE>
}
```  
Response : 
```
Success :
{
    status : 200,
    createdArticle
}
```
# 

### Get All Articles
Route : `/articles`  
Method : `GET`  
Body : -  
Response : 
```
Success :
{
    status : 200,
    articles : []
}
```
# 
### Get Article by ID
Route : `/articles/:id`  
Method : `GET`  
Body : -  
Response : 
```
Success :
{
    status : 200,
    article
}
```


# 
### Get user article
Route : `/articles/user`  
Method : `GET`  
Body : -  
Response : 
```
Success :
{
    status : 200,
    articles
}
```

# 
### Search Article by Title
Route : `/articles/user`  
Method : `GET`  
Body : -  
Query : 
```
{
    title
}
```
Response : 
```
Success :
{
    status : 200,
    articles
}
```

# 
### Search Article By Tag 
Route : `/articles/tag`  
Method : `POST`  
Body :    
```
{
    tags : []
}
```
Response : 
```
Success :
{
   status : 200,
   articles : []
}
```

### Search User Article by Title
Route : `/articles/user/search`  
Method : `GET`  
Query : 
```
{
    title
}
```
Body : -  
Response : 
```
Success :
{
   status : 200,
   articles : []
}
```

```
Will Authorized , You need to be the owner of the article to user this feature
```
# 
### Update by ID 
Route : `/articles/:id`  
Method : `PUT`  
Body :   
```
    title : STRING,
    content : STRING,
    tags : [],
    file : <IMAGE FILE TYPE>

```
Response : 
```
Success :
{
    status : 200,
    message,
    updatedCount
}
```


### Delete by ID 
Route : `/articles/:id`  
Method : `DELETE`  
Body : -  
Response : 
```
Success :
{
    status : 200,
    message,
    deletedCount
}
```

