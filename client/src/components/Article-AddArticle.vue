<template>
  <div id="add-article-page">
    <!-- header content -->
    <ContentHeader v-bind:title="headerTitle"></ContentHeader>

    <!-- content -->
    <div class="container">
        <div class="row justify-content-center">
            <div class="card col-10 p-4">
                <ArticleForm :selectedArticle="selectedArticle"></ArticleForm>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ContentHeader from './ContentHeader';
import ArticleForm from './Article-FormAddEdit';

export default {
    data() {
        return {
            headerTitle: 'Add Article',
        }
    },
    components: {
        ContentHeader, ArticleForm
    }, 
    props: ['selectedArticle'],
    methods: {
        
    }, 
    mounted() {
        if (this.selectedArticle) {
            this.headerTitle = 'Update Article'
        }
    }
}
</script>

<style>

</style>