<template>
  <div>
    <h3 class="font-bold text-xl">All withdrawals</h3>
    <!-- Transactions Table  -->

    <section class="mt-4">
      <div class="mt-4 other--tables">
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0" v-if="!loading">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Date</th>
                <th scope="col">Bank name</th>
                <th scope="col">Account number</th>
                <th scope="col">Account holder name</th>
                <th scope="col">Amount (GMD)</th>
                <th scope="col">Amount (BNB)</th>
                <th scope="col">Transaction Hash</th>
                <!-- <th scope="col">Payment Proof</th> -->
                <th scope="col">Status</th>
                <!-- <th scope="col">Actions</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(deposit, index) in withdrawals" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ timeStamp(deposit.created_at) }}</td>
                <td>{{ deposit.bank_name }}</td>
                <td>{{ deposit.account_no }}</td>
                <td>{{ deposit.account_name }}</td>
                <td>
                  {{ formatCurrency(Number(deposit.amount), "gmd") }}
                </td>
                <td>{{ deposit.amount_bnb }} &nbsp; BNB</td>
                <td>
                  {{
                    deposit.transaction_hash ? deposit.transaction_hash : "N/A"
                  }}
                </td>

                <td>
                  <span :class="[deposit.status]"> {{ deposit.status }} </span>
                </td>
                <!-- <td>
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
                </td> -->
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
    };
  },
  computed: {
    pendingDeposits() {
      return this.deposits.filter((data) => data.status == "pending");
    },
  },
  methods: {
    formatCurrency(amount, currency) {
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: currency,
      });
    },
    async getAnalytics() {
      this.loading = true;
      let res = await this.$axios.get("/auth/user-account");
      console.log(res);
      this.withdrawals = res.data.withdrawals;
      this.loading = false;
    },
  },
  async created() {
    this.getAnalytics();
  },
};
</script>

<style></style>
