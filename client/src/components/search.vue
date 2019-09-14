<template>
    <div>
        <input class="searchbar" type="text" placeholder="Looking for something?"><i class="fas fa-search"></i>
    </div>
</template>

<script>
export default {
    data: function(){
        return {

        }
    }
}
</script>

<style scoped>
    input {
        border: 0px;
        height: 80%;
        width: 70%;
        outline: none;
        background-color: transparent;
        font-family: 'Roboto', sans-serif;
        font-size: 0.8rem;
    }
   
    div {
        border: 2px solid #016087;
        border-radius: 20px;
        height: 30px;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    div:focus-within{
        box-shadow: 0px 0px 5px #016087;
        transition-duration: 0.2s;
    }
</style>