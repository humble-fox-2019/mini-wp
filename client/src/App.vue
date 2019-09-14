<template>
 <firstpage v-if="page === 1" @gotosecondpage="gotosecondpage"></firstpage>
 
 <secondpage @gotosecondpage="gotosecondpage" 
 @gotothirdpage="gotothirdpage" :page="page" 
 @gotofirstpage="gotofirstpage"
  v-else-if="page === 2"></secondpage>
 
 <thirdpage @gotofirstpage="gotofirstpage"
  @gotosecondpage="gotosecondpage" 
  :page="page" v-else-if="page === 3"></thirdpage>
</template>

<script>
import firstpage from './components/firstPage'
import secondpage from './components/secondPage'
import thirdpage from './components/thirdPage'
export default {
    data: function(){
        return {
            page: 1
        }
    },
    methods: {
        gotofirstpage(){
            this.page = 1
        },  
        gotosecondpage(){
            this.page = 2
        },
        gotothirdpage(){
            this.page = 3
        }
    },
    components: {
        firstpage,
        secondpage,
        thirdpage
    },
    created: function(){
        if(localStorage.getItem('token')){
            this.page = 2
        }else this.page = 1
    }
}
</script>

<style>

</style>