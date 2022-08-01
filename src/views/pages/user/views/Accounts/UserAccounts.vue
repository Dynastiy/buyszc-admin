<template>
  <div>
    <h3 class="font-bold text-xl">Withdrawal Accounts</h3>

    <div class="bg-white rounded-lg p-3 md:w-2/4 lg:w-1/4 my-5" v-if="account">
      <div class="flex justify-between">
        <div class="flex flex-col justify-between">
          <h5>Account Name</h5>
          <h5 class="font-bold">{{ account.bank_name }}</h5>
        </div>
        <div class="flex flex-col justify-between">
          <div class="flex justify-center">
            <div>
              <div class="dropdown relative">
                <a
                  href="#"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </a>
                <ul
                  class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li>
                    <a
                      class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      href="javascript:(void)"
                      data-bs-toggle="modal"
                      data-bs-target="#userAccount"
                      >Edit</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                      href="#"
                      @click="onDelete"
                      >Delete</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between my-3">
        <h5>Account Number</h5>
        <h5 class="font-bold">{{ account.account_no }}</h5>
      </div>
      <div class="flex flex-col justify-between">
        <h5>Account Name</h5>
        <h5 class="font-bold">{{ account.bank_name }}</h5>
      </div>
    </div>

    <div
      class="h-60 flex flex-col justify-center items-center gap-4 text-center"
    >
      <h4 class="font-bold">Add Local Accounts for processing withdrawals</h4>
      <button
        class="flex items-center gap-3text-xs inline-block py-2 px-3 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-800 text-white rounded"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        <span>Add</span>
      </button>
    </div>
    <AddAccount :action="action" @getAccounts="getAccounts" />
    <EditAccount
      :userAccount="account"
      v-if="account"
      @getAccounts="getAccounts"
    />
  </div>
</template>

<script>
import AddAccount from "../../components/AddAccount.vue";
import EditAccount from "../../components/EditAccount.vue";
export default {
  components: { AddAccount, EditAccount },
  data() {
    return { account: null, action: null };
  },
  methods: {
    async getAccounts() {
      let res = await this.$axios.get("/auth/user-account");
      this.account = res.data.bank_detail;
      console.log(res);
    },

    async onDelete() {
      if (confirm("Delete account?")) {
        let res = await this.$axios.post(
          `/delete-bank-detail/${this.account.id}`
        );
        console.log(res);
        this.$toastify({
          text: ` ${res.data.message}`,
          className: "success",
          style: {
            background: "green",
          },
        }).showToast();

        await this.getAccounts();
      }
    },
  },
  created() {
    this.getAccounts();
  },
};
</script>

<style></style>
