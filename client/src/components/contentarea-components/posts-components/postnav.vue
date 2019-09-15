<template>
    <div class="container bg-white rounded mt-3 flex shadow">
        <ul class="flex">
            <li class="px-6 py-3 navPosts">
                <a href="#" id="published">Published</a>
            </li>
            <li class="px-6 py-3 navPosts">
                <a href="#" id="drafts">Drafts</a>
            </li>
        </ul>
        <div class="py-3 ml-auto">
            <input class="focus:outline-none" type="text" placeholder="search . . .">
        </div>
        <a href="#" class="px-6 py-3">
            <i class="fas fa-search"></i>
        </a>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .navPosts {
        border-bottom: 4px solid transparent;
    }

    .navPosts:hover {
        border-bottom: 4px solid #23282E;
    }
</style>