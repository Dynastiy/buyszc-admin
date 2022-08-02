<template>
  <div>
    <!-- <h2>Analytics</h2> -->
    <div class="flex flex-col md:flex-row gap-4 justify-between items-center">
      <h1 class="font-bold">Welcome User 😊</h1>

      <div class="flex space-x-4 justify-center">
        <div>
          <button
            @click="$router.push('/user/deposit')"
            type="button"
            class="inline-block px-6 py-3 border-2 border-[#f0b90b] text-[#f0b90b] font-medium text-xs leading-tight uppercase rounded hover:bg-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Make Deposit
          </button>
          <button
            type="button"
            class="mx-3 inline-block px-6 py-3 border-2 bg-[#000407] text-[#f0b90b] font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-7 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            data-bs-toggle="modal"
            data-bs-target="#withdwar"
          >
            Request Withdrawal
          </button>
        </div>
      </div>
    </div>
    <!-- Analytics  -->
    <!-- {{ userAccount }} -->
    <section class="my-5 analytics" v-if="showUserAccount">
      <div class="price--options-1 price--options cursor-pointer">
        <h6 class="mb-3">Balance</h6>
        <div class="flex flex-col gap-2 justify-between">
          <h1 class="font-bold">
            {{ formatCurrency(userAccount, "gmd") }}
          </h1>
          <h1 class="font-bold">ZSC - {{ userAccount / 0.0062 }}</h1>
        </div>
      </div>
      <div
        class="price--options-2 price--options cursor-pointer"
        @click="$router.push('/user/deposit/pending')"
      >
        <h6 class="mb-3">Pending Deposits</h6>
        <h1 class="font-bold text-xl">
          {{
            dashboard.pending_deposits ? dashboard.pending_deposits.length : ""
          }}
        </h1>
      </div>
      <div
        class="price--options-3 price--options cursor-pointer"
        @click="$router.push('/user/deposit/completed')"
      >
        <h6 class="mb-3">Completed Deposits</h6>
        <h1 class="font-bold text-xl">
          {{
            dashboard.completed_deposits
              ? dashboard.completed_deposits.length
              : ""
          }}
        </h1>
      </div>
      <div
        class="price--options-4 price--options cursor-pointer"
        @click="$router.push('/user/deposit/cancelled')"
      >
        <h6 class="mb-3">Cancelled Deposits</h6>
        <h1 class="font-bold text-xl">
          {{
            dashboard.canceled_deposits
              ? dashboard.canceled_deposits.length
              : ""
          }}
        </h1>
      </div>
    </section>

    <!-- Transactions Table  -->
    <section class="mt-4">
      <h3 class="font-bold">Deposits</h3>
      <div class="mt-4 other--tables">
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0" v-if="!loading">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Date</th>
                <th scope="col">Wallet Address</th>
                <th scope="col">Amount (GMD)</th>
                <th scope="col">Amount (BNB)</th>
                <th scope="col">Transaction Hash</th>
                <!-- <th scope="col">Payment Proof</th> -->
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(deposit, index) in deposits" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ timeStamp(deposit.created_at) }}</td>
                <td>{{ deposit.wallet_address }}</td>
                <td>
                  &#8358;
                  {{
                    formatCurrency(Number(deposit.amount_gambian_dalasi), "gmd")
                  }}
                </td>
                <td>{{ deposit.amount_bnb }} &nbsp; BNB</td>
                <td>
                  {{
                    deposit.transaction_hash ? deposit.transaction_hash : "N/A"
                  }}
                </td>
                <!-- <td>
                  <a
                    target="_blank"
                    :href="'https://api.buybnb.io/' + deposit.payment_proof"
                    >View Deposit Proof
                  </a>
                </td> -->
                <!-- <td v-if="deposit.payment_report">
                  <a
                    target="_blank"
                    :href="
                      'https://api.buybnb.io/' +
                      deposit.payment_report.credit_proof
                    "
                    >View Credit Proof
                  </a>
                </td> -->
                <td>
                  <span :class="[deposit.status]"> {{ deposit.status }} </span>
                </td>
                <td>
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
                            class="h-5 w-5"
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
                              :href="`https://api.tradezugacoin.com/${deposit.payment_proof}`"
                              target="_blank"
                              >View Proof</a
                            >
                          </li>
                          <li>
                            <router-link
                              :to="{
                                path: `/user/deposit/${deposit.id}`,
                              }"
                              class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                              href="#"
                              >View details</router-link
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </td>
                <!-- <td> <span :class="[deposit.status]"> {{ deposit.status }} </span> </td> -->
                <!-- <td><button class="view--more" @click="creditUser()">Credit</button></td> -->
              </tr>
            </tbody>
          </table>
          <div v-if="loading" class="h-96 flex items-center justify-center">
            <div class="flex justify-center items-center">
              <div
                class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  nairaFilter,
  percentFilter,
  percentageFilter,
  timeStamp,
} from "@/plugins/filter.js";
export default {
  data() {
    return {
      loading: false,
      nairaFilter,
      percentFilter,
      percentageFilter,
      timeStamp,
      dashboard: {},
      deposits: [],
      userAccount: null,
      showUserAccount: null,
    };
  },
  computed: {},
  methods: {
    formatCurrency(amount, currency) {
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: currency,
      });
    },
    async getAnalytics() {
      this.loading = true;
      let res = await this.$axios.get("/user-dashboard");
      let userAccount = await this.$axios.get("/auth/user-account");
      console.log(res);
      console.log(userAccount);
      this.dashboard = res.data.user.data[0];
      this.userAccount = userAccount.data.account.balance;
      this.deposits = res.data.user_products_total.data[0].deposits;
      // console.log(this.deposits);
      this.showUserAccount = true;
      this.loading = false;
    },
  },
  async created() {
    this.getAnalytics();
  },
};
</script>
