const baseUrl = 'http://localhost:3000/article'
var app = new Vue({
    el: '#app',
    data: {
        // content: '',
        articles: [],
        title: '',
        input: '',
        searchArticle: '',
        showLoginHome:0
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },

    methods: {
        fetchdata() {
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
                        content: this.input
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
                    console.log(url)
                    console.log(data)
                    console.log('berhasil delete')
                    console.log(_id, '<<<< INI IDNYA')
                })
                .catch(err => {
                    console.log(    id, '<<< INI IDNYA ')
                    console.log(err, '<<<<< INI ERRNYA')
                    console.log('gagal delete')

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