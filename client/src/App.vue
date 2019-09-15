<template>
<div>
    <div v-show="beforeLogin === true">
        <loginForm v-show="register === false" @changeToRegister="goToRegister()" @signin="goToMain()" @pageGIn="goToMain()"></loginForm>
        <registerForm v-show="register === true" @changeToLogin="goToLogin()"></registerForm>
    </div>
    <div v-show="beforeLogin === false">
        <navbar @signout="loggingout"></navbar>
        <sidebar @goToHome="changeToHome" @goToCreate="changeToCreate"></sidebar>
        <listcontent :articles="articles" @successDelete="goDelete()" v-if="listcontent === true" @updateFile="changeToEdit"></listcontent>
        <createcontent v-show="createcontent === true" @successCreate="changeToHome"></createcontent>
        <editcontent :editarticle="editarticle" v-if="editcontent === true" @successEdit="changeToHome" @aa="changeToHome"></editcontent>
    </div>
</div>
</template>

<script>
import loginForm from "./components/loginForm";
import registerForm from "./components/registerForm";
import sidebar from "./components/sidebar";
import navbar from "./components/navbar";
import listcontent from "./components/listcontent";
import createcontent from "./components/createcontent";
import editcontent from "./components/editcontent";
// let baseurl = "http://localhost:3000"
let baseurl = "http://34.87.55.207"
export default {
    //props: ['registerprop'],
    data(){
        return {
            // selectedpost :{},
            // image_wp,
            // title : "",
            // content: "",
            // email: "",
            // password: "",
            // username: "",
            createcontent:false,
            editcontent:false,
            articles:[],
            beforeLogin:true,
            register:false,
            editarticle: {},
            // loginform:true,
            // login:false,
            // clicksignin:true,
            // clickregister: false,
            // search_article: "",
            listcontent:true
        };
    },
    components:{
        loginForm,
        registerForm,
        sidebar,
        navbar,
        listcontent,
        createcontent,
        editcontent
    },
    methods:{
        loggingout(){
            this.beforeLogin = true
            this.register = false
        },
        changeToHome(){
            // console.log(cond)
            console.log("=================")
            console.log("masuk ke changeToHome")
            this.createcontent = false
            this.editcontent = false
            this.listcontent = true
            this.fetchData()
        },
        changeToCreate(){
            this.createcontent = true
            this.editcontent = false
            this.listcontent = false
        },
        changeToEdit(article){
            console.log(article)
            this.editarticle = article
            this.createcontent = false
            this.editcontent = true
            this.listcontent = false
        },
        goToLogin(){
            console.log("App masuk gotToLogin")
            this.register = false
        },
        goToRegister(){
            console.log("App masuk gotToRegister")
            this.register = true
        },
        goToMain(){
            console.log("masuk ke goToMain root")
            this.beforeLogin = false
            //this.fetchMyArticle()
            this.fetchData()
        },
        goEdit(){
            this.createcontent = false
            this.editcontent = true
            this.listcontent = false
            this.fetchData()
        },
        goDelete(){
            console.log("mau after delete")
            this.fetchData()
        },
        fetchMyArticle(){
            axios({
            method: 'GET',
            url: `${baseurl}/miniWp/myArticle`,
            headers:{
                token: localStorage.getItem('token')
                }
            })
            .then((response) => {
                console.log(response.data)
                this.articles = response.data
            }).catch(error=> console.log(error))               
        },
        fetchData(){
                axios({
                method: 'GET',
                url: `${baseurl}/miniWp`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then((response) => {
                console.log(response.data)
                this.articles = response.data
            }).catch(error=> console.log(error))
            },
    },
    created(){
        let token = localStorage.getItem("token")
        if(token){
            this.beforeLogin=false
            this.fetchData()
        }
        else{
            this.beforeLogin=true
        }
    }
};
</script>

<style scoped>
    
</style>