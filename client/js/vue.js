let quill
var app = new Vue({
    el: '#app',
    data: {
        page: null,
        articles: [],
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
                url: 'http://localhost:3000/posts/'
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
            console.log(this.title, quill.root.innerHTML)

        },
        openRegisterForm: function(){
            this.login = false
        },
        openLoginForm: function(){
            this.login = true
        },
        doLogin: function(){

        },
        doRegister: function(){

        },
        removeArticle: function(){
            console.log('masukdelete', this.articleId)
            axios({
                method: "delete",
                url: `http://localhost:3000/posts/${this.articleId}`
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
        this.page = 2
        this.fetchArticles()
        var quill2 = new Quill('#editor', {
            modules: { toolbar: true },
            theme: 'snow'
        });
    }
})