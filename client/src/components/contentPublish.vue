<template>
    
</template>

<script>
let baseUrl = 'http://localhost:3000'
import axios from 'axios'
export default {
    data: function(){
        return {
            articles: []
        }
    },
    methods:{
        readArticle(value){
             axios({
                url: `${baseUrl}/articles`,
                method: 'get',
                data:{
                    publish: "sadjnfkasdnfalksdfn"
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
               console.log(response)
            })
            .catch(err =>{
                if(err.response){
                    console.log(`${err.response.data.message}`)
                }
                else if(err.request){
                    alert("No response from server")
                }
                else {
                    console.log(err)
                }
            })
            .finally(()=>{

            })
        }
    },
    created(){
        this.readArticle()
    }
}
</script>

<style scoped>

</style>