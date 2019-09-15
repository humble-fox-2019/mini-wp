<template>
    <ul class="pt-10 w-2/12 navigation pl-2 pt-2 fixed h-screen" id="navigationBar">
        <li class="mt-3">
            <a @click="selectNav('dashboard')" href="#" class="dashboardBtn">
                <i class="fas fa-tachometer-alt fa-1x m-4 w-4"></i>
                <span>Dashboard</span>
            </a>
        </li>
        <li>
            <a @click="selectNav('posts')" href="#" id="postsBtn">
                <i class="fas fa-thumbtack fa-1x m-4 w-4"></i>
                <span>Posts</span>
            </a>
        </li>
        <li>
            <a @click="selectNav('media')" href="#" id="mediaBtn">
                <i class="fas fa-images fa-1x m-4 w-4"></i>
                <span>Media</span>
            </a>
        </li>
        <li>
            <a @click="selectNav('comments')" href="#" id="commentsBtn">
                <i class="fas fa-comment-alt fa-1x m-4 w-4"></i>
                <span>Comments</span>
            </a>
        </li>
        <li>
            <a @click="selectNav('appearance')" href="#" id="appearanceBtn">
                <i class="fas fa-brush fa-1x m-4 w-4"></i>
                <span>Appearance</span>
            </a>
        </li>
        <li>
            <a @click="selectNav('plugins')" href="#" id="pluginsBtn">
                <i class="fas fa-plug fa-1x m-4 w-4"></i>
                <span>Plugins</span>
            </a>
        </li>
        <li>
            <a @click="selectNav('users')" href="#" class="usersBtn">
                <i class="fas fa-user fa-1x m-4 w-4"></i>
                <span>Users</span>
            </a>
        </li>
        <li>
            <a @click="selectNav('tools')" href="#" id="toolsBtn">
                <i class="fas fa-wrench fa-1x m-4 w-4"></i>
                <span>Tools</span>
            </a>
        </li>
        <li>
            <a @click="selectNav('settings')" href="#" id="settingsBtn">
                <i class="fas fa-sliders-h fa-1x m-4 w-4"></i>
                <span>Settings</span>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    methods: {
        selectNav(param) {
            this.$emit('selectNav', param)
        }
    }
}
</script>

<style>

</style>