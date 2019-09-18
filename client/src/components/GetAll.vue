<template>
  <div id="timeline-box">
    <div class="navabar-timeline" id="box">
      <div class="serachArt">
        <div class="search-art">
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="search"
            />
            <button type="submit">
              <i class="fas fa-search fa-2x"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="articles" id="box" v.on>
      <div class="article" id="number" v-for="item in items" :key="item.id">
        <div class="pic">
          <img v-bind:src="item.featured_image" alt />
        </div>
        <div class="summary">
          <h3>{{item.title}}</h3>
          <p>{{item.content}}</p>
        </div>
        <div class="action">
          <div class="action-owner">
            <i class="fas fa-book-open fa-2x" @click="toReadOne(item._id)"></i>
            <i class="fas fa-pencil-alt fa-2x" @click="toEditForm(item._id)"></i>
            <i class="fas fa-trash-alt fa-2x" @click="deleteArticle(item._id)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
let baseUrl = "http://35.247.158.142";
export default {
  data() {
    return {
      items: [],
      search: "",
      currentTitle: "",
      currentContent: ""
    };
  },
  methods: {
    getMyArticle() {
      axios({
        method: "GET",
        url: baseUrl + "/articles/myarticle",
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          // console.log(result);
          this.items = result.data.articles;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteArticle(input) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        Swal.fire({
          title: "Deleting your Article...",
          allowOutsideClick: () => !Swal.isLoading()
        });
        Swal.showLoading();
        if (result.value) {
          axios({
            method: "DELETE",
            url: baseUrl + "/articles/" + input,
            headers: {
              token: localStorage.token
            }
          })
            .then(data => {
              // this.articles = this.articles.filter(el => el._id !== input);
              Swal.fire(
                "Deleted!",
                "Your article has been deleted.",
                "success"
              );
              // this.getMyArticle()
              window.location.href='http://mini-wp.ayusudi.com/'
              // console.log(data);
            })
            .catch(err => {
              console.log(err.response);
            });
        } else {
          Swal.fire("Cancel", "We keep your article save", "success");
        }
      });
    },
    toEditForm(input) {
      // console.log(input);
      this.$emit("changeToEdit", input);
    },
    toReadOne(input) {
      this.$emit("changeToRead", input);
    }
  },
  created() {
    this.getMyArticle();
  },
  watch: {
    search(a, b) {
      if (a.length > 0) {
        let regex = new RegExp(a, "i");
        this.items = this.items.filter(el => regex.test(el.title));
      } else {
        this.getMyArticle();
      }
    }
  }
};
// @click="searchArticle"@submit.prevent="trackingSearch""
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Heebo|Merriweather|Montserrat|Patua+One&display=swap");

#timeline-box {
  padding: 2% 6% 2% 6%;
  margin: 7.5% 4.2% 4.2% 7%;
  min-height: 100vh;
  background: #313e40;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 25px;
}

.navabar-timeline {
  padding: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border-radius: 25px;
  width: 58vw;
  height: 10vh;
  margin: 4%;
  background: #f2d0a7;
  font-family: "Patua One", cursive;
  font-size: 3vh;
}

.articles {
  padding-top: 8%;
  padding-bottom: 7%;
  border-radius: 25px;
  width: 65vw;
  min-height: 100vh;
  background: #d9ab91;
  margin-bottom: 4%;
}

p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  font-family: "Heebo", sans-serif;
  font-size: 21px;
}

h3 {
  font-family: "Heebo", sans-serif;
  font-size: 24px;
}

input {
  height: 5vh;
  width: 25vw;
  border-radius: 15px;
  font-size: 18px;
  margin-right: 10px;
}

button[type="submit"] {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  outline: none;
}

button[type="submit"]:hover {
  cursor: pointer;
  background: rgb(13, 13, 82);
  color: white;
}

.article {
  display: grid;
  grid-template-columns: 2fr 6fr 2fr;
  margin: 35px;
  height: 10vw;
}

.summary {
  padding: 2% 0 2% 2%;

  background: rgb(253, 253, 253);
}

.action {
  display: flex;
  padding-left: 14px;
  flex-direction: column;
  justify-content: center;
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
  background: rgb(229, 232, 235);
}

input {
  outline: 0;
  padding-left: 10px;
}

input:hover {
  outline: 0;
  padding-left: 10px;
}

.action i {
  position: relative;
  color: rgb(76, 5, 104);
  padding: 4%;
  margin: 4%;
}

.action i:hover {
  cursor: pointer;
  position: relative;
  color: rgb(0, 0, 17);
  margin: 4%;
  bottom: 2.5%;
  font-size: 40px;
}

.pic {
  background: rgb(66, 85, 88);
  display: flex;
  justify-content: center;
  border-top-left-radius: 13px;
  border-bottom-left-radius: 13px;
}

img {
  object-fit: contain;
  height: 20vh;
  width: 100%;
}
</style>