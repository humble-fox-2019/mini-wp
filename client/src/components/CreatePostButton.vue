<template>
    <div>
        <button @click="showForm = true">Create post</button>
        <CreatePostForm v-show="showForm"
         v-on:hide-form="showForm = false"
        > </CreatePostForm>
    </div>
</template>
<script>
//<CreatePostForm v-model="isClicked"> </CreatePostForm>
import CreatePostForm from './CreatePostForm'
export default {

    components : {
        CreatePostForm
    },
    data : function () {
        return {
            showForm : false
        }
    }
}
</script>

