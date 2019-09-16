<template>
  <div class="header">
    <form>
      <div class="title">
        <label>Title</label>
        <input type="text" v-model="title" />
      </div>
      <div class="tag">
        <label>Tags</label>
        <input @keyup.space="addTags" type="text" v-model="tag" />
        <div class="tags-list">
          <vs-chip
            closable
            color="primary"
            v-for="(label, index) in tagsShow"
            :key="index"
          >{{label}}</vs-chip>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tag: "",
      tagsShow: [],
      tags: [],
      title: ""
    };
  },
  methods: {
    addTags() {
      this.tags.push(this.tag);
      if (this.tagsShow.length < 5) {
        this.tagsShow.push(this.tag);
      }
      this.tag = "";
    }
  },
  watch: {
    tags: function() {
      this.$emit("passingtags", this.tags);
    },
    title: function() {
      this.$emit("passingTitle", this.title);
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  padding: 10px 30px;
}

label {
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 1px;
}

.title {
  width: 600px;
  height: 50px;
}

.title input {
  padding-left: 20px;
  background: transparent;
  width: 500px;
  height: 30px;
  border: 2px solid black;
  border-radius: 10px;
  outline: none;
}

.tag {
  display: flex;
  width: 800px;
  height: 30px;
}

.tag input {
  padding-left: 20px;
  background: transparent;
  width: 200px;
  height: 30px;
  border: 2px solid black;
  border-radius: 10px;
  outline: none;
}

.tag .tags-list {
  padding-left: 10px;
  width: 700px;
  min-height: 30px;
}
</style>