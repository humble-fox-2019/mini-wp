Mini Worpress By Savero
===
## Link Deploy
http://miniwordpress.saveroz.com/

===
## Usage
```javascript
$ npm install
$ npm run dev
```
Access client via `http://miniwordpress.saveroz.com/`

Access server via `http://localhost:3000`

##  Routes
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/register  |POST  |none|username: String (**required**), email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/login  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Login as a user, **Error**: Internal server error (Wrong e-mail/password)|Login as a user|
|/users/signIn  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Login as a user (**via Google**), **Error**: Internal server error (Wrong e-mail/password)|Login as a user (**via Google**)|
|/articles  |GET  |token|none|**Success**: Show all articles of alluser, **Error**: Internal server error|Show tasks of logged in user|
|/articles  |POST  |token|title: String (**required**), content: String (**required**), featured_image: String  (**required**), |**Success**: Create a new article, **Error**: Internal server error (Validation)|Create a new articles
|/articles/:id  |PATCH  |token|title: String, content: String, featured_image: String,|  Successfully Edited Article, **Error**:Internal server error (Validation)| Edited Article
|/articles/:id  |DELETE|token|none|**Success**: Delete a article, **Error**: Internal server error|Delete a article|
