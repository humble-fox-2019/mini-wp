<template>
    <div class="container" id="post-history">
        <PostItem
            v-for="post in posts"
            :key="post._id"
            :post="post"
		>
        
            </PostItem>
    </div>
    
</template>
<script>
import PostItem from './PostItem'
import axios from 'axios'
//@remove="removeTodo"
/* updated : function(){
        this.fetchData();
    }, */
export default {
    components : {
        PostItem
    },
    data : function(){
        return {
            posts : []
        }
    },
    methods : {
        fetchData : function(){
            console.log("hehe")
            axios({
                method: 'GET',
                url: 'http://localhost:3000/posts/'
            }).then((response)=>{
                console.log(response)
                this.posts = response.data.reverse()
            })
        }
    },
    mounted : function () {
        this.fetchData()
    }
    
}
</script>
