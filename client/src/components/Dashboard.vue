<template>
  <!--Dashboard-->
  <div id="dashboardPage" v-if="currentPage === 'dashboardPage' && isLogin">
    <div class="col-sm-12">
      <!--View Post-->
      <div class="content" id="viewPost" v-for="article in articles">
        <p>
          <button
            type="button"
            id="#createButton"
            class="btn btn-dark"
            data-toggle="modal"
            data-target="#createModal"
            @click.prevent="showWriteArticle()"
          >
            <i class="fas fa-edit"></i> Create
            post
          </button>
        </p>
        <div class="card" id="articleCard">
          <img src="./assets/images/bali.jpg" class="card-img-top" alt="nature" />
          <div class="card-body">
            <h4 class="card-title">
              <i class="fas fa-book"></i>
              {{article.title}}
            </h4>
            <p class="card-text" v-html="article.content"></p>
            <button
              type="button"
              class="btn btn-warning"
              href="#editPost"
              id="buttonEdit"
              @click.prevent="showEditArticle(article._id, article.title, article.content)"
            >Edit</button>
            <button
              type=" button"
              class="btn btn-danger"
              data-toggle="modal"
              data-target="#deleteModal"
              id="buttonDelete"
              @click.prevent="deleteArticle(article._id)"
            >Delete</button>
          </div>
          <div class="card-footer text-muted">
            <i class="fas fa-calendar-week"></i> Posted 2 days ago
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--End of Dashboard-->
</template>

<script>
export default {};
</script>

<style>
</style>