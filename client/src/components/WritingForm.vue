<template>
  <!--Write & Edit Article-->
  <div id="createArticlePage" v-if="currentPage === 'createArticlePage' && isLogin">
    <div class="col-sm-12">
      <!--Create post form-->
      <div class="container" id="createPost">
        <form>
          <h4 @click.prevent="showWriteArticle()">Create post</h4>
          <div class="form-group" style="color: #000000">
            <label for="titleCreateModal">Title:</label>
            <input
              type="text"
              v-model="articleTitle"
              class="form-control"
              id="titleCreateModal"
              placeholder="Enter something"
              name="title"
            />
          </div>

          <div class="form-group" style="color: #000000">
            <label for="articleContent">Description:</label>
            <wysiwyg v-model="articleContent" id="articleContent"></wysiwyg>
          </div>
          <div class="form-group" style="color: #000000">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile" />
              <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
          </div>
          <!-- Form buttons -->
          <div id="form-buttons">
            <button type="button" class="btn btn-success" @click.prevent="createArticle()">Submit</button>
            <button type="button" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-danger" @click.prevent="showDashboard()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--End of Write & Edit Article-->
</template>

<script>
export default {};
</script>

<style>
</style>