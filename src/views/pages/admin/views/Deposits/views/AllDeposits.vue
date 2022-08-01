<template>
  <div>
    <h3 class="text-xl font-bold">All Deposits</h3>
    <div class="mt-4 other--tables">
      <div class="search--field d-flex align-items-center ml-auto my-4">
        <span class="material-icons"> search </span>
        <input
          type="search"
          v-model="search_data"
          name=""
          id=""
          placeholder="Search by Wallet Address or Reference No. . . "
          @keyup="getDeposits"
        />
      </div>
      <div class="table-responsive">
        <table class="table table-centered table-nowrap mb-0">
          <thead class="bg-[#000407] text-white">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date</th>
              <th scope="col">Wallet Address</th>
              <th scope="col">Amount (GMD)</th>
              <th scope="col">Amount (BNB)</th>
              <!-- <th scope="col">Amount (SZC)</th> -->
              <th scope="col">Transaction Hash</th>
              <!-- <th scope="col">Payment Proof</th> -->
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody v-if="!loading">
            <tr
              v-for="(deposit, index) in deposits.data"
              :key="index"
              class="cursor-pointer"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ timeStamp(deposit.created_at) }}</td>
              <td>{{ deposit.wallet_address }}</td>
              <td>
                {{ formatCurrency(deposit.amount_gambian_dalasi, "gmd") }}
              </td>
              <td>
                <span v-if="deposit.amount_bnb"
                  >{{ deposit.amount_bnb }} BNB</span
                >
                <span v-else>N/A</span>
              </td>
              <td>
                <span v-if="deposit.amount_szc">{{ deposit.amount_szc }}</span>
                <span v-else>Null</span>
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
              <!-- <td>
                <button
                  class="view--more--disabled"
                  disabled
                  v-if="deposit.status !== 'pending'"
                >
                  Done
                </button>
                <div v-else>
                  <button class="view--more mr-2" @click="creditUser(deposit)">
                    Credit
                  </button>
                  <button
                    class="view--more bg-danger border-danger"
                    @click="cancelDeposit(deposit)"
                  >
                    Cancel
                  </button>
                </div>
              </td> -->
            </tr>
            <tr v-show="deposits.total === 0" class="text-danger">
              Nothing Here . . .
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

      <div>
        <pagination :meta="deposits" @next="getDeposits" />
      </div>
    </div>

    <!-- Modal to Credit User -->
    <div class="sure-modal" v-show="confirm_box">
      <div class="are-you-sure text-center">
        <h1>
          <!-- 💡⁉️ <br /> -->
          Credit User
        </h1>
        <div class="mt-3" v-if="!loading2">
          <div class="center">
            <div class="form-input">
              <div class="preview">
                <img id="file-ip-1-preview" />
              </div>
              <label class="px-3 py-1" for="file-ip-1">Upload Proof</label>
              <input
                type="file"
                id="file-ip-1"
                accept="image/*"
                @change="showPreview($event)"
              />
            </div>
          </div>
          <div class="mt-3">
            <label for="">Description</label>
            <div>
              <input
                class="form-control"
                v-model="description"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
        </div>

        <div v-else>
          <p class="text-danger">Please Wait</p>
        </div>

        <div class="d-flex justify-content-center mt-3" style="gap: 10px">
          <button class="btn btn-success" @click="credit">Done</button
          ><button class="btn btn-danger" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
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
      search_data: "",
      loading2: "",
      description: "",
      credit_proof: null,
      confirm_box: false,
    };
  },
  methods: {
    formatCurrency(amount, currency) {
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: currency,
      });
    },
    showPreview($event) {
      var input = event.target;
      this.credit_proof = input.files[0];
      console.log(this.credit_proof);
      if ($event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";
      }
    },
    async getDeposits(page = 1) {
      this.loading = true;
      try {
        let res = await this.$axios.get(`/admin/get-deposits/?page=${page}`);
        console.log(res.data);
        this.deposits = res.data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async completeDeposit() {
      try {
        let formData = new FormData();
        formData.append("status", "completed");
        let res = await this.$axios.post(
          "/admin/update-deposit-status/" + this.id,
          formData
        );
        console.log(res);
        this.getDeposits();
      } catch (error) {
        console.log(error);
      }
    },
    async cancelDeposit(deposit) {
      try {
        let formData = new FormData();
        formData.append("status", "canceled");
        let res = await this.$axios.post(
          "/admin/update-deposit-status/" + deposit.id,
          formData
        );
        console.log(res);
        this.getDeposits();
      } catch (error) {
        console.log(error);
      }
    },
    creditUser(deposit) {
      this.id = deposit.id;
      this.confirm_box = !this.confirm_box;
    },
    closeModal() {
      this.confirm_box = !this.confirm_box;
    },
    async credit() {
      this.loading2 = true;
      try {
        let formData = new FormData();
        formData.append("credit_proof", this.credit_proof);
        formData.append("description", this.description);
        let res = await this.$axios.post(
          "/admin/credit-user/" + this.id,
          formData
        );
        console.log(res);
        this.completeDeposit();
        this.getDeposits();
      } catch (error) {
        console.log(error);
      }
      this.loading2 = false;
      this.confirm_box = !this.confirm_box;
      this.getDeposits();
    },
  },
  async created() {
    this.getDeposits();
  },
};
</script>

<style scoped>
.table thead th {
  color: white !important;
}
.dropdown-toggle::after {
  display: none;
}
</style>
