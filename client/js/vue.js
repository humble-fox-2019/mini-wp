var app = new Vue({
    el: '#app',
    data: {
        page: null,
        articles: [],
        title: "",
        content: "",
        login: true,
        articleId: null,
        search: ""

    },
    methods: {
        openThirdPage: function(){
            this.title = ""
            this.articleId = null
            this.content = "What do you want to write..."
            this.page = 3
        },
        openSecondPage: function(){
            this.fetchArticles()
            this.page = 2
        },
        fetchArticles: function(){
            axios({
                method: "get",
                url: ' http://localhost:3000/posts/'
            })
            .then(response => {
                this.articles = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        editArticle: function(){
            this.page = 3
        },
        openArticle: function(title, content, _id){
            
            this.articleId = _id
            this.page = 4
            this.title = title
            this.content = content
        },
        publish: function(){
            console.log(this.title)
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
        }
    },
    watch: {
        content: function(){
            console.log(this.content)
        }
    },
    created: function(){
        this.page = 2
        this.fetchArticles()
        var quill = new Quill('#editor', {
            modules: { toolbar: true },
            theme: 'snow'
        });
    }
})