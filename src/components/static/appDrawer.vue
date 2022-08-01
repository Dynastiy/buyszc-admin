<template>
  <div>
    <div class="main--app--drawer shadow-lg">
      <div class="top--image text-center">
        <img src="@/assets/img/zugacoinpic.png" alt="" class="mx-auto w-20" />
      </div>

      <ul class="list-unstyled" v-if="isAdmin">
        <li v-for="item in menu" :key="item.id">
          <span class="menu--header"> {{ item.menu_header }} </span>
          <ul v-if="item.sub_menu">
            <li v-for="sub_item in item.sub_menu" :key="sub_item.id">
              <a
                @click="logOut"
                href="javascript:(void)"
                v-if="sub_item.url == '/sign-in'"
                class="align-items-center d-flex"
                style="gap: 15px"
              >
                <span class="material-icons"> {{ sub_item.icon }} </span>
                <span> {{ sub_item.menu_item }}</span>
              </a>
              <router-link
                v-else
                :to="sub_item.url"
                class="align-items-center d-flex"
                style="gap: 15px"
              >
                <span class="material-icons">
                  {{ sub_item.icon }}
                </span>
                <span> {{ sub_item.menu_item }} </span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="list-unstyled" v-else>
        <li v-for="item in user" :key="item.id">
          <span class="menu--header"> {{ item.menu_header }} </span>
          <ul v-if="item.sub_menu">
            <li v-for="sub_item in item.sub_menu" :key="sub_item.id">
              <a
                @click="logOut"
                href="javascript:(void)"
                v-if="sub_item.url == '/sign-in'"
                class="align-items-center d-flex"
                style="gap: 15px"
              >
                <span class="material-icons">
                  {{ sub_item.icon }}
                </span>
                <span> {{ sub_item.menu_item }}</span>
              </a>
              <router-link
                v-else
                :to="sub_item.url"
                class="align-items-center d-flex"
                style="gap: 15px"
              >
                <span class="material-icons">
                  {{ sub_item.icon }}
                </span>
                <span> {{ sub_item.menu_item }}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import menu_items from "@/api/menu.js";
import user_items from "@/api/user.js";
export default {
  data: () => {
    return {
      menu: menu_items,
      user: user_items,
    };
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
    isAdmin() {
      return this.$store.getters.getUser.name == "admin";
    },
  },

  methods: {
    async logOut() {
      // let res = await this.$axios.post("/signout");
      // console.log(res);
      this.$store.dispatch("login", { token: "", user: "" });
      this.$toastify({
        text: `Logged out `,
        className: "info",
        style: {
          background: "green",
        },
      }).showToast();
      this.$router.push("/sign-in");
    },
  },
};
</script>
