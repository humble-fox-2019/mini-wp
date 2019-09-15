function onSignIn(googleUser) {
    let idToken = googleUser.getAuthResponse().id_token;
    console.log('sss')
    myaxios
        .post("/Gsignin", { idToken })
        .then(({ data }) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.userData.id);
            localStorage.setItem("name", data.userData.name);
            this.$emit("changepage", "dashboard");
        })
        .catch(err => {
            this.errors = err.response.data.message;
            setTimeout(() => {
                this.errors = "";
            }, 2000);
        })
        .finally(() => {
            // Add some stuff like loading done
        });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });

    localStorage.clear();
    this.page = "signin";
}