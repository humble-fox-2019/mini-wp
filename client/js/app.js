const serverURL = 'http://localhost:3000'
var app = new Vue({
    el: '#app',
    data: {
        currentPage : "signin",
        mainPage : "myArticlePage",
        password : "",
        email : "",

        passwordError: false,
        emailError : false,

        registerUsername : "",
        registerPassword : "",
        registerPassword2 : "",
        registerEmail : "",

        registerUsernameError: false,
        registerPasswordError : false,
        registerPassword2Error : false,
        registerEmailError : false,

        isLogin: false,

        myArticle : [],
        articles : [],
        viewOneId : null,
        viewOneArticle: null,

        addContent: "",
        addTitle: null,
        addTag : [],
        addImage: null,

        editTitle : null,
        editContent: "",
        editImage : null ,
        editTag : [],
        editArticleId :""
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    methods : {
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            console.log( files[0] )
            // this.createImage(files[0]);
        },
        changePage( page ) {
            // home, signin , register
            this.currentPage = page;
        },
        addNewArticle() {
            const token = localStorage.getItem('token');
            const data = {
                content: this.addContent
            }
            if ( this.addTitle ) {
                data['title'] = this.addTitle
            } 
            if ( this.addImage ) {
                data['image']= this.addImage
            }
            if ( this.addTag) {
                data['tags'] = this.addTag
            }
            axios({
                method:"POST",
                url:`${serverURL}/articles`,
                data,
                headers : {
                    token
                }
            })
            .then( response => {
                console.log( response.data );
                this.showSuccessMessage("Article Created" , "See your article for more infor..")
            })
            .catch( err => {
                console.log("CREATE ERRROR" , err );
                this.errorMessage();
            })
            this.fetchAllArticle();
            this.fetchMyArticle();
        },
        viewOne( page , id ) {
            this.mainPage = page;
            this.viewOneId = id;
            const token = localStorage.getItem('token')
            axios({
                method:"GET",
                url:`${serverURL}/articles/${this.viewOneId}`,
                headers : {
                    token
                }
            })
            .then ( response => {
                this.viewOneArticle = response.data.article
            })
            .catch( err =>{
                console.log("View One By Id Error" , err )
                this.errorMessage()
            } )

        },
        changeMainPage( page ) {
            this.mainPage = page;
        },
        validUsername ( username ) {
            if ( username.length < 5 ) return false;
            return true
        } ,
        validPassword( password ) {
            if ( password.length < 5) return false;
            return true
        },
        validEmail ( email ) {
            if ( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( email ) ) 
                return true
            else false
        },
        showSuccessMessage( title , message ) {
            Swal.fire(
                title,
                message,
                'success'
            )
        },
        showErrorMessage( title , message ) {
            Swal.fire(
                title,
                message,
                'error'
            )
        },
        errorMessage(){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        },
        convertDate : function ( date ) {
            const months = ['January' , 'February' , 'March' , 'April' ,'May', 'June', 'July' , 'August' , 'September' , 'October' , 'November' , 'December']
            const day = new Date( date ).getDate();
            const mon = months[new Date( date ).getMonth()];
            const year = new Date( date).getFullYear();
            return `${day} ${mon} ${year}`
        },
        register() {
            if ( !this.registerUsernameError && !this.registerPasswordError && 
                !this.registerPassword2Error && !this.registerEmailError )
                axios({
                    method : "POST",
                    url : `${serverURL}/register`,
                    data : {
                        email : this.registerEmail,
                        password : this.registerPassword,
                        username : this.registerUsername
                    }
                })
                .then ( response => {
                    this.changePage('signin')
                    this.showSuccessMessage("Register Success", "Login to continue...")
                })
                .catch ( err => {
                    console.log("Register Error" , err )
                    this,this.showErrorMessage("Fail to login", err)
                })
        },
        fetchMyArticle : function() {
            const token = localStorage.getItem('token')
            axios({
                method : "GET",
                url : `${serverURL}/articles/user`,
                headers: {
                    token
                }
            })
            .then( response => {
                this.myArticle = response.data.articles
            })
            .catch( err => {
                console.log("Fetch MyArticle Error" , err )
                this.errorMessage();
            })
        },
        fetchAllArticle: function() {
            const token = localStorage.getItem('token')
            axios({
                method : "GET",
                url : `${serverURL}/articles`,
                headers: {
                    token
                }
            })
            .then( response => {
                this.articles = response.data.articles
            })
            .catch( err => {
                console.log("Fetch Article Error" , err )
                this.errorMessage();
            })
        },
        signin : function () {
            if ( !this.passwordError && !this.emailError && this.email && this.password) {
                console.log( this.email , this.password)
                axios({
                    method : "POST",
                    url : `${serverURL}/login`,
                    data :{
                        email : this.email,
                        password : this.password
                    }
                })
                .then( response => {
                    localStorage.setItem( "token" , response.data.token )
                    this.isLogin = true;
                    this.changePage('home')
                })
                .catch( err => {
                    this.showErrorMessage( "Failed to login" , "user not found" )
                })
            } else {
                this.showErrorMessage("Login Failed" )
            }
            
        },
        signout : function (){
            localStorage.removeItem('token')
            this.isLogin = false;
            this.changePage('signin')
        },
        owner : function ( articleId , userId ) {
            const token = localStorage.getItem('token');
            axios({
                method: "GET",
                url: `${serverURL}/articles/${articleId}`,
                headers : {
                    token
                }
            })
            .then( found => {
                const data = found.data
                // console.log ( JSON.stringify( data.article.userId._id , null , 2)  )
                // console.log ( JSON.stringify( userId._id , null , 2)  )
                console.log(data.article.userId._id == userId._id)
                if ( data.article.userId._id == userId._id )return true;
                return false;
            })
            .catch( err => {
                return false;
            })
        },
        deleteArticle : function( articleId ) {
            const token = localStorage.getItem('token')
            axios({
                method: "DELETE",
                url: `${serverURL}/articles/${articleId}`,
                headers : {
                    token 
                }
            })
            .then( response => {
                this.showSuccessMessage("Delete Success");
                this.fetchAllArticle();
                this.fetchMyArticle();
                this.changeMainPage('myArticlePage');
                
            })
            .catch( err => {
                console.log("DELETE ERROR" , err );
                this.showErrorMessage("No Access" , "you must be the owner to do this")
            })
        },
        editArticlePage: function( page,  articleId) {
            this.changeMainPage( page );
            this.editArticleId = articleId;
            const token = localStorage.getItem('token')
            axios({
                method: "GET",
                url : `${serverURL}/articles/${articleId}`,
                headers :{ 
                    token
                }
            })
            .then ( response => {
                const article = response.data.article;
                console.log( article , " <<<<<<< ")
                this.editTitle = article.title ,
                this.editContent= article.content,
                this.editImage = article.image ,
                this.editTag = article.tags
            })
            .catch( err => {
                this.showErrorMessage("No Access", "You must be the owner to do this");
                this.changeMainPage('myArticlePage');
            })
            
        },
        editArticle : function ( ) {
            const articleId = this.editArticleId
            const token = localStorage.getItem('token');
            const data = {
                content: this.editContent
            }
            if ( this.editTitle ) {
                data['title'] = this.editTitle
            } 
            if ( this.editImage ) {
                data['image']= this.editImage
            }
            if ( this.editTag) {
                data['tags'] = this.editTag
            }
            axios({
                method: "PUT",
                url : `${serverURL}/articles/${articleId}`,
                data,
                headers : {
                    token
                }
            })
            .then ( response => {
                this.showSuccessMessage("Update Success")
                this.fetchAllArticle();
                this.fetchMyArticle();
                this.changeMainPage('myArticlePage')
            })  
            .catch ( err => {
                this.showErrorMessage("No Access" , "you must be the owner to do this")
            })
        }
    },
    watch: {
        username: function() {
            if ( !this.validUsername( this.username ) )
                this.usernameError = true
            else    
                this.usernameError = false
        },
        password: function() {
            if ( !this.validPassword( this.password ) )  
                this.passwordError = true
            else 
                this.passwordError = false
            
        },
        email : function () {
            if ( !this.validEmail( this.email ) ) 
                this.emailError = true
            else 
                this.emailError = false
        },
        registerUsername : function () {
            if ( !this.validUsername( this.registerUsername ) ) 
                this.registerUsernameError = true
            else
                this.registerUsernameError = false;
        },
        registerPassword : function () {
            if ( !this.validPassword( this.registerPassword )) 
                this.registerPasswordError = true
            else 
                this.registerPasswordError = false
        },
        registerPassword2 : function () {
            if ( this.registerPassword2 != this.registerPassword ) 
                this.registerPassword2Error = true
            else   
                this.registerPassword2Error = false
        },
        registerEmail: function () {
            if ( !this.validEmail( this.registerEmail)) 
                this.registerEmailError = true
            else 
                this.registerEmailError =false
        },
        isLogin : function (){
            if ( this.isLogin == true) {
                this.fetchMyArticle();
                this.fetchAllArticle();
            }
        }
    },
    created: function () {
        if ( localStorage.getItem('token') ) {
            this.isLogin = true
            this.currentPage = 'home';
        }         
    },
    computed : {
        
    }
})
