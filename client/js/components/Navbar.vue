<template>
  <div>
        <div class="sidenav" style="display: flex; justify-content: space-between; flex-direction: column">
            <div>
                <a href="#" id="my-article-btn" @click="changeMainPage('myArticle')">
                    <span class="nav-icon" style="margin-right: 15px">
                            <i class="far fa-list-alt"></i>
                        </span>
                    <span> My Article</span>
                </a>
                <a href="#" id="all-article-btn" @click="changeMainPage('allArticle')">
                    <span class="nav-icon" style="margin-right: 15px">
                            <i class="fas fa-list"></i>
                        </span>
                    <span>
                            List of Articles
                        </span>
                </a>
                <a href="#" id="add-article-btn" @click="changeMainPage('addNewArticle')">
                    <span class="nav-icon" style="margin-right: 15px">
                            <i class="fas fa-plus-square"></i> 
                        </span>
                    <span> Add Article</span>
                </a>
            </div> 
            <div style="margin-bottom: 30px;">
                <a href="#" id="logout-btn" @click.prevent="logout()" >
                    <span class="nav-icon" style="margin-right: 15px">
                        <i class="fas fa-power-off"></i> 
                    </span> 
                    <GoogleLogin class="googleBtn" :params="params" :logoutButton=true style="padding-right: 80px; padding-top:20px; outline:none;">Logout</GoogleLogin>
                </a>
            </div> 
        </div>
  </div>
</template>

<script>
import server from '../api/helper'
const { client_id , Swal } = server

import GoogleLogin from 'vue-google-login';

export default {
    data : function () {
        return {
            params: {
                client_id
            }
        }
    },
    methods: {
        changeMainPage ( page ) {
            this.$emit('changeMainPage' ,page )
        },
        logout() {
            Swal.fire({
                title: 'Are you sure want to logout? :(',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, i want to logout!'
                }).then((result) => {
                if (result.value) {
                     localStorage.removeItem('token');
                    localStorage.removeItem('userId' )

                    this.$emit('logout')
                }
            })
           
        }
    },
    components : {
        GoogleLogin
    }
}
</script>

<style scoped>
    .googleBtn {
        border: none;
        background-color: transparent;
        color: #818181;
        font-size: 15px;
    }
    .googleBtn:hover {
        color: #f1f1f1;
    }
</style>