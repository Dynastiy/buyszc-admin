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
            <h2 class="font-bold text-lg">Create Account</h2>
            <!-- <small>Enter details to login</small> -->
          </div>
          <form action="" @submit.prevent="login">
            <div class="mb-4">
              <label class="" for="">Name</label>
              <input
                type="text"
                v-model="credentials.name"
                required
                class="mb-2"
              />
              <small class="text-danger" v-if="errorMsg"
                ><span v-if="errorMsg.name">* {{ errorMsg.name[0] }}</span>
              </small>
            </div>
            <div class="mb-4">
              <label class="" for="">Email</label>
              <input
                type="email"
                v-model="credentials.email"
                required
                class="mb-2"
              />
              <small class="text-danger" v-if="errorMsg"
                ><span v-if="errorMsg.email"
                  >* {{ errorMsg.email ? errorMsg.email[0] : "" }}</span
                >
              </small>
            </div>
            <div class="mb-4">
              <label class="" for="">Password</label>
              <input
                type="password"
                v-model="credentials.password"
                required
                class="mb-2"
              />
              <small class="text-danger" v-if="errorMsg"
                ><span v-if="errorMsg.password"
                  >* {{ errorMsg.password[0] }}</span
                >
              </small>
            </div>
            <div>
              <div class="d-flex justify-content-center" v-if="loading">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <button type="submit" class="buy--btn" v-else>Register</button>

              <router-link to="/login" class="block mt-3 text-center"
                >Login</router-link
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
      errorMsg: null,
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
          "https://api.tradezugacoin.com/api/auth/signup",
          this.credentials
        );

        console.log("res");
        this.$toastify({
          text: `Welcome ${res.data.user.name}`,
          className: "info",
          style: {
            background: "green",
          },
        }).showToast();

        this.$router.push("/login");
      } catch (error) {
        this.errorMsg = error.response.data.errors;
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
