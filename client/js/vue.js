//35.240.183.35:80
// const errorHandler = require('./errorHandler')
var baseUrl = "http://localhost:3000"
var app = new Vue({
    el: '#app',
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data: {
        page: 1,
        email: "",
        password:"",
        articles: [],
        username: "",
        title: "",
        content: "",
        login: true,
        articleId: null,
        search: "",
        menuBarCollapsed: -25,
        settingArticleRight: 0,
        errorMessage:""
        
    },
    methods: {
        openThirdPage: function(){
            this.menuBarCollapsed = -25
            this.title = ""
            this.articleId = null
            this.content = "What do you want to write..."
            this.page = 3
        },
        openSecondPage: function(){
            this.menuBarCollapsed = -25
            this.fetchArticles()
            this.page = 2
        },
        fetchArticles: function(){
            axios({
                method: "get",
                url: `${baseUrl}/articles/`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                this.articles = response.data
            })
            .catch(this.errorHandler)
        },
        editArticle: function(){
            this.menuBarCollapsed = -25
            this.page = 3
        },
        openArticle: function(title, content, _id){
            
            this.articleId = _id
            this.page = 4
            this.title = title
            this.content = content
        },
        publish: function(){
            if(!this.articleId){
                axios({
                    method: "post",
                    url: `${baseUrl}/articles/`,
                    data: {
                        title: this.title,
                        content: this.content
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.errorMessage = ""
                    this.openSecondPage()
                })
                .catch(this.errorHandler)
            }else{
                axios({
                    method: "patch",
                    url: `${baseUrl}/articles/${this.articleId}`,
                    data: {
                        title: this.title,
                        content: this.content
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.openSecondPage()
                })
                .catch(this.errorHandler)
            }

        },
        switchForm: function(){
            this.username = ""
            this.password = ""
            this.email = ""
            this.errorMessage =""
            if(this.login){
                this.login = false
            }
            else{
                this.login = true
            }
        },
        doLogin: function(){
            axios({
                method: "post",
                url: `${baseUrl}/users/loginform`,
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response =>{
                localStorage.setItem('token', response.data.token)
                this.openSecondPage()
            })
            .catch(this.errorHandler)
        },
        doRegister: function(){
            axios({
                method: "post",
                url: `${baseUrl}/users/register`,
                data: {
                    email: this.email,
                    password: this.password,
                    username: this.username
                }
            })
            .then(response =>{
            })
            .catch(this.errorHandler)
        },
        removeArticle: function(){
            axios({
                method: "delete",
                url: `${baseUrl}/articles/${this.articleId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                this.openSecondPage()
            })
            .catch(this.errorHandler)
        },
        filterArticle: function(){
            var filtered = this.articles.filter(article =>{
                let regex = new RegExp(`^${this.search}`)
                return regex.test(article.title.toLowerCase())   
            })
            return filtered
        },
        toggleMenubar: function(){
            if(this.menuBarCollapsed === -25){
                this.menuBarCollapsed = 0
            }else{
                this.menuBarCollapsed = -25
            }
        },
        errorHandler: function(err){
            if(err.response){
                this.errorMessage = err.response.data.message
                console.log(err.response.data.message)
            }else if(err.request){
                this.page = -1
                this.errorMessage = `500 Internal Server Error`
            }else {
                console.log(err.message)
            }
        },
        logout: function(err){
            localStorage.removeItem('token')
            this.page = 1
        }
    },
    created: function(){
        if(localStorage.getItem('token')){
            this.openSecondPage()
        }
        else{
            this.page = 1
        }
    }
})