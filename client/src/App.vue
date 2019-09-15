<template>
 <firstpage v-if="page === 1" @gotosecondpage="gotosecondpage"></firstpage>
 
 <secondpage 
 @gotofourthpage="gotofourthpage"
 @gotosecondpage="gotosecondpage" 
 @gotothirdpage="gotothirdpage" :page="page" 
 @gotofirstpage="gotofirstpage"
 @gotofifth="gotofifth"
  v-else-if="page === 2"></secondpage>
 
 <thirdpage  
 @gotofourthpage="gotofourthpage"
 @gotosecondpage="gotosecondpage" 
 @gotothirdpage="gotothirdpage" 
 @gotofirstpage="gotofirstpage"
 @gotofifth="gotofifth"
  :page="page" 
  v-else-if="page === 3"></thirdpage>

 <fourthpage 
 @gotofourthpage="gotofourthpage"
 @gotosecondpage="gotosecondpage" 
 @gotothirdpage="gotothirdpage" 
 :page="page" :articles="articles"
 @gotofirstpage="gotofirstpage"
 v-else-if="page === 4" ></fourthpage>

 <fifthpage 
 @gotoeditpage="gotoeditpage"
 @gotosecondpage="gotosecondpage" 
 @gotothirdpage="gotothirdpage" 
 :page="page" :articles="articles"
 @gotofirstpage="gotofirstpage"
 v-else-if="page === 5"></fifthpage>


</template>

<script>

import firstpage from './components/pageOne'
import secondpage from './components/pageTwo'
import thirdpage from './components/pageThree'
import fourthpage from './components/pageFour'
import fifthpage from './components/pageFive'
export default {
    data: function(){
        return {
            page: 1,
            articles: []
        }
    },
    methods: {
        gotofifth(articles){
            this.page = 5
            this.articles = articles
        },
        gotofourthpage(){
            this.articles = []
            this.page = 4
        },        
        gotofirstpage(){
            this.page = 1
        },  
        gotosecondpage(){
            this.page = 2
        },
        gotothirdpage(){
            
            this.page = 3
        },
        gotoeditpage(){
            this.page = 4
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