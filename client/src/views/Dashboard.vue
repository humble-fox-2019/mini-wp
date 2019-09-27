<template>
  <div class="body">
       <div class="vertical-nav bg-dark" id="sidebar">
            <div class="py-4 px-3 mb-4 bg-light">
                <div class="media d-flex align-items-center"><img
                        src="https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png" alt="..."
                        width="65" class="mr-3 rounded-circle img-thumbnail shadow-sm">
                    <div class="media-body">
                        <h4 class="m-0">Jason Doe</h4>
                        <p class="font-weight-light text-muted mb-0">Web developer</p>
                    </div>
                </div>
            </div>

            <ul class="nav flex-column bg-white mb-0">
                <li class="nav-item">
                    <a href="#" class="nav-link text-dark font-italic bg-light" @click="navArticle('dashboard')">
                        <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
                        View Article
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-dark font-italic" @click="navArticle('createArticle')">
                        <i class="fa fa-address-card mr-3 text-primary fa-fw"></i>
                        Add Article
                    </a>
                </li>

            </ul>
        </div>

        <div class="container-fluid">

                <div class="page-content p-5" id="content">
                    <!-- Toggle button -->
                    <button id="sidebarCollapse" type="button"
                        class="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"><i
                            class="fa fa-bars mr-2"></i><small class="text-uppercase font-weight-bold">Menu</small></button>
                    <div v-if="currentPage === 'dashboard'">
    
                        <input type="search" id="title_search" v-model="title_search" placeholder="search by title">
                        <button @click="search()">Cariii </button>
                        <!-- Demo content -->
                        <!-- <h2 class="display-4 text-white">Bootstrap vertical nav</h2>
                                  <p class="lead text-white mb-0">Build a fixed sidebar using Bootstrap 4 vertical navigation and media objects.</p>
                                  <p class="lead text-white">Snippet by <a href="https://bootstrapious.com/snippets" class="text-white"> -->
                        <!-- <u>Bootstrapious</u></a>
                                  </p>
                                  <div class="separator"></div> -->
                     <!--Dashboard-->
                <div class="row" v-for="article in articles" :key="article._id">
                    <div class="col-md-6">
                        <div class="card border-primary flex-md-row mb-4 shadow-sm h-md-250">
                            <div class="card-body d-flex flex-column align-items-start">
                                <strong class="d-inline-block mb-2 text-primary">World</strong>
                                <h6 class="mb-0">
                                    <a class="text-dark" href="#">{{ article.title}}</a>
                                </h6>
                                <div class="mb-1 text-muted small">Nov 12</div>
                                <p class="card-text mb-auto">{{ article.content}}.</p>
                                <button type="button" @click.prevent="deleteData(article._id)" ><i class="fa fa-trash">Delete</i></button>
                              
                                <a class="btn btn-outline-primary btn-sm" role="button"
                                    href="http://www.jquery2dotnet.com/">Continue reading</a>
                           
                            </div>
                            <img class="card-img-right flex-auto d-none d-lg-block" alt="Thumbnail [200x250]"
                                src="//placeimg.com/250/250/arch" style="width: 200px; height: 250px;">
                        </div>
                    </div>
                </div>

            </div>

                <!--Create Article-->
            <div v-show="currentPage === 'createArticle'">
                <div><input type="text" v-model="newTitle"> </div>
                   <div id="editor"></div>
                   <button type="button" @click="postArticle()">Insert
                   </button>
            </div>
        </div>
  </div>
  </div>
</template>

<script>
$(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
  });
});
import axios from 'axios'
export default {
    name:'Dashboard',
    data(){
        return{
            currentPage: "newArticle",
            articles: [],
            title_search: '',
            newTitle: '  '
        }
        
    },
    methods: {
    fetchData() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/articles/getAll'
      })
        .then((response) => {
          this.articles = response.data
        })
        .catch(err =>{
            console.log(err);
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
        url:'http://localhost:3000/articles/create'
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
}
</script>

<style scoped>
.social-card-header{
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 96px;
}
.social-card-header i {
    font-size: 32px;
    color:#FFF;
}
.bg-facebook {
    background-color:#3b5998;
}
.text-facebook {
    color:#3b5998;
}
.bg-google-plus{
    background-color:#dd4b39;
}
.text-google-plus {
    color:#dd4b39;
}
.bg-twitter {
    background-color:#1da1f2;
}
.text-twitter {
    color:#1da1f2;
}
.bg-pinterest {
    background-color:#bd081c;
}
.text-pinterest {
    color:#bd081c;
}
.share:hover {
        text-decoration: none;
    opacity: 0.8;
}
*{
    margin: 0;
    padding: 0;
}


.nav-color{
    background-color:  #3A263F
}

.vertical-nav {
    min-width: 17rem;
    width: 17rem;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.4s;
  }

  .page-content {
    width: calc(100% - 17rem);
    margin-left: 17rem;
    transition: all 0.4s;
  }
  
  /* for toggle behavior */
  
  #sidebar.active {
    margin-left: -17rem;
  }
  
  #content.active {
    width: 100%;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    #sidebar {
      margin-left: -17rem;
    }
    #sidebar.active {
      margin-left: 0;
    }
    #content {
      width: 100%;
      margin: 0;
    }
    #content.active {
      margin-left: 17rem;
      width: calc(100% - 17rem);
    }
  }
  
  /*
  *
  * ==========================================
  * FOR DEMO PURPOSE
  * ==========================================
  *
  */
  
  .body {
    background: #599fd9;
    background: -webkit-linear-gradient(to right, #599fd9, #c2e59c);
    background: linear-gradient(to right, #599fd9, #c2e59c);
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  .separator {
    margin: 3rem 0;
    border-bottom: 1px dashed #fff;
  }
  
  .text-uppercase {
    letter-spacing: 0.1em;
  }
  
  .text-gray {
    color: #aaa;
  }

  /* footer code here */
  #sticky-footer {
    
    flex-shrink: none;
  }
  
</style>>

