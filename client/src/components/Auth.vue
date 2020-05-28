<template>
    <div id="auth">
        <SignIn
            v-if="page === 'signin'"
            @update-auth-page="page = $event"
            @auth="$emit('auth', $event)"
            >
        </SignIn>
        <SignUp
            v-if="page === 'signup'"
            @update-auth-page="page = $event"
            @auth="$emit('auth', $event)"
            >
        </SignUp>
    </div>
</template>

<script>
import SignUp from './Auth-SignUp';
import SignIn from './Auth-SignIn';

export default {
    data() {
        return {
            page: 'signin'
        }
    },
    components: { SignUp, SignIn }
}
</script>

<style scoped>

</style>