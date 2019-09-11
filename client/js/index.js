'use strict'

const url = 'http://localhost:3000'
// If kalau belom ada token, login page. Kalau ada token -> dashboard
// login page -> default form yg keluar si login, kalau diclick register, keluar register

var app = new Vue({
  el: '#app',
  components: {
    wysiwyg: vueWysiwyg.default.component
  },
  data: {
    isLogin: false,
    currentPage: 'loginPage',
    currentForm: 'login',
    name: '',
    email: '',
    password: '',
    articles: [],
    searchInput: '',
    articleTitle: '',
    articleContent: '',
    articleId: ''
  },
  methods: {
    showMyArticle: function () {
      this.currentPage = 'dashboardPage'
      this.fetchMyArticle()
    },
    showEditArticle: function (id, title, content) {
      console.log(id, title, content)
      this.articleId = id
      this.articleTitle = title
      this.articleContent = content
      this.currentPage = 'createArticlePage'
    },
    showWriteArticle: function () {
      this.articleId = ''
      this.articleTitle = ''
      this.articleContent = ''
      this.currentPage = 'createArticlePage'
    },
    searchArticle: function () {
      axios({
        method: 'POST',
        url: `${url}/articles/search`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          searchInput: this.searchInput
        }
      })
        .then(({ data }) => {
          console.log('Data masuk')
          this.articles = data
        }).catch((err) => {
          console.log(err)
        })
    },
    login: function () {
      axios({
        method: 'POST',
        url: `${url}/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Successfully signed in',
            'Please clicked the button to close!',
            'success'
          )
          localStorage.setItem('token', data.token)
          console.log('User successfully signed in')
          this.checkLogin()
        }).catch((err) => {
          console.log(err)
        })
    },
    checkLogin: function () {
      if (localStorage.getItem('token')) {
        this.isLogin = true
        this.currentPage = 'dashboardPage'
      } else {
        this.isLogin = false
        this.currentPage = 'loginPage'
      }
    },
    register: function () {
      axios({
        method: 'POST',
        url: `${url}/users/register`,
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Successfully signed in',
            'Please clicked the button to close!',
            'success'
          )
          localStorage.setItem('token', data.token)
          console.log('User successfully signed in')
          this.checkLogin()
        }).catch((err) => {
          console.log(err)
        })
    },
    logout: function () {
      const auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
        console.log('User logged out successfuly.')
      })

      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
        Swal.fire(
          'Successfully logged out',
          'Please clicked the button to continue!',
          'success'
        )
      }
      this.checkLogin()
    },
    fetchArticle () {
      axios({
        method: 'GET',
        url: `${url}/articles`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('Data masuk')
          this.articles = data
        }).catch((err) => {
          console.log(err)
        })
    },
    fetchMyArticle () {
      axios({
        method: 'GET',
        url: `${url}/articles/user`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('Data masuk')
          this.articles = data
        }).catch((err) => {
          console.log(err)
        })
    },
    showDashboard: function () {
      this.currentPage = 'dashboardPage'
      this.fetchArticle()
    },
    showRegister: function () {
      this.name = ''
      this.email = ''
      this.password = ''
      this.currentPage = 'loginPage'
      this.currentForm = 'register'
    },
    showLogin: function () {
      this.name = ''
      this.email = ''
      this.password = ''
      this.currentPage = 'loginPage'
      this.currentForm = 'login'
    },
    showAlert: function () {
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
    },
    createArticle: function () {
      let method = null
      let path = null

      if (this.articleId !== '') {
        method = 'PATCH'
        path = `${url}/articles/${this.articleId}`
      } else {
        method = 'POST'
        path = `${url}/articles`
      }
      axios({
        method,
        url: path,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.articleTitle,
          content: this.articleContent
        }
      })
        .then(({ data }) => {
          console.log('Post is successfully created or updated')
          console.log(data)
          Swal.fire(
            'Success!',
            'Please clicked the button to continue!',
            'success'
          )
          this.showDashboard()
        }).catch((err) => {
          console.log(err)
        })
    },
    deleteArticle: function (id) {
      console.log(id)
      axios({
        method: 'DELETE',
        url: `${url}/articles/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('Post is successfully deleted')
          console.log(data)
          Swal.fire(
            'Post is successfuly deleted!',
            'Please clicked the button to continue!',
            'success'
          )
          this.showDashboard()
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.checkLogin()
  },
  mounted () {
  },
  watch: {
    searchInput: function () {
      return this.articles
    },
    isLogin: function () {
      if (this.isLogin === true) {
        this.fetchArticle()
      }
    }

  }
})
