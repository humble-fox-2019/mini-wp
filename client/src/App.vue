<template>
 <firstpage v-if="page === 1" @gotosecondpage="gotosecondpage"></firstpage>
 
 <secondpage 
 @gotofifthpage="gotofifthpage"
 @gotofourthpage="gotofourthpage"
 @gotosecondpage="gotosecondpage" 
 @gotothirdpage="gotothirdpage" :page="page" 
 @gotofirstpage="gotofirstpage"
  v-else-if="page === 2"></secondpage>
 
 <thirdpage  @gotofifthpage="gotofifthpage"
 @gotofourthpage="gotofourthpage"
 @gotosecondpage="gotosecondpage" 
 @gotothirdpage="gotothirdpage"
 @gotofirstpage="gotofirstpage"
  :page="page" v-else-if="page === 3"></thirdpage>

 <fourthpage 
 @gotofifthpage="gotofifthpage"
 @gotofourthpage="gotofourthpage"
 @gotosecondpage="gotosecondpage" 
 @gotothirdpage="gotothirdpage" 
 :page="page" 
 @gotofirstpage="gotofirstpage"
 v-else-if="page === 4" ></fourthpage>
 <fifthpage 
 @gotofifthpage="gotofifthpage"
 @gotofourthpage="gotofourthpage"
 @gotosecondpage="gotosecondpage" 
 @gotothirdpage="gotothirdpage" 
 :page="page" 
 @gotofirstpage="gotofirstpage"
 v-else-if="page === 5"></fifthpage>
</template>

<script>
import firstpage from './components/firstPage'
import secondpage from './components/secondPage'
import thirdpage from './components/thirdPage'
import fourthpage from './components/fourthPage'
import fifthpage from './components/fifthPage'
export default {
    data: function(){
        return {
            page: 1
        }
    },
    methods: {
        gotofourthpage(){
            this.page = 4
        },
        gotofifthpage(){
            this.page = 5
        },        
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
        thirdpage,
        fifthpage,
        fourthpage
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