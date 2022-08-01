<template>
  <div>
    <!-- <h2>Analytics</h2> -->
    <h1 class="font-bold">Welcome Admin 😊</h1>
    <!-- Analytics  -->
    <section class="mt-4 analytics">
      <div class="price--options-1 price--options">
        <h1>
          {{ dashboard.deposits_total }}
        </h1>
        <h6>Total Deposits</h6>
      </div>
      <div class="price--options-2 price--options">
        <h1>
          {{ dashboard.pending_deposits_total }}
        </h1>
        <h6>Pending Deposits</h6>
      </div>
      <div class="price--options-3 price--options">
        <h1>
          {{ dashboard.completed_deposits_total }}
        </h1>
        <h6>Completed Deposits</h6>
      </div>
      <div class="price--options-4 price--options">
        <h1>
          {{ dashboard.canceled_deposits_total }}
        </h1>
        <h6>Cancelled Deposits</h6>
      </div>
    </section>

    <!-- Transactions Table  -->
    <section class="mt-4">
      <h3 class="font-bold">Deposits</h3>
      <div class="mt-4 other--tables">
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Date</th>
                <th scope="col">Wallet Address</th>
                <th scope="col">Amount (GMB)</th>
                <th scope="col">Amount (BNB)</th>
                <th scope="col">Transaction Hash</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
                <!-- <th scope="col">Actions</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(deposit, index) in deposits" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ timeStamp(deposit.created_at) }}</td>
                <td>{{ deposit.wallet_address }}</td>
                <td>
                  {{ formatCurrency(deposit.amount_gambian_dalasi, "gmb") }}
                </td>
                <td>{{ deposit.amount_bnb }}BNB</td>
                <td>
                  {{
                    deposit.transaction_hash ? deposit.transaction_hash : "N/A"
                  }}
                </td>

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
                                path: `/admin/dashboard/deposits/${deposit.id}`,
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

                <!-- <td><button class="view--more" @click="creditUser()">Credit</button></td> -->
              </tr>
            </tbody>
          </table>
          <div>
            <pagination :meta="depositMeta" @next="getDeposits" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import pagination from "@/components/appPagination.vue";
import {
  nairaFilter,
  percentFilter,
  percentageFilter,
  timeStamp,
} from "@/plugins/filter.js";
export default {
  components: { pagination },
  data() {
    return {
      nairaFilter,
      percentFilter,
      percentageFilter,
      timeStamp,
      dashboard: {},
      deposits: [],
      depositMeta: null,
    };
  },
  methods: {
    formatCurrency(amount, currency) {
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: currency,
      });
    },
    async getAnalytics() {
      let res = await this.$axios.get("/admin/dashboard");
      console.log(res.data);
      this.dashboard = res.data;

      console.log(this.deposits);
    },

    async getDeposits(page = 1) {
      let res = await this.$axios.get(`/admin/get-deposits/?page=${page}`);
      console.log(res);
      this.deposits = res.data.data;
      this.depositMeta = res.data;
    },
  },
  async created() {
    this.getAnalytics();
    this.getDeposits();
  },
};
</script>
