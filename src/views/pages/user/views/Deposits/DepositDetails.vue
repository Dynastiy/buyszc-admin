<template>
  <div>
    <div v-if="deposit">
      <div class="flex justify-between items-center">
        <h3 class="font-bold md:text-xl">Deposit Details</h3>
        <h3 class="font-bold">
          Status -
          <span :class="[deposit.status]" class="text-xs">
            {{ deposit.status }}</span
          >
        </h3>
      </div>
      <div class="lg:w-2/4 mx-auto my-5">
        <div class="bg-white p-4 rounded-lg">
          <div class="flex justify-between items-center mt-4">
            <h5 class="font-semibold text-sm md:text-base">Date</h5>
            <h5 class="text-xs md:text-base">
              {{ moment(deposit.created_at).format("YYYY-MM-DD") }}
            </h5>
          </div>
          <div class="flex justify-between items-center mt-4">
            <h5 class="font-semibold text-sm md:text-base">ID</h5>
            <h5 class="text-xs md:text-base">{{ deposit.id }}</h5>
          </div>

          <div class="flex justify-between items-center mt-4">
            <h5 class="font-semibold text-sm md:text-base">Wallet address</h5>
            <h5 class="text-xs md:text-base">{{ deposit.wallet_address }}</h5>
          </div>
          <div class="flex justify-between items-center mt-4">
            <h5 class="font-semibold text-sm md:text-base">Transaction hash</h5>
            <h5 class="text-xs md:text-base">{{ deposit.transaction_hash }}</h5>
          </div>
          <div class="flex justify-between items-center mt-4">
            <h5 class="font-semibold text-sm md:text-base">Amount (GMD)</h5>
            <h5 class="text-xs md:text-base">
              {{ deposit.amount_gambian_dalasi }}
            </h5>
          </div>
          <div class="flex justify-between items-center mt-4">
            <h5 class="font-semibold text-sm md:text-base">Amount (BNB)</h5>
            <h5 class="text-xs md:text-base">{{ deposit.amount_bnb }}</h5>
          </div>
          <div class="flex justify-between items-center mt-4">
            <h5 class="font-semibold text-sm md:text-base">Status</h5>
            <h5 :class="[deposit.status]" class="p-1 px-3 text-xs rounded-2xl">
              {{ deposit.status }}
            </h5>
          </div>
        </div>
        <div class="flex space-x-2 justify-center mt-3">
          <a
            :href="`https://api.tradezugacoin.com/${deposit.payment_proof}`"
            target="_blank"
            class="text-center h-8 w-24 border-2 border-[#f0b90b] bg-transparent text-[#f0b90b] rounded-md"
          >
            View Proof
          </a>
          <!-- <button
            class="h-8 w-24 text-white bg-dark rounded-md"
            v-if="deposit.status !== 'completed'"
          >
            Approve
          </button>
          <button
            class="h-8 w-24 text-white bg-red-700 rounded-md"
            v-if="deposit.status !== 'completed'"
          >
            Cancel
          </button> -->
        </div>
      </div>

      <ProofModal />
    </div>

    <div v-else class="h-96 flex utems-center justify-center">
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
</template>

<script>
export default {
  data() {
    return {
      deposits: [],
    };
  },
  computed: {
    deposit() {
      if (this.deposits) {
        return this.deposits.find(
          (deposit) => deposit.id == this.$route.params.id
        );
      } else {
        return [];
      }
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
      this.loading = false;
      console.log(this.deposits);
    },
    // async getDeposit() {
    //   this.loading = true;
    //   let res = await this.$axios.get(`/find-deposit/${this.$route.params.id}`);
    //   console.log(res);
    //   this.loading = false;
    // },
  },
  async created() {
    // this.getDeposit();
    this.getAnalytics();
  },
};
</script>

<style></style>
