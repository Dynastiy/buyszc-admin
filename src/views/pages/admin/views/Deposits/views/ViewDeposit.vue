<template>
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
          <h5 class="font-semibold text-sm md:text-base">Transaction hash</h5>
          <h5 class="text-xs md:text-base">
            {{ deposit.transaction_hash ? deposit.transaction_hash : "N/A" }}
          </h5>
        </div>
        <div class="flex justify-between items-center mt-4">
          <h5 class="font-semibold text-sm md:text-base">Wallet address</h5>
          <h5 class="text-xs md:text-base">{{ deposit.wallet_address }}</h5>
        </div>
        <div class="flex justify-between items-center mt-4">
          <h5 class="font-semibold text-sm md:text-base">Amount (GMB)</h5>
          <h5 class="text-xs md:text-base">
            {{ formatCurrency(deposit.amount_gambian_dalasi, "gmd") }}
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
        <button
          class="h-8 w-24 border-2 border-[#f0b90b] bg-transparent text-[#f0b90b] rounded-md"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
        >
          View Proof
        </button>
        <button
          @click="updateDeposit('completed')"
          class="h-8 w-24 text-white bg-dark rounded-md"
          v-if="deposit.status == 'pending'"
        >
          Approve
        </button>
        <button
          @click="updateDeposit('canceled')"
          class="h-8 w-24 text-white bg-red-700 rounded-md"
          v-if="deposit.status == 'pending'"
        >
          Cancel
        </button>
      </div>
    </div>

    <ProofModal :img="deposit.payment_proof" />
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
</template>

<script>
import ProofModal from "../components/ProofModal.vue";
export default {
  components: {
    ProofModal,
  },
  data() {
    return {
      deposit: null,
    };
  },
  methods: {
    formatCurrency(amount, currency) {
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: currency,
      });
    },
    async getDeposits() {
      this.loading = true;
      try {
        let res = await this.$axios.get(
          `/admin/get-deposits?id=${this.$route.params.id}`
        );
        console.log(res.data);
        this.deposit = res.data.data.find(
          (data) => data.id == this.$route.params.id
        );
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },

    async updateDeposit(status) {
      console.log(status);
      this.loading = true;
      try {
        let res = await this.$axios.post(
          `/admin/update-deposit-status/${this.$route.params.id}`,
          { status: status }
        );
        this.$toastify({
          text: ` ${res.data.message}`,
          className: "warning",
          style: {
            background: "green",
          },
        }).showToast();
        console.log(res);
        await this.getDeposits();
      } catch (error) {
        console.log(error.response);
      }
      this.loading = false;
    },
  },

  created() {
    this.getDeposits();
  },
};
</script>

<style></style>
