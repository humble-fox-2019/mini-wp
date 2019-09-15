<template>
    <div class="container p-20" id="dashboard">
        <h1 class="text-3xl">Dashboard</h1>
        <p class="text-xl">Hi, {{ user.email }}</p>
    </div>
</template>

<script>
export default {
    props: ['user']
}
</script>

<style>

</style>