<template>
  <div>
    <h3 class="text-bold">Cancelled Transactions</h3>
    <div class="mt-4 other--tables">
      <div class="table-responsive">
        <table class="table table-centered table-nowrap mb-0">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date</th>
              <th scope="col">Wallet Address</th>
              <th scope="col">Amount (NGN)</th>
              <th scope="col">Amount (BNB)</th>
              <th scope="col">Amount (SZC)</th>
              <th scope="col">Transaction Hash</th>
              <th scope="col">Payment Proof</th>
              <th scope="col">Status</th>
              <!-- <th scope="col">Actions</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              Fetching Data . . .
            </tr>
            <tr v-for="(deposit, index) in deposits.data" :key="index" v-else>
              <td>{{ index + 1 }}</td>
              <td>{{ timeStamp(deposit.created_at) }}</td>
              <td>{{ deposit.wallet_address }}</td>
              <td>&#8358;{{ nairaFilter(deposit.amount_naira) }}</td>
              <td>
                <span v-if="deposit.amount_bnb"
                  >{{ deposit.amount_bnb }} BNB</span
                >
                <span v-else>Null</span>
              </td>
              <td>
                <span v-if="deposit.amount_szc">{{ deposit.amount_szc }}</span>
                <span v-else>Null</span>
              </td>
              <td>
                <span v-if="deposit.transaction_hash">{{
                  deposit.transaction_hash
                }}</span>
                <span v-else>Null</span>
              </td>
              <td>
                <a
                  target="_blank"
                  :href="'https://api.buyszc.io/' + deposit.payment_proof"
                >
                  View Proof
                </a>
              </td>
              <td>
                <span :class="[deposit.status]"> {{ deposit.status }} </span>
              </td>
              <!-- <td><button class="view--more--disabled" disabled v-if="deposit.status !== 'pending' ">Done</button>
                                     <div v-else>
                                        <button class="view--more mr-2" @click="creditUser(deposit)">Credit</button>
                                        <button class="view--more bg-danger border-danger" @click="cancelDeposit(deposit)">Cancel</button>
                                     </div>
                                    
                                    </td> -->
            </tr>
            <tr v-show="deposits.total === 0" class="text-danger">
              Nothing Here . . .
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <pagination :meta="deposits" @next="getDeposits" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  nairaFilter,
  percentFilter,
  percentageFilter,
  timeStamp,
} from "@/plugins/filter.js";
import pagination from "@/components/appPagination.vue";
export default {
  components: {
    pagination,
  },
  data() {
    return {
      nairaFilter,
      percentFilter,
      percentageFilter,
      timeStamp,
      loading: false,
      deposits: [],
    };
  },
  methods: {
    async getDeposits(page = 1) {
      this.loading = true;
      try {
        let res = await this.$axios.get(
          `/admin/get-deposits?page=${page}&status=canceled`
        );
        // console.log(res.data);
        this.deposits = res.data;
      } catch (error) {
        console.log("error");
      }
      this.loading = false;
    },
  },
  async created() {
    this.getDeposits();
  },
};
</script>
