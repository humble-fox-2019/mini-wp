<template>
    <main class="h-full pt-10 flex">
        <div class="w-2/12"></div>
        <div class="min-h-screen w-10/12" id="contentBox">
            <dashboard v-if="selectedNav === 'dashboard'" :user="user"></dashboard>
            <posts v-else-if="selectedNav === 'posts'" @editPost="editPost" :alert="alert"></posts>
            <postdetail v-else-if="selectedNav === 'postdetail'" :selectedArticle="selectedArticle" @save="save" @addTag="addTag" @removeTag="removeTag" @changeImg="changeImg"></postdetail>
            <media v-else-if="selectedNav === 'media'"></media>
            <comments v-else-if="selectedNav === 'comments'"></comments>
            <appearance v-else-if="selectedNav === 'appearance'"></appearance>
            <plugins v-else-if="selectedNav === 'plugins'"></plugins>
            <users v-else-if="selectedNav === 'users'" :user="user"></users>
            <tools v-else-if="selectedNav === 'tools'"></tools>
            <settings v-else-if="selectedNav === 'settings'"></settings>
        </div>
    </main>
</template>

<script>
import dashboard from './contentarea-components/dashboard'
import posts from './contentarea-components/posts'
import postdetail from './contentarea-components/postdetail'
import media from './contentarea-components/media'
import comments from './contentarea-components/comments'
import appearance from './contentarea-components/appearance'
import plugins from './contentarea-components/plugins'
import users from './contentarea-components/users'
import tools from './contentarea-components/tools'
import settings from './contentarea-components/settings'

export default {
    components: {
        dashboard,
        posts,
        postdetail,
        media,
        comments,
        appearance,
        plugins,
        users,
        tools,
        settings,
    },
    props: ['selectedNav', 'selectedArticle', 'user'],
    data() {
        return {
            alert: {
                status: '',
                msgs: []
            }
        }
    },
    methods: {
        editPost(selectedArticle) {
            this.$emit('editPost', selectedArticle)
        },
        save(alert) {
            this.alert = alert
            this.$emit('save')
        },
        addTag(tagInput) {
            console.log('masuk contnetarea');
            this.$emit('addTag', tagInput)
        },
        removeTag(tag) {
            this.$emit('removeTag', tag)
        },
        changeImg($event) {
            this.$emit('changeImg', $event)
        },
        selectNav(param) {
            this.$emit('selectNav', param)
        }
    }
}
</script>

<style>
    #contentBox, footer{
        background-color: #efefef
    }
</style>