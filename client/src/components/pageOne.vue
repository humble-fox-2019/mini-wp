<template>
    <div>
        <div class="form">
            <loginform @gotosecondpage="gotosecondpage" v-if="form === 0" @toregister="switchform"></loginform>
            <registerform v-else-if="form === 1" @tologin="switchform"></registerform>
        </div>
    </div>
</template>

<script>
import loginform from './loginForm'
import registerform from './registerForm'
export default {
    data: function(){
        return {
            form: 0
        }
    },
    methods: {
        gotosecondpage(){
            this.$emit('gotosecondpage')
        },
        switchform(){
            if(this.form === 0) this.form = 1
            else this.form = 0
        }
    },
    components : {
        loginform,
        registerform
    }
}
</script>

<style scoped>
   .form {
       width: 100vw;
       height: 100vh;
       display: flex;
       justify-content: center;
       align-items: center;
   }
</style>