 <template>
  <div id="column-right-write">
    <div class="container2">
      <div class="bottom">
        <form action enctype="multipart/form-data" @submit.prevent="submitForm">
          <div>
            <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
          </div>
          <div class="filess">
            <input type="file" ref="file" v-on:change="handlefileupload($event)" />
          </div>
          <div>
            <input type="text" placeholder="Title" v-model="title" />
          </div>
          <div id="textarea">
            <editor v-model="content"></editor>
          </div>
          <br />
          <div class="tombol">
            <div class="submitbutton">
              <button>submit</button>
            </div>
            <div>
              <button @click="clearItem">clear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import editor from "./editor.vue";
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  components: {
    editor,
    VueTagsInput
  },
  data() {
    return {
      title: "",
      content: "",
      image: "",
      tag: "",
      tags: []
    };
  },
  methods: {
    handlefileupload() {
      let file = event.target.files || event.dataTransfer.files;
      this.image = file[0];
    },
    submitForm() {
      let taggs = []
      for(let i = 0; i < this.tags.length;i++){
        taggs.push(this.tags[i].text)
      }
      let token = localStorage.getItem("token");
      let formData = new FormData();
      formData.set("featured_image", this.image);
      formData.set("title", this.title);
      formData.set("content", this.content);
      formData.set("tagku", taggs)
      axios({
        method: "POST",
        url: "http://34.87.37.210/articles/create",
        headers: {
          token
        },
        data: formData
      })
        .then(data => {
          let response = data.data.data;
          this.$emit("uploadFile", response);
          Swal.fire(
            "Success",
            "Your Article is Successfully Submitted",
            "success"
          );
        })
        .catch(error => {
          let message = error.response.data && error.response.data.message || 'Failed to Create'
          Swal.fire("Error!",message, "error");
        });
    },
    clearItem() {
      this.title = "";
      this.content = "";
      this.featured_image = "";
    }
  }
};
</script>

<style scoped>
#column-right-write {
  height: 100vh;
  background-color: #0001;
  width: 80%;
  overflow: auto;
  display: flex;
  justify-content: center;
}
.container2 {
  margin-top: 5%;
  width: 70%;
}
.bottom {
  margin-bottom: 5%;
  padding: 5%;
  background-color: white;
  -webkit-box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
}
#textarea {
  height: 500px;
  margin-bottom: 20px;
}
.tombol {
  margin-top: 2%;
  display: flex;
  justify-content: center;
}
.submitbutton {
  margin-right: 3%;
}
input[type="text"] {
  width: 100%;
  height: 5%;
}
.filess {
  margin-top: 20px;
}
</style>              
               
               
