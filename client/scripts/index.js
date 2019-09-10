var quill = new Quill('#editor', {
  theme: 'snow'
});

var quillEdit = new Quill('#editor-edit', {
  theme: 'snow'
});

const app = new Vue({
  el: '#app',
  data: {
    activePage: 'page-welcome',
    articles: [],
    search: '',

    // article data
    article: {}
  },
  computed: {
    filteredArticles: function() {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    loadActivePage: function (id) {
      this.activePage = id
    },
    fetchArticles: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles'
      })
        .then(response => {
          this.articles = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchSingleArticle: function(id) {
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${id}`
      })
        .then(response => {
          this.article = response.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created: function () {
    this.fetchArticles()
  }
})