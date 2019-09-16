<template>
<div id="app">
    <Navbar>
    </Navbar>
    <Jumbotron>
    </Jumbotron>
    <CreatePostButton>
    </CreatePostButton>
    <ListOfPosts>
    </ListOfPosts>
    <h1>{{ message }}</h1>
  <div>
</template>

<script>



import Navbar from './components/Navbar.vue';
import Jumbotron from './components/Jumbotron';
import ListOfPosts from './components/ListOfPosts';
import CreatePostButton from './components/CreatePostButton'

export default {
    components : {
        Navbar,
        Jumbotron,
        CreatePostButton,
        ListOfPosts
    }, 
    data : function() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
</style>