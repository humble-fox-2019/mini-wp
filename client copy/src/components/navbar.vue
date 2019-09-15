<template>
    <nav class="h-auto navigation flex fixed w-full z-40">
        <ul class="flex items-center">
            <li>
                <a @click.prevent="selectNav('dashboard')" href="#">
                    <i class="fab fa-wordpress fa-2x p-2"></i>
                </a>
            </li>
            <li class="mx-3">
                <a @click.prevent="selectNav('dashboard')" href="#" class="dashboardBtn">
                    <i class="fas fa-home fa-1x"></i>
                    <span class="mr-4">My Blog</span>
                </a>
            </li>
            <li v-if="isLogin === true" class="mx-3">
                <a @click.prevent="selectNav('comments')" href="#">
                    <i class="fas fa-comment-alt fa-1x"></i>
                    <span class="mr-4">0</span>
                </a>
            </li>
            <li v-if="isLogin === true" class="mx-3">
                <a @click="selectNav('postdetail')" href="#">
                    <i class="fas fa-plus fa-1x"></i>
                    <span class="mr-4">New</span>
                </a>
            </li>
        </ul>

        <div v-if="isLogin === true" class="flex items-center ml-auto">
            <a @click="selectNav('users')" href="#" class="usersBtn">
                <span>Hi, {{ user.email }}</span>
                <i class="fas fa-user-circle fa-1x mr-4"></i>
            </a>
            <button @click.prevent="logout">
                <i class="fas fa-sign-out-alt fa-1x ml-4"></i>
                <span class="mr-4">Sign out</span>
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['isLogin', 'user'],
    data() {
        return {

        }
    },
    methods: {
        selectNav(param) {
            this.$emit('selectNav', param)
        },
        logout() {
            localStorage.removeItem('token')
            this.$emit('logout')
        }
    }
}
</script>

<style>

</style>