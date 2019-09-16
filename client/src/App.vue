<template>
<div id="one-for-all">
  
  <div v-if="landing" id="landing" style="height: 100vh;" class="d-flex align-items-center flex-column text-center justify-content-center px-2">
    <div>
        <img src="./static/Background.png" alt="">
        <h5 class="mt-1 mb-3">Create and manage your blog for free.</h5>
        <button @click.prevent="goLogin" id="getstarted" type="button" class="btn btn-primary"> Let's Get Started
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>
  </div>

  <div v-if="login" id="login" style="height: 100vh;" class="d-flex align-items-center flex-column justify-content-center px-2">
    <!-- Login // id = "login-container" -->
        <div id="login-container" class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="card">
                        <div class="card-header">
                            Login
                        </div>
                        <div class="card-body">
                            <form id="login-form" name="login-form" action @submit.prevent="doLogin">
                                <div class="form-group">
                                    <label for="login-email">Email address</label>
                                    <input v-model="emailLogin" autofocus name="email" type="email" class="form-control" id="login-email"
                                        aria-describedby="emailHelp" placeholder="Enter email">
                                </div>
                                <div class="form-group">
                                    <label for="login-password">Password</label>
                                    <input v-model="passwordLogin"   name="password" type="password" class="form-control" id="login-password"
                                        placeholder="Password">
                                </div>

                                <button type="submit" class="btn btn-primary"> Login </button>
                                <hr>
                                <span>
                                    No account ? <a @click.prevent="goRegister" id="linkregister" href="#"><b>Create an account</b></a> to use Play Blog for
                                    free!
                                </span>
                                <hr>
                                    Or you can Sign In with your Google Account
                                    <button
            v-google-signin-button="clientId"
            class="google-signin-button"
          ><i class="fab fa-google"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- END LOGIN -->
  </div>

  <div v-if="register" id="register" style="height: 100vh;" class="d-flex align-items-center flex-column justify-content-center px-2">
    <!-- Login // id = "login-container" -->
        <div id="login-container" class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="card">
                        <div class="card-header">
                            Register
                        </div>
                        <div class="card-body">
                            <form action @submit.prevent="doRegister()" id="register-form" name="register-form">
                                <div class="form-group">
                                    <label for="reg-name"> Your Name </label>
                                    <input v-model="nameSignup" autofocus name="name" type="text" class="form-control" id="reg-name"
                                        placeholder="Enter yourname">
                                </div>
                                <div class="form-group">
                                    <label for="reg-email">Email address</label>
                                    <input v-model="emailSignup" name="email" type="email" class="form-control" id="reg-email"
                                        aria-describedby="emailHelp" placeholder="Enter email">
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email
                                        with
                                        anyone
                                        else.</small>
                                </div>
                                <div  class="form-group">
                                    <label for="reg-password">Password</label>
                                    <input v-model="passwordSignup" name="password" type="password" class="form-control" id="reg-password"
                                        placeholder="Password">
                                </div>

                                <button type="submit" class="btn btn-outline-primary"> Register </button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- END LOGIN -->
  </div>

  <div v-if="home" id="home">
      <section id="header-play">
          <img id="header-logo" src="./static/Background.png" alt="">
          <div id="header-search" class="d-none d-sm-none d-md-none d-lg-block">
            <input type="text" placeholder="Search">
            <button class="btn btn-sm btn-primary">
              <i class="fa fa-search"></i>
            </button>
          </div>
          <div>
            <button @click.prevent="signMeOut()" class="btn btn-sm btn-primary">
              <b>Sign Out</b>
            </button>
          </div>
      </section>

      <section class="menu-play" :class="{ 'mobile-menu': mobile }">
        <div @click.prevent="showFormCreateArticle" class="menu-play-item d-flex align-items-center">
          <i class="fas fa-edit mr-2" aria-hidden="true"></i>
          Write New Article
        </div>
      </section>

      <section v-if="navbar" id="navbar-play">
        <div id="navbar-menu">
          <div @click.prevent="showArticles()" id="navbar-item-1" class="navbar-play-item d-flex align-items-center">
            <div class="text">
              My Articles
            </div>
          </div>
          <div id="navbar-item-2" class="navbar-play-item d-flex align-items-center">
            <div class="text">
              Vue
            </div>
          </div>
          <div id="navbar-item-3" class="navbar-play-item d-flex align-items-center">
            <div class="text">
              Angular
            </div>
          </div>
          <div id="navbar-item-4" class="navbar-play-item d-flex align-items-center">
            <div class="text">
              React
            </div>
          </div>
        </div>   

        <div id="navbar-link">
          <div class="navbar-link-item">
            Payment methods
          </div>
          <div class="navbar-link-item">
            My subcriptions
          </div>
        </div>
      </section>

      <section class="body-play" :class="{ 'mobile-body' : mobile }" >
        <!-- index article start -->
        <div v-if="articleIndex" id="articleIndex" class="container">
          <div class="row">
            <div v-for="article in articles" :key="article.id" class="col-md-3 my-2">
                <div class="card">
                  <div style="width:100%; padding-top:100%; position:relative">
                    <img class="fit" :src="article.featured_image"   alt="Card image cap">
                  </div>
                  <div class="card-body" style="height: 120px">
                    <h6>{{ article.title }}</h6>
                    <div class="article-content" v-html="article.content">                      
                    </div>                  
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- index article end-->
          
          <!-- create article start -->
          <main v-if="articleCreate" id="articleCreate" class="container">
              <div class="row">
                <div class="col-md-12">
                      <div class="row py-5">
                        <div class="col-md-10 offset-md-1">
                          <form action="">
                            <div class="form-group">
                              <label for="File1">Featured Image</label>
                              <input type="file" ref="file" v-on:change="handlefileupload($event)" class="form-control-file" id="File1">
                            </div>

                            <div class="form-group">
                              <label for="article-title">Article Title</label>
                              <input v-model="inputTitle" autofocus class="form-control" type="text">
                            </div>

                            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                                 <div class="menubar">
                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.bold() }"
                                      @click.prevent="commands.bold"
                                    >
                                      <i class="fa fa-bold"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.italic() }"
                                      @click.prevent="commands.italic"
                                    >
                                      <i class="fa fa-italic"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.strike() }"
                                      @click.prevent="commands.strike"
                                    >
                                      <i class="fa fa-strikethrough"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.underline() }"
                                      @click.prevent="commands.underline"
                                    >
                                      <i class="fa fa-underline"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.code() }"
                                      @click.prevent="commands.code"
                                    >
                                      <i class="fa fa-code"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.paragraph() }"
                                      @click.prevent="commands.paragraph"
                                    >
                                      <i class="fa fa-paragraph"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                                      @click.prevent="commands.heading({ level: 1 })"
                                    >
                                      <b>h1</b>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                                      @click.prevent="commands.heading({ level: 2 })"
                                    >
                                      <b>h2</b>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                                      @click.prevent="commands.heading({ level: 3 })"
                                    >
                                      <b>h3</b>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.bullet_list() }"
                                      @click.prevent="commands.bullet_list"
                                    >
                                      <i class="fa fa-list-ul"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.ordered_list() }"
                                      @click.prevent="commands.ordered_list"
                                    >
                                      <i class="fa fa-list-ol"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.blockquote() }"
                                      @click.prevent="commands.blockquote"
                                    >
                                      <i class="fa fa-quote-left"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      :class="{ 'is-active': isActive.code_block() }"
                                      @click.prevent="commands.code_block"
                                    >
                                      <i class="fa fa-laptop-code"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      @click.prevent="commands.horizontal_rule"
                                    >
                                      <i class="fa fa-minus"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      @click.prevent="commands.undo"
                                    >
                                      <i class="fa fa-undo"></i>
                                    </button>

                                    <button
                                      class="btn"
                                      @click.prevent="commands.redo"
                                    >
                                      <i class="fa fa-redo"></i>
                                    </button>

                                  </div>
                            </editor-menu-bar>
                            <editor-content class="editor__content" :editor="editor">
                            </editor-content>                       
                                                      
                            <button @click.prevent="postArticle" class="btn btn-primary btn-sm">
                              Post Article
                              <i class="fa fa-paper-plane"></i>
                            </button>
                            
                      </div>
                    </div>
                  </div>
              </div>
            </main>
          <!-- create article end -->

      </section>
  </div>

</div>

  
</template>

<script>
//SERVER ADDRESS
//pro
const SERVER_ADDRESS = "http://34.87.19.131"
//dev
//const SERVER_ADDRESS = "http://localhost:3000"
import axios from 'axios'
import GoogleSignInButton from "vue-google-signin-button-directive";
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

export default {
  directives: {
    GoogleSignInButton
  },
  components: {
    GoogleSignInButton,
    EditorMenuBar,
    EditorContent
  },
    data() {
        return {

        //pro
        clientId:"6563466045-u3o93sc9nqt5j4gecgtsv0556er9odsv.apps.googleusercontent.com",

        //dev
        // clientId:"759176216490-0q9hohfl7r2v9gmi1jguv7nbh6b2p2cp.apps.googleusercontent.com",
          //pages
          landing : false,
          login : false,
          register :false,
          home : false,
          
          //layout
          mobile : false,
          navbar : true,
          articleIndex : false,
          articleCreate : false,
          
          //data
          articles : [],

          // The configuration of the editor.
          editor: new Editor({
            extensions: [
              new Blockquote(),
              new BulletList(),
              new CodeBlock(),
              new HardBreak(),
              new Heading({ levels: [1, 2, 3] }),
              new HorizontalRule(),
              new ListItem(),
              new OrderedList(),
              new TodoItem(),
              new TodoList(),
              new Link(),
              new Bold(),
              new Code(),
              new Italic(),
              new Strike(),
              new Underline(),
              new History(),
            ],
            content: '',
            onUpdate: ({ getHTML }) => {
                this.editorData = getHTML()
              }
          }),
          inputTitle : "",
          editorData: "",

          //file upload
          image : "",

          //login
          emailLogin : "",
          passwordLogin : "",         
          
          //register
          emailSignup: '',
          passwordSignup: '',
          nameSignup: '',

        }
    },
    methods: {
      OnGoogleAuthSuccess(idToken) {
      axios({
        method: "POST",
        url: `${SERVER_ADDRESS}/user/googleSignIn`,
        data: {
          idToken
        }
      }).then(data => {
        localStorage.setItem("token", data.data.token);
        goHome()
      });
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    },

    doLogin() {
      let email = this.emailLogin;
      let password = this.passwordLogin;
      axios({
        url: `${SERVER_ADDRESS}/user/login`,
        method: "POST",
        data: {
          email,
          password
        }
      })
        .then(data => {
          localStorage.setItem("token", data.data.token);
          this.emailLogin = ""
          this.passwordLogin = ""
          this.fetchArticles()
          this.goHome()
        })
        .catch(err => {
          let message =
            (error.response.data && error.response.data.message) ||
            "failed to SignIn";
        });
    },

    doRegister() {
      let email = this.emailSignup;
      let password = this.passwordSignup;
      let name = this.nameSignup;
      axios({
        method: "POST",
        url: `${SERVER_ADDRESS}/user/register`,
        data: {
          email,
          password,
          name
        }
      })
        .then(data => {
          localStorage.setItem("token", data.data.token);
          this.emailSignup = ""
          this.passwordSignup = ""
          this.nameSignup = ""
          this.fetchArticles() 
          this.goHome()
        })
        .catch(error => {
          let message = error.response.data && error.response.data.message || 'failed to register'
        });
    },

    signMeOut() {
      localStorage.removeItem("token")
      this.goLanding()
    },

      //pages
      blank () {
        this.landing = false
        this.login = false
        this.register = false
        this.home = false
      },

      goLanding(){
        this.blank()
        this.landing = true
      },

      goLogin(){
        this.blank()
        this.login = true
      },

      goRegister(){
        this.blank()
        this.register = true
      },

      goHome(){
        this.blank()
        this.fetchArticles()
        this.home = true
      },

        handlefileupload() {
          let file = event.target.files || event.dataTransfer.files;
          this.image = file[0];
        },

        responsive() {
          if(window.innerWidth < 576){
            this.mobile = true
            this.navbar = false
          } else {
            this.mobile = false
            this.navbar = true
          }          
        },
        
        fetchArticles() {
          //fetch articles
          axios.get(`${SERVER_ADDRESS}/article`, { headers: { token: localStorage.getItem("token") } })
            .then(response =>{
              this.articles = response.data
            })
            .catch(err =>{
              console.log(err)
            })
        },

        showArticles() {
          this.fetchArticles()
          this.articleIndex = true
          this.articleCreate = false
        },

        showFormCreateArticle() {
          this.articleIndex = false
          this.articleCreate = true
        },
        

        postArticle(){
          // console.log(this.inputTitle, "<==title")
          // console.log(this.editorData)
          // console.log(this.image)

          let token = localStorage.getItem("token");

          let formData = new FormData();
          
          formData.set("featured_image", this.image);
          formData.set("title", this.inputTitle);
          formData.set("content", this.editorData);
          axios({
            method: "POST",
            url: `${SERVER_ADDRESS}/article`,
            headers: {
              'Content-Type': 'multipart/form-data',
              token
            },
            data: formData
          })
          .then(response => {
              this.inputTitle = ""
              this.editorData = ""
              this.image = ""
              this.editor.clearContent(true)
              this.fetchArticles()
              this.articleIndex = true
              this.articleCreate = false
          })
          .catch(err => {
            console.log(err)
          })
        }
    },
    
    //hooks
    created () {
        //layout
        this.responsive()        
        window.addEventListener('resize', this.responsive)
        
        //pages
        if(localStorage.token){
          this.articleIndex = true
          this.fetchArticles()
          this.home = true
        } else {
          this.blank()
          this.landing = true
        }
    },
    mounted () {
        document.body.style.display = "block"
    },
    beforeDestroy() {
      this.editor.destroy()
    },

}
</script>

<style>
    @import './assets/base.css';
    @import './assets/play-blog.css';

    .fit {
        width:100%;
    height:100%;
    object-fit: cover;
    overflow: hidden;
    position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
    }

    .google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
    
</style>