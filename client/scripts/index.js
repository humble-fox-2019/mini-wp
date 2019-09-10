// const quill = new Quill('#editor', {
//   theme: 'snow'
// });

// const quillEdit = new Quill('#editor-edit', {
//   theme: 'snow'
// });

const app = new Vue({
  el: '#app',
  components: {
    wysiwyg: vueWysiwyg.default.component
  },
  data: {
    activePage: 'page-welcome',
    articles: [],
    search: '',

    // article data
    article: {},
  },

  computed: {
    filteredArticles: function () {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  methods: {
    loadActivePage: function (id) {
      this.activePage = id
    },

    // get article
    fetchArticles: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles'
      })
        .then(({ data }) => {
          this.articles = data.articles
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchSingleArticle: function (id) {
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${id}`
      })
        .then(({ data }) => {
          this.article = data.article
        })
        .catch(err => {
          console.log(err)
        })
    },

    // * create
    addArticle: function () {
      // console.log(this.article.title);
      // console.log(this.article.content);
      // console.log(this.article.id);
      axios({
        method: 'post',
        url: `http://localhost:3000/articles/`,
        data: {
          title: this.article.title,
          content: this.article.content
        }
      })
        .then(response => {
          return this.fetchArticles()
        })
        .then(_ => {
          this.loadActivePage('page-article-list')
        })
        .catch(err => {
          console.log(err)
        })
    },

    // * update
    editArticle: function () {
      // console.log(this.article.title);
      // console.log(this.article.content);
      // console.log(this.article.id);
      // console.log(this.article._id);
      axios({
        method: 'put',
        url: `http://localhost:3000/articles/${this.article._id}`,
        data: {
          title: this.article.title,
          content: this.article.content
        }
      })
        .then(({ data }) => {
          this.article = {}
          return this.fetchArticles()
        })
        .then(_ => {
          this.loadActivePage('page-article-list')
        })
        .catch(err => {
          console.log(err)
        })
    },

    // * delete
    deleteArticle: function (id) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/articles/${id}`
      })
        .then(({ data }) => {
          console.log(data.deleted)
          this.fetchArticles()
        })
        .catch(err => {
          console.log(err)
        })
    },
  },

  created: function () {
    this.fetchArticles()
  }
})