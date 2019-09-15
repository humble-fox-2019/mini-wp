<template>
    <div>
        <div class="main-container" id="myArticlePage">
            <h3 class="m-3 article-header" style="text-align: center;">My Article</h3>
            <div>
                <div class="flex">
                    <input type="text" placeholder="Title ... " v-model="search">
                </div>
            </div>
            <!-- ARTICLE CARD -->
            <div v-if="myArticles.length == 0 ">
                <h3 style="text-align:center;">Nothing to show</h3>
            </div>
            <div v-else>
                <div class="shadow pl-2 pt-3 mt-4" v-for="article in myArticles" :key="article._id">
                    <div class="row">
                        <div class="col-2 pb-2">
                            <!-- <img v-bind:src="article.image" alt="image" width="80px"> -->
                            <div class="image" :style="`background-image: url( ${article.image})`"></div>

                        </div>
                        <div class="col-10">
                            <div>
                                <h3 class="article-title" style="text-align: left">{{ article.title }}</h3>
                                <div>
                                    <small>{{ convertDate( article.createdAt )}} - </small>
                                    <small class="font-weight-bold">By {{ article.userId.username }}</small>
                                </div>
                                <div style="display: flex; justify-content: space-between;" class="mt-3">
                                    <ul class="tags">
                                        <li class="tag" v-for='(tag , index) in article.tags' :key="index">{{tag}}</li>
                                    </ul>
                                    <div style="margin-right: 20px; padding-top: 20px;">
                                        <!-- Masukin ID Article keparams -->
                                        <button class="viewMore-btn" @click="viewOne( article._id )">View More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data : function() {
        return {
            search : ""
        }
    },
    props : ['myArticles'],
    methods: {
        convertDate( date ) {
            const months = ['January' , 'February' , 'March' , 'April' ,'May', 'June', 'July' , 'August' , 'September' , 'October' , 'November' , 'December']
            const day = new Date( date ).getDate();
            const mon = months[new Date( date ).getMonth()];
            const year = new Date( date).getFullYear();
            return `${day} ${mon} ${year}`
        },
        viewOne( articleId ) {
            this.$emit('viewArticle' , articleId )
        }
    },
    watch: {
        search : function( ){
            this.$emit('search' , this.search )
        }
    }
}
</script>

<style scoped>
    .flex {
        display: flex;
    }
    .flex > input {
        border-radius: 15px;
        width: 100%;
        border: 2px solid grey;
        padding: 5px 10px;
    }

</style>