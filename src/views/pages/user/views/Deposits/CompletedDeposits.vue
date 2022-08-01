<template>
  <div>
    <h3 class="font-bold text-xl">Completed Deposits</h3>
    <!-- Transactions Table  -->
    <section class="mt-4">
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
              <tr v-for="(deposit, index) in completedDeposits" :key="index">
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
                  <router-link
                    to=""
                    class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-800 text-white rounded"
                    >View</router-link
                  >
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
    };
  },
  computed: {
    completedDeposits() {
      return this.deposits.filter((data) => data.status == "completed");
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
      let res = await this.$axios.get("/user-dashboard");
      console.log(res);
      this.deposits = res.data.user_products_total.data[0].deposits;
      // console.log(this.deposits);
      this.loading = false;
    },
  },
  async created() {
    this.getAnalytics();
  },
};
</script>

<style></style>
