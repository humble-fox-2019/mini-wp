<template>
    <div class="container p-20" id="users">
        <h1 class="text-3xl">Users</h1>
        <div class="container bg-white rounded mt-3 flex shadow p-12 flex-col">
            <p>Email : {{ user.email }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user']
}
</script>

<style>

</style>