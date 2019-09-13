
const server = `http://35.247.163.135`
// const server = `http://localhost:3000`

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
        selectNav(param) {
            this.activeNav = param
        },
        getArticles() {
            axios({
                url: `${server}/articles`,
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
                url: `${server}/articles/${id}`,
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
            console.log(this.selectedPost.content)

            const { id, title, content } = this.selectedPost
            
            let method, url
            if (id) {
                url = `${server}/articles/${id}`
                method = 'patch'
            }
            else {
                url = `${server}/articles`
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
    created: function () {
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