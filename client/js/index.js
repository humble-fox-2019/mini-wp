
const app = new Vue({
    el: '#app',
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data: {
        activeNav: 'dashboard',
        articles: [],
        searchWord: '',
        titleInput: '',
        selectedPost: {},
        newPost: {
            title: '',
            content: ''
        }
    },
    methods: {
        selectNav (param) {
            this.activeNav = param
        },
        getArticles () {
            axios({
                url: "http://localhost:3000/articles",
                method: "get"
            })
                .then(({ data }) => {
                    this.articles = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        selectPost(param) {
            if (param) this.selectedPost = param

            this.selectNav('editPost')
        },
        deletePost(id, index) {
            axios({
                url: `http://localhost:3000/articles/${id}`,
                method: "delete"
            })
                .then(() => {
                    this.getArticles()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        saveArticle() {
            const { id, title, content } = this.selectedPost

            let method, url
            if (id) {
                url = `http://localhost:3000/articles/${id}`
                method = 'patch'
            }
            else {
                url = `http://localhost:3000/articles`
                method = 'post'
            }

            axios({
                url,
                method,
                data: { title, content }
            })
                .then(() => {
                    this.selectNav('posts')
                    this.getArticles()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created: function() {
        this.getArticles()
    },
    computed: {
        filteredArticles() {
            return this.articles.filter(article => {
                return article.title.toLowerCase().includes(this.searchWord.toLowerCase())
            })
        }
    }
})