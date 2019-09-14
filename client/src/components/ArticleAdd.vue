<template>
  <div class="block animated fadeIn">
    <div class="block-header block-header-default">
      <h3 class="block-title">Add new Article</h3>
      <div class="block-options">
        <div class="block-options-item">
          <code>.</code>
        </div>
      </div>
    </div>
    <div class="block-content d-flex justify-content-center">
      <div class="col-9">
        <form action="be_forms_elements_bootstrap.html" method="post" onsubmit="return false;">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="title" />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              name="content"
              class="form-control"
              id="content"
              cols="30"
              rows="10"
              v-model="content"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="isPublished">Publish</label>
            <select class="form-control" id="isPublished" v-model="isPublished">
              <option value="true">Publish</option>
              <option value="false">Draff</option>
            </select>
          </div>
          <br />
          <div class="form-group">
            <button type="submit" class="btn btn-alt-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      isPublished: true
    };
  }
};
</script>

<style>
</style>