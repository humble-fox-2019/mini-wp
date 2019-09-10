$(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
  });
});
var app = new Vue({
  el: '#app',
  data: {
    currentPage: "newArticle",
    articles: [],
    title_search: '',
    newTitle: '  '
  },
  methods: {
    fetchData() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/article/getAll'
      })
        .then((response) => {
          this.articles = response.data
        })
    },
    search() {
      axios({
        data: {
          title_search: this.title_search
        },
        method: 'POST',
        url: 'http://localhost:3000/article/filter'
      })
        .then((response) => {
          this.articles = response.data
        })
        .catch(err => {
          console.log(err);
        })
    },
    postArticle() {
      function findFirstDescendant(parent, tagname) {
        parent = document.getElementById(parent);
        var descendants = parent.getElementsByTagName(tagname);
        if (descendants.length) return descendants[0].innerHTML;
        return null;
      }
      var content = findFirstDescendant("editor", "p");
      
      axios({
        data: {
          title: this.newTitle,
          content: content
        },
        method: 'POST',
        url:'http://localhost:3000/article/create'
      }).then((response) => {
        this.fetchData()
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteData(articleId) {
      axios({
        data: {
          id: articleId
        },
        method: 'DELETE',
        url: 'http://localhost:3000/article/delete'
      })
        .then((response) => {
          this.fetchData()
        })
        .catch(err => {
          console.log(err);
        })
    },
    navArticle(pageName) {
      this.currentPage = pageName
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    //console.log(document.getElementById("editor"))
    this.fetchData()
    var quill = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'  // or 'bubble'
    });
  },
  watch: {
    title_search: function () {
      axios({
        data: {
          title_search: this.title_search
        },
        method: 'POST',
        url: 'http://localhost:3000/article/filter'
      })
        .then((response) => {
          this.articles = response.data
        })

    },

    navigation: function () {
      return this.currentPage
    }
  }
})


