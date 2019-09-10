// let quill = null;

let app = new Vue ({
    el: '#app',
    data: {
        articles: [],
        articleId: '',
        title: '',
        content: '',
        searchByTitle: '',
        page: 1,
        loading: false
    },
    methods: {
        fetchArticles: function() {
            axios({
                url: 'http://localhost:3001/articles',
                method: 'GET'
            })
            .then(({data}) => {
                this.articles = data;
                // this.loading = true
                // console.log(this.articles)
            })
            .catch(err => {
                console.log(err);
            })
        },
        
        insertArticle: function() {
            axios({
                url: 'http://localhost:3001/articles',
                method: 'POST',
                data: {
                    title: this.title,
                    content: this.content
                }
            })
            .then(({data}) => {
                console.log(data);
                this.fetchArticles();
                this.page = 1;
            })
            .catch(err => {
                console.log(err);
            })
        },
        
        updateArticle: function(articleId) {
            axios({
                url: `http://localhost:3001/articles/${articleId}`,
                method: 'PUT',
                data: {
                    title: this.title,
                    content: this.content
                }
            })
            .then(({data}) => {
                console.log(data);
                this.fetchArticles();
                this.page = 1;
            })
            .catch(err => {
                console.log(err);
            })
        },
        
        deleteArticle: function(articleId) {
            axios({
                url: `http://localhost:3001/articles/${articleId}`,
                method: 'DELETE'
            })
            .then(({data}) => {
                console.log(data);
                this.fetchArticles();
                this.page = 1;
            })
            .catch(err => {
                console.log(err);
            })
        },
        
        addArticle: function() {
            // quill = new Quill('#editor', {
            //     theme: 'snow'
            // });
            this.articleId = '',
            this.title = '',
            this.content = '',
            this.page = 2;
        },
        
        editArticle: function(articleId, title, content) {
            // quill = new Quill('#editor', {
            //     theme: 'snow'
            // });
            // alert(quill)
            this.articleId = articleId,
            this.title = title,
            this.content = content
            this.page = 2;
            
        }
        
    },
    computed: {
        searchedArticles() {
            let title = this.searchByTitle.toLowerCase();
            let filteredArticle = [];
            this.articles.forEach(article => {
                if (article.title.toLowerCase().indexOf(title) > -1) {
                    filteredArticle.push(article)
                }
            });
            return filteredArticle;
        }
    },
    created : function () {
        this.fetchArticles();
        // quill = new Quill('#editor', {
        //     theme: 'snow'
        // });
    }
})