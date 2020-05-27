<template>
    <section id="home-page">
        <div id="header-play">
            <img id="header-logo" src="../static/Background.png" alt="">
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
        </div>

        <div class="menu-play" :class="{ 'mobile-menu': mobile }">
            <div @click.prevent="showFormCreateArticle" class="menu-play-item d-flex align-items-center">
                <i class="fas fa-edit mr-2" aria-hidden="true"></i>
                Write New Article
            </div>
        </div>

        <div v-if="navbar" id="navbar-play">
            <div id="navbar-menu">
                <div @click.prevent="showArticles()" id="navbar-item-1"
                    class="navbar-play-item d-flex align-items-center">
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
        </div>

        <div class="body-play" :class="{ 'mobile-body' : mobile }">
            <!-- index article start -->
            <div v-if="articleIndex" id="articleIndex" class="container">
                <div class="row">
                    <div v-for="article in articles" :key="article.id" class="col-md-3 my-2">
                        <div class="card">
                            <div style="width:100%; padding-top:100%; position:relative">
                                <img class="fit" :src="article.featured_image" alt="Card image cap">
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
        </div>
        <!-- index article end-->

        <!-- create article start -->
        <div v-if="articleCreate" id="articleCreate" class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="row py-5">
                        <div class="col-md-10 offset-md-1">
                            <form action="">
                                <div class="form-group">
                                    <label for="File1">Featured Image</label>
                                    <input type="file" ref="file" v-on:change="handlefileupload($event)"
                                        class="form-control-file" id="File1">
                                </div>

                                <div class="form-group">
                                    <label for="article-title">Article Title</label>
                                    <input v-model="inputTitle" autofocus class="form-control" type="text">
                                </div>

                                <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                                    <div class="menubar">
                                        <button class="btn" :class="{ 'is-active': isActive.bold() }"
                                            @click.prevent="commands.bold">
                                            <i class="fa fa-bold"></i>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.italic() }"
                                            @click.prevent="commands.italic">
                                            <i class="fa fa-italic"></i>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.strike() }"
                                            @click.prevent="commands.strike">
                                            <i class="fa fa-strikethrough"></i>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.underline() }"
                                            @click.prevent="commands.underline">
                                            <i class="fa fa-underline"></i>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.code() }"
                                            @click.prevent="commands.code">
                                            <i class="fa fa-code"></i>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.paragraph() }"
                                            @click.prevent="commands.paragraph">
                                            <i class="fa fa-paragraph"></i>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                                            @click.prevent="commands.heading({ level: 1 })">
                                            <b>h1</b>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                                            @click.prevent="commands.heading({ level: 2 })">
                                            <b>h2</b>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                                            @click.prevent="commands.heading({ level: 3 })">
                                            <b>h3</b>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.bullet_list() }"
                                            @click.prevent="commands.bullet_list">
                                            <i class="fa fa-list-ul"></i>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.ordered_list() }"
                                            @click.prevent="commands.ordered_list">
                                            <i class="fa fa-list-ol"></i>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.blockquote() }"
                                            @click.prevent="commands.blockquote">
                                            <i class="fa fa-quote-left"></i>
                                        </button>

                                        <button class="btn" :class="{ 'is-active': isActive.code_block() }"
                                            @click.prevent="commands.code_block">
                                            <i class="fa fa-laptop-code"></i>
                                        </button>

                                        <button class="btn" @click.prevent="commands.horizontal_rule">
                                            <i class="fa fa-minus"></i>
                                        </button>

                                        <button class="btn" @click.prevent="commands.undo">
                                            <i class="fa fa-undo"></i>
                                        </button>

                                        <button class="btn" @click.prevent="commands.redo">
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
        </div>
        <!-- create article end -->
    </section>
</template>

<script>
    import apis from "../apis/index";
    const { axios, server } = apis;

    import { Editor, EditorContent, EditorMenuBar } from "tiptap";
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
    } from "tiptap-extensions";

    export default {
        components: {            
            EditorMenuBar,
            EditorContent
        },
        data() {
            return {
                //layout
                articleIndex: false,
                articleCreate: false,
                //layout
                mobile: false,
                navbar: true,
                
                //data
                articles: [],
                // The configuration of the editor.
                editor: new Editor({
                    extensions: [
                    new Blockquote(),
                    new BulletList(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({
                        levels: [1, 2, 3]
                    }),
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
                    new History()
                    ],
                    content: "",
                    onUpdate: ({ getHTML }) => {
                    this.editorData = getHTML();
                    }
                }),

                inputTitle: "",
                editorData: "",

                //file upload
                image: "",


            }
        },
        methods: {
            responsive() {
                if (window.innerWidth < 576) {
                    this.mobile = true;
                    this.navbar = false;
                } else {
                    this.mobile = false;
                    this.navbar = true;
                }
            },
            goLanding() {
                this.$emit('goLanding')
            },
            signMeOut() {
                localStorage.removeItem("token");
                this.goLanding();
            },
            fetchArticles() {
            //fetch articles
            axios
                .get(`${server}/article`, {
                headers: {
                    token: localStorage.getItem("token")
                }
                })
                .then(response => {
                    this.articles = response.data;
                })
                .catch(err => {
                    console.log(err);
                });
            },
            handlefileupload() {
                let file = event.target.files || event.dataTransfer.files;
                this.image = file[0];
            },
            showArticles() {
                this.fetchArticles();
                this.articleIndex = true;
                this.articleCreate = false;
            },

            showFormCreateArticle() {
            this.articleIndex = false;
            this.articleCreate = true;
            },

            postArticle() {
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
                    url: `${server}/article`,
                    headers: {
                    "Content-Type": "multipart/form-data",
                    token
                    },
                    data: formData
                })
                    .then(response => {
                    this.inputTitle = "";
                    this.editorData = "";
                    this.image = "";
                    this.editor.clearContent(true);
                    this.fetchArticles();
                    this.articleIndex = true;
                    this.articleCreate = false;
                    })
                    .catch(err => {
                    console.log(err);
                    });
            }
            
        },
        created () {
            //layout
            this.responsive();
            window.addEventListener("resize", this.responsive);

            this.articleIndex = true;
            this.fetchArticles();
        },
        beforeDestroy() {
            this.editor.destroy();
        }
    };
</script>

<style>
    .fit {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>