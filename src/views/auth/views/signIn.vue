<template>
  <div>
    <div class="user-login-container">
      <div class="user--login">
        <div class="login--box">
          <div class="mb-4 text-center">
            <div class="text-center mb-4">
              <img
                src="@/assets/img/zugacoinpic.png"
                width="50"
                class="mx-auto"
                alt=""
              />
            </div>
            <!-- <h2 class=" ">Admin Login</h2> -->
            <h2 class="font-bold text-lg">Login</h2>
            <!-- <small>Enter details to login</small> -->
          </div>
          <form action="" @submit.prevent="login">
            <div class="mb-4">
              <label class="" for="">Email</label>
              <input type="email" v-model="credentials.email" required />
              <small class="text-danger" v-show="errorMsg"
                >* {{ errorMsg }}
              </small>
            </div>
            <div class="mb-4">
              <label class="" for="">Password</label>
              <input type="password" v-model="credentials.password" required />
              <small class="text-danger" v-show="errorMsg"
                >* {{ errorMsg }}
              </small>
              <small class="text-right block cursor-pointer"
                >Forgot password?
              </small>
            </div>
            <div>
              <div class="d-flex justify-content-center" v-if="loading">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <button type="submit" class="buy--btn" v-else>Login</button>

              <router-link to="/sign-up" class="block mt-3 text-center"
                >Register Now</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      errorMsg: "",
      credentials: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        let res = await axios.post(
          "https://api.tradezugacoin.com/api/auth/signin",
          this.credentials
        );
        const token = res.data.token;
        const user = res.data.user;
        this.$store.dispatch("login", { token, user });
        console.log("res");
        this.$toastify({
          text: `Welcome ${res.data.user.name}`,
          className: "info",
          style: {
            background: "green",
          },
        }).showToast();

        this.$router.push(
          `${
            res.data.user.name == "admin" ? res.data.user.name : "user"
          }/dashboard`
        );
      } catch (error) {
        this.$toastify({
          text: ` ${error.response.data.message}`,
          className: "danger",
          style: {
            background: "red",
          },
        }).showToast();

        // this.errorMsg = error.response.data.message;
      }
      this.loading = false;
      // this.credentials = {};
    },
  },
};
</script>
