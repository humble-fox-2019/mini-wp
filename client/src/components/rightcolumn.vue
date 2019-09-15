 <template>
  <div class="isi">
    <div class="bottom" v-for="(article,index) in articles" :key="index">
      <div class="judul">
        <div>
          <h4>{{article.title}}</h4>
          <p v-html="article.content"></p>
          <p>by {{article.author}}</p>
          <p>{{String(new Date(article.createdAt)).substr(0,10)}}</p>
          <div>
            <p>tags:</p>
            <a href="#" @click="getTags(t)" :key="i" v-for="(t,i) in article.tags">
              <vs-chip>{{t}}</vs-chip>
            </a>
          </div>
        </div>
        <div class="photo">
          <div class="ph">
            <img :src="article.featured_image" alt="foto" />
          </div>
          <div class="more">
            <div class="dots">
              <a class="publish" href="#" @click="deleteItem(article._id)">delete</a>
              <a class="publish" href="#" @click="clickEdit(article)">edit</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: ["articles", "tempArticles"],
  data() {
    return {
      filter: ""
    };
  },
  methods: {
    getTags(name) {
      this.$emit("tagss", name);
    },
    deleteItem(input) {
      let id = input;
      let token = localStorage.getItem("token");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(result => {
          if (result.value) {
            Swal.fire({
              title: "Deleting your article...",
              allowOutsideClick: () => !Swal.isLoading()
            });
            Swal.showLoading();
            axios({
              method: "DELETE",
              url: `http://34.87.37.210/articles/delete/${id}`,
              headers: {
                token
              }
            })
              .then(data => {
                Swal.close()
                this.$emit("delete-article", id);
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              })
              .catch(error => {
                let message =
                  (error.response.data && error.response.data.message) ||
                  "failed to Delete";
                Swal.fire("Error!", message, "error");
              });
          }
        })
        .catch(error => {
          let message =
            (error.response.data && error.response.data.message) ||
            "failed to Delete";
          Swal.fire("Error!", message, "error");
        });
    },
    clickEdit(input) {
      this.$emit("updateFile", input);
    }
  }
};
</script>

<style scoped>
.published {
  margin-right: 15%;
}
.published:hover {
  border-bottom: 1px solid rgba(33, 117, 155, 0.5);
}

.publish {
  color: #21759b;
}
#draft {
  color: #21759b;
}

.isi {
  height: 50vh;
}
.bottom {
  margin-bottom: 5%;
  padding: 5%;
  background-color: white;
  -webkit-box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  height: 220px;
}
.judul {
  display: flex;
  justify-content: space-between;
}
.photo {
  display: flex;
}
.ph {
  margin-right: 10%;
}
a {
  text-decoration: none;
}
img {
  width: 100px;
  height: 70px;
}
.clickaa {
  cursor: grab;
}
</style>
            
            
