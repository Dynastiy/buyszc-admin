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
                <th scope="col">Wallet Address</th>
                <th scope="col">Amount (GMD)</th>
                <th scope="col">Amount (BNB)</th>
                <th scope="col">Transaction Hash</th>
                <!-- <th scope="col">Payment Proof</th> -->
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
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
