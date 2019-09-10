let app = new Vue ({
    el: '#app',
    data: {
        articles: [],
        searchByTitle: '',
        page: 'my-articles',
        loading: false
    },
    methods: {
        fetchArticles: function() {
            axios({
                url: 'http://localhost:3000/articles',
                method: 'GET'
            })
            .then(response => {
                this.articles = response.data;
                // this.loading = true
                // console.log(this.articles)
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    computed: {
        searchedArticles() {
            let title = this.searchByTitle;
            let filteredArticle = [];
            this.articles.forEach(article => {
                if (article.title.toLowerCase() === title.toLowerCase()) {
                    filteredArticle.push(article)
                }
            });
            return filteredArticle;
        }
    },
    created : function () {
        this.fetchArticles();
    }
})