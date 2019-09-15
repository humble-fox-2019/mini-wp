const baseUrl = 'http://localhost:3000/article'
var app = new Vue({
    el: '#app',
    data: {
        // content: '',
        idArticle: '',
        articles: [],
        title: '',
        content: '',
        searchArticle: '',
        showLoginHome: true,
        showSearchResult: false
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    methods: {
        fetchdata() {
            console.log('halooo')
            axios({
                    method: 'GET',
                    url: baseUrl
                })
                .then(({
                    data
                }) => {
                    this.articles = data.data
                    console.log(data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        postData() {
            axios({
                    method: 'POST',
                    url: baseUrl,
                    data: {
                        title: this.title,
                        content: this.content
                    }
                })
                .then(({
                    data
                }) => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })

        },
        deleteData(id) {
            console.log(' ke bagian delete ')
            console.log(id)
            axios({
                    method: 'DELETE',
                    url: `${baseUrl}/${id}`,

                })
                .then(data => {
                    // console.log(url)
                    console.log(data)
                    console.log('berhasil delete')
                    console.log(id, '<<<< INI IDNYA')
                    this.fetchdata()
                })
                .catch(err => {
                    console.log(id, '<<< INI IDNYA ')
                    console.log(err, '<<<<< INI ERRNYA')
                    console.log('gagal delete')

                })
        },
        updateArticle(idArticle) {
            console.log(idArticle)

            axios({
                    method: 'PUT',
                    url: `${baseUrl}/${idArticle}`,
                    data: {
                        title: this.title,
                        content: this.content
                    }
                })
                .then(({
                    data
                }) => {
                    console.log(data, '<<<<< BERHASIL MASUK UPDATE')
                    this.fetchdata()
                    this.showLoginHome = true
                })
                .catch(err => {
                    console.log(err, '<<<< DATANYA ERROR')
                })
        },
        editArticle(id, title, content) {
            console.log('masuk ke edit Article')
            this.idArticle = id,
                this.title = title,
                this.content = content
            this.showLoginHome = false
            console.log(this.idArticle, '<<< INI ID ARTICLE')
            console.log(this.title, '<<< INI TITTLE')
            console.log(this.content, '<<< INI CONTENT')
        },
        backtoHome() {
            this.showLoginHome = true
        },
        searchArt() {
            console.log('berhasil masuk ke search art')
            console.log(this.searchArticle, '<<<< INI DATA SEARCH ARTICLENYA')
            axios({
                    method: 'GET',
                    url: `${baseUrl}/${this.searchArticle}`,
                })
                .then(({
                    data
                }) => {
                    console.log(data, '<<<<< DATANYA BERHASIL BRO')
                    this.title = data.data.title
                    this.content = data.data.content
                    console.log(data.data.content)
                    console.log(data.data.title)
                    this.showSearchResult = true
                })
                .catch(err => {
                    console.log(err, '<<<<< INI ERRORNYA DARI SEARCH ARTICLE')
                })

        }

    },
    
    created() {
        // apa yang mau diisi statenya? state = data
        // pada dasarnya mengisi data yang ada diatas
        this.fetchdata()
    },
    mounted() {
        // 
    },
    watch: {
        searchArticle: function () {
            axios({

            })
        }
    }
})

// var app = new Vue({
//     el: '#app',
//     data: {
//         message: 'Hello Vue!'
//     }
// })

