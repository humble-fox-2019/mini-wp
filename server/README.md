# REST API DOCUMENTATION

##  User Routes

### **Register New User**

Register new user to the database
| Route | HTTP | Headers |
|---|---|---|
|`/users/register`|POST|`none`|

Body :  
```
   username: String (Required)
   password: String (Required)
   email : String (Required) (Unique)
```
Success :
```
   status: 201
   message: 'You have successfully registered account'
```
error :
```
   status: 404
   message: 'failed to registered account'
```

### **Login User**

Login with user info
| Route | HTTP | Headers |
|---|---|---|
|`/users/login`|POST|`none`|

Body :
```
   email: String (Required)
   password: String (Required)
```
Success :
```
   status: 200
   message : 'Login successfull'
   data: 'token'
```
error :
```
   status: 404
   message: 'email/password is wrong'
```
## login with Google SignIn
Login with user info
| Route | HTTP | Headers |
|---|---|---|
|`/users/signIn`|POST|`idToken`|

Body :
```
    none

```
Success :
```
   status: 200
   message : 'Login successfully'
   data: 'token'
```
error :
```
   status: 404
   message: 'email/password is wrong'
```
## get all user
Login with user info
| Route | HTTP | Headers |
|---|---|---|
|`/users/login`|POST|`none`|

Body :
```
None
```
Success :
```
   status: 200
   data: all users information

```
error :
```
   status: 404
   message: 'data not found'
```



## Articles Routes

### **Create Articles**

Create new todo into the database
| Route | HTTP | Headers |
|---|---|---|
|`/articles`|POST|`token`|
Body :
```
   UserId : String (Required)
   title: String (Required)
   content: String (Required)
   featured_image : date(required)
   tags : String(required)
```
   
success :
```
   status : 201
   message : 'Article has been created successfully'
   data : Article
```
error :
```
   status: 404
   message : 'failed to create Article'
```

### **Find All Article**

Find All Articles 
| Route | HTTP | Headers |
|---|---|---|
|`/articles`|GET|`token`|
Body :
```
   none
   ```
success :
```
   status: 200
   data: 'all user's articles'
```
error:
```
   status: 404
   message: 'data not found'
```
   
### **Find user articles **

Find all articles user in the database
| Route | HTTP | Headers |
|---|---|---|
|`/articles/user`|GET|`token`|
Body:
```
   none
```
success :
```
   status: 200
   data : all user article 
```
error :
```
   status: 404
   message: 'data not found'
```

### **Find one articles **

Find one articles by id in the database
| Route | HTTP | Headers |
|---|---|---|
|`/articles/:id`|GET|`token`|
Body:
```
   none
```
success :
```
   status: 200
   data : article 
```
error :
```
   status: 404
   message: 'data not found'
```


### **Update article**

Update a articles in the database
| Route | HTTP | Headers |
|---|---|---|
|`/articles/:id`|PATCH|`token`|

Body :
```
   title : String
   content: String 
   featured_image : String
   UserId :String
   tags : String
    
```

success :
```
   status: 200
   message: 'update successfully'
```
error:
```
   status: 404
   message: 'update failed'
```

note : one of the body variable have to different from before 

### **Delete articles**
Delete articles in the database
| Route | HTTP | Headers |
|---|---|---|
|`/articles/:id`|DELETE|`token`|

Body :
```
   none
```
success :
```
   status: 200
   message: 'delete successfully'
```
error:
```
   status: 404
   message: 'failed to delete todo'
```

### **add view articles**
add view in articles by one

| Route | HTTP | Headers |
|---|---|---|
|`/articles/:id/addView`|PATCH|`token`|

Body :
```
   none
```
success :
```
   status: 200
   message: 'add view successfully'
```
error:
```
   status: 404
   message: 'failed to add view articles'
```

