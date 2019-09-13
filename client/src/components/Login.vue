<template>
  <!--Login Page-->
  <div id="loginPage" v-if="currentPage === 'loginPage' || !isLogin">
    <!--This is the jumbotron. The position is right below the navbar-->
    <div class="jumbotron text-center" style="margin-bottom:0" id="jumbotron">
      <img src="https://media.giphy.com/media/3ohhwEVKBOZd7bCQ7u/giphy.gif" alt="giphy" id="giphy" />
      <h1>
        <i class="fab fa-wordpress"></i> Think Tank
      </h1>
      <p>Tank What You Think!</p>
    </div>

    <!--This is the content area, di mana hal2 berikut muncul secara bergantian melalui show/hide:
    login, register, create post, edit post, drafts, view posts. SEMUA content HARUS berada di dalam kotak ini-->
    <div class="col-sm-12">
      <!--Div container dan col 12 ini penting banget biar bentuk area contentnya rapi dan terdistribusi dengan tepat ukurannya di dalam browser!-->

      <!--Login Form-->
      <div v-if="currentPage === 'loginPage' && currentForm === 'login'">
        <div class="container" id="loginForm">
          <h4>Login</h4>
          <!-- <div id="errorLogin" v-model="errorLogin">
              <div class="alert alert-danger alert-dismissible fade show">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Error!</strong>
              </div>
          </div>-->
          <div id="emailLogin">
            <form>
              <div class="form-group">
                <label for="login-email">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  id="login-email"
                  placeholder="Enter email"
                  name="email"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <label for="login-password">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="login-password"
                  placeholder="Enter password"
                  name="password"
                  v-model="password"
                />
              </div>

              <p>
                <button
                  type="submit"
                  class="btn btn-primary"
                  id="login-button2"
                  @click.prevent="login()"
                >Login</button>
              </p>
            </form>
          </div>

          <hr />

          <div id="loginOption">
            <div class="row">
              <div>
                <button type="button" id="github" class="btn btn-light">
                  <i class="fab fa-github"></i> Login with
                  Github
                </button>
              </div>
              <div>
                <div class="g-signin2" id="gmail" data-onsuccess="onSignIn"></div>
              </div>
            </div>
          </div>
          <p>
            Don't have an account? Click here to
            <a href="#" id="register-button" @click.prevent="showRegister()">register.</a>
          </p>
        </div>
      </div>

      <!--Register Form-->
      <div v-else-if="currentPage === 'loginPage' && currentForm === 'register'">
        <div class="container" id="registerForm">
          <div id="registerContent">
            <div id="errorSignup"></div>
            <form>
              <h4>Register</h4>

              <div class="form-group">
                <label for="register-name">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="register-name"
                  placeholder="Enter name"
                  name="name"
                  v-model="name"
                />
              </div>
              <div class="form-group">
                <label for="register-email">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  id="register-email"
                  placeholder="Enter email"
                  name="email"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <label for="register-password">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="register-password"
                  placeholder="Enter password"
                  name="password"
                  v-model="password"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                id="register-button2"
                @click.prevent="register()"
              >Register</button>
            </form>
          </div>
          <br />
          <p>
            Already have an account? Click here to
            <a href="#" id="login-button" @click.prevent="showLogin()">login.</a>
          </p>
        </div>
      </div>
    </div>
  </div>
  <!--End of Login Page-->
</template>

<script>
export default {};
</script>

<style>
</style>