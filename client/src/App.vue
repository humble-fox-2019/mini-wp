<template>
<div id="app">
    <Navbar
      v-bind:is-logged-in="isLoggedIn"
      v-on:show-login-form="showRegisterForm = false"
      v-on:show-register-form="showRegisterForm = true"
      v-on:logged-out="isLoggedIn = false"
    >
    </Navbar>
    <RegisterForm 
      v-on:register-success="isLoggedIn = true"
      v-show="!isLoggedIn && showRegisterForm">
    </RegisterForm>
    <LoginForm 
      v-on:logged-in="isLoggedIn = true"
      v-show="!isLoggedIn && !showRegisterForm">
    </LoginForm>
    <Jumbotron v-show="isLoggedIn">
    </Jumbotron>
    <div>{{isLoggedIn}}</div>
    <CreatePostButton v-show="isLoggedIn">
    </CreatePostButton>
    <ListOfPosts v-show="isLoggedIn">
    </ListOfPosts>
    <Footer>
    </Footer>
  <div>
</template>

<script>



import Navbar from './components/Navbar.vue';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Jumbotron from './components/Jumbotron';
import ListOfPosts from './components/ListOfPosts';
import CreatePostButton from './components/CreatePostButton'
import Footer from './components/Footer'

export default {
    components : {
        Navbar,
        RegisterForm,
        LoginForm,
        Jumbotron,
        CreatePostButton,
        ListOfPosts,
        Footer
    }, 
    data : function() {
    return {
      isLoggedIn: false,
      showRegisterForm: false,
      message: 'Hello world',
    };
  },
};
</script>