let quill
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
        settingArticleRight: 0
        
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
                url: 'http://35.240.183.35:80/posts/'
            })
            .then(response => {
                this.articles = response.data
            })
            .catch(err => {
                console.log(err)
            })
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
                    url: "http://35.240.183.35:80/articles/",
                    data: {
                        title: this.title,
                        content: this.content
                    }
                })
                .then(response => {
                    console.log(response)
                    this.openSecondPage()
                })
                .catch(err =>{
                    console.log(err)
                })
            }else{
                axios({
                    method: "patch",
                    url: `http://35.240.183.35:80/articles/${this.articleId}`,
                    data: {
                        title: this.title,
                        content: this.content
                    }
                })
                .then(response => {
                    this.openSecondPage()
                })
                .catch(err =>{
                    console.log(err)
                })
            }

        },
        switchForm: function(){
            this.username = ""
            this.password = ""
            this.email = ""
            if(this.login){
                this.login = false
            }
            else{
                this.login = true
            }
        },
        doLogin: function(){
            
            console.log(this.email, this.password)
            axios({
                method: "post",
                url: "http://35.240.183.35:80/users/loginform",
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response =>{
                console.log(response)
                this.openSecondPage()
            })
            .catch(err => {
                console.log(err)
            })
        },
        doRegister: function(){
            console.log(this.username ,this.email, this.password)
            axios({
                method: "post",
                url: "http://35.240.183.35:80/users/register",
                data: {
                    email: this.email,
                    password: this.password,
                    username: this.username
                }
            })
            .then(response =>{
                console.log(response)
                this.openSecondPage()
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeArticle: function(){
            axios({
                method: "delete",
                url: `http://35.240.183.35:80/posts/${this.articleId}`
            })
            .then(response => {
                console.log(response)
                this.openSecondPage()
            })
            .catch(err =>{
                console.log(err)
            })
        },
        filterArticle: function(){
            var filtered = this.articles.filter(article =>{
                let regex = new RegExp(`^${this.search}`)
                return regex.test(article.title.toLowerCase())   
            })
            return filtered
        },
        toggleMenubar: function(){
            console.log(this.menuBarCollapsed)
            if(this.menuBarCollapsed === -25){
                this.menuBarCollapsed = 0
            }else{
                this.menuBarCollapsed = -25
            }
        },
        
    },
    created: function(){
        this.fetchArticles()
    }
})