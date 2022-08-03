<template>
  <div>
    <div class="app--header">
      <div class="container">
        <div class="d-flex align-items-center justify-content-between">
          <div class="logo">
            <img
              src="@/assets/img/zugacoinpic.png"
              width="50"
              alt=""
              srcset=""
            />
          </div>
          <div class="d-flex align-items-center" style="gap: 20px">
            <div class="login--btn">
              <button
                class="main--btn login"
                v-show="!loggedIn"
                @click="goToLogin"
              >
                Login
              </button>
            </div>
            <div class="register--btn">
              <button
                class="main--btn signup"
                v-show="!loggedIn"
                @click="goToSignup"
              >
                Signup
              </button>
            </div>
            <div class="register--btn">
              <button
                class="main--btn signup"
                v-show="loggedIn"
                @click="goToDashboard"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    goToSignup() {
      this.$router.push("/sign-up");
    },
    goToDashboard() {
      if (this.isAdmin) {
        this.$router.push("/admin/dashboard");
      } else {
        this.$router.push("/user/dashboard");
      }
    },
  },
  computed: {
    isAdmin() {
      return this.$store.getters.getUser.name == "admin";
    },
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
