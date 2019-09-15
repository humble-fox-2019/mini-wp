# mini-wp


# Mini-Wp

All the APIs endpoint using base URL:
```javascript
http://localhost:3000
```

## Index of Reference:
* [User]()
* [Article]()

## User API
|  HTTP  | Endpoint | Headers | Body | Description |
|--------|----------|---------|------|-------------|
| POST | /user/ | none | name: string<br>email: string<br>password: string | Register new user |
| POST | /user/login | none | email: string<br>password: string | Login user |
| POST | /user/signInGoogle | none | log in using user google account | Login user |

## User API
|  HTTP  | Endpoint | Headers | Body | Description | 
|--------|----------|---------|------|-------------|
| GET | /article | {token: JWT token} | none | get user article list |
| POST | /article| {token: JWT token} | title : string<br>content : string<br>picture : string | create article list |
| GET | /article/search | {token: JWT token, id : userId, title : string} | none | find user article and display  |
| GET | /article/all/thread | {token: JWT token, id:userId} | none | find all user article for to be display  |
| PUT | /article/:id | {token: JWT token, id : userId} | {title :string, content :string, picture :string} | update article that matches with  |
| GET | /article/:title | {token: JWT token, id:userId} | none | find one user article for to be display  |
| DELETE | /article/:id | {token: JWT token, id : userId} | none | get global published articles |
