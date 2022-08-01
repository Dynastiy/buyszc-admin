<template>
  <div>
    <app-header />

    <app-drawer v-if="isAdmin" />
    <userSidebar v-else />

    <div id="main--dashboard">
      <RequestWithdrawalModal />
      <router-view />
    </div>
  </div>
</template>

<script>
import AppDrawer from "@/components/static/appDrawer.vue";
import userSidebar from "@/components/static/userSidebar.vue";
import AppHeader from "@/components/static/appHeader.vue";
import RequestWithdrawalModal from "@/components/modals/RequestWithdrawal.vue";
export default {
  components: {
    AppDrawer,
    AppHeader,
    userSidebar,
    RequestWithdrawalModal,
  },

  computed: {
    isAdmin() {
      return this.$store.getters.getUser.name == "admin";
    },
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$toastify({
        text: `Please Login`,
        className: "alert",
        style: {
          background: "red",
        },
      }).showToast();
      this.$router.push("/sign-in");
    }
  },
};
</script>
