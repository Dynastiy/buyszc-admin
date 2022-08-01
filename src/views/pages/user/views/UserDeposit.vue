<template>
  <div>
    <div class="flex justify-between items-center">
      <h3 class="font-bold text-xl">Make Deposit</h3>
      <div class="flex space-x-2 justify-center">
        <!-- <button
          type="button"
          class="inline-block px-6 py-2.5 bg-[#f0b90b] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          VIEW MY DEPOSITS
        </button> -->
      </div>
    </div>
    <div class="my-5 block rounded-lg shadow-lg bg-white lg:w-2/4 mx-auto">
      <div class="flex">
        <div
          @click="active = 1"
          class="cursor-pointer w-1/2 text-center p-2"
          :class="active == 1 ? 'bg-[#000407] text-white' : ''"
        >
          Transfer Crypto
        </div>
        <div
          @click="active = 2"
          class="cursor-pointer w-1/2 text-center p-2"
          :class="active == 2 ? 'bg-[#000407] text-white' : ''"
        >
          Bank Transfer
        </div>
      </div>
      <form
        class="p-6"
        v-if="active == 1"
        @submit.prevent="bankDeposit"
        id="makeDeposit"
      >
        <div class="form-group mb-6">
          <label
            for="exampleInputEmail1"
            class="form-label inline-block mb-2 text-gray-700"
            >Wallet address</label
          >
          <input
            v-model="payload.wallet_address"
            value="0x5e5fAd42089b30C32BA0114757c647889e65bd43"
            disabled
            type="text"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter wallet address"
          />
          <small
            id="emailHelp"
            class="cursor-pointer font-bold text-right pr-3 block mt-1 text-xs text-gray-600"
            type="button"
            v-clipboard:copy="'0x5e5fAd42089b30C32BA0114757c647889e65bd43'"
            v-clipboard:success="onCopy"
            >Copy</small
          >
        </div>
        <!-- <div class="form-group mb-6">
          <label
            for="exampleInputPassword1"
            class="form-label inline-block mb-2 text-gray-700"
            >Transaction Hash</label
          >
          <input
            v-model.number="payload.transaction_hash"
            type="text"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputPassword1"
            placeholder="Tranx hash"
          />
        </div> -->
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword1"
            class="form-label inline-block mb-2 text-gray-700"
          >
            SZC</label
          >
          <input
            v-model.number="payload.amount_szc"
            type="number"
            step="any"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputPassword1"
            placeholder="SZC amount"
          />
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword1"
            class="form-label inline-block mb-2 text-gray-700"
            >Gambian Dalasi</label
          >
          <input
            v-model="computedDalasiRate"
            type="number"
            step="any"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputPassword1"
            placeholder="Dalasi equivalent"
          />
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword1"
            class="form-label inline-block mb-2 text-gray-700"
            >BNB Amount</label
          >
          <input
            v-model="computedBNBRate"
            type="number"
            step="any"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputPassword1"
            placeholder="BNB amount"
          />
        </div>

        <span
          class="block text-center cursor-pointer w-100 mt-3 w-full px-6 py-3 bg-[#000407] text-[#f0b90b] font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-white hover:shadow-none hover:text-[#f0b90b] transition duration-150 ease-in-out"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <span>Upload Payment Proof</span>
        </span>
        <!-- <button
          type="submit"
          class="mt-3 w-full px-6 py-3 bg-[#000407] text-[#f0b90b] font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-white hover:shadow-none hover:text-[#f0b90b] transition duration-150 ease-in-out"
        >
          <div class="d-flex justify-content-center" v-if="loading">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <span v-else>Make Deposit</span>
        </button> -->
      </form>
      <form class="p-6" v-else @submit.prevent="bankDeposit">
        <!-- <div class="form-group mb-6">
          <label
            for="exampleInputEmail1"
            class="form-label inline-block mb-2 text-gray-700"
            >Wallet address</label
          >
          <input
            value="0x5e5fAd42089b30C32BA0114757c647889e65bd43"
            disabled
            type="text"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter wallet address"
          />
          <small
            id="emailHelp"
            class="cursor-pointer font-bold text-right pr-3 block mt-1 text-xs text-gray-600"
            type="button"
            v-clipboard:copy="'0x5e5fAd42089b30C32BA0114757c647889e65bd43'"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >Copy</small
          >
        </div> -->
        <div class="form-group mb-6">
          <label
            for="exampleInputEmail1"
            class="form-label inline-block mb-2 text-gray-700"
            >SZC Amount</label
          >
          <input
            v-model.number="payload.amount_szc"
            type="number"
            step="any"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="SZC Amount"
          />
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword1"
            class="form-label inline-block mb-2 text-gray-700"
            >Gambian Dalasi</label
          >
          <input
            v-model="computedDalasiRate"
            type="number"
            step="any"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputPassword1"
            placeholder="Dalasi equivalent"
          />
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword1"
            class="form-label inline-block mb-2 text-gray-700"
            >BNB Amount</label
          >
          <input
            v-model="computedBNBRate"
            type="number"
            step="any"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputPassword1"
            placeholder="BNB amount"
          />
        </div>
        <div class="form-group mb-6">
          <div
            class="flex justify-between items-center cursor-pointer"
            @click="showBankDetails = !showBankDetails"
          >
            <h5 class="form-label inline-block mb-2 text-gray-700">
              View bank details
            </h5>
            <svg
              v-if="showBankDetails"
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
                d="M5 15l7-7 7 7"
              />
            </svg>
            <svg
              v-else
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div class="bg-gray-300 p-2" v-if="showBankDetails">
            <div class="flex justify-between items-center">
              <h4 class="text-xs font-semibold md:text-base">Bank Name</h4>
              <h4 class="text-xs font-semibold md:text-base">ZENITH BANK</h4>
            </div>
            <div class="flex justify-between my-4">
              <h4 class="text-xs font-semibold md:text-base">Account Number</h4>
              <div
                class="flex flex-col items-center gap-2 text-xs font-semibold md:text-base"
              >
                <div class="flex gap-2 items-center">
                  <h4 class="text-xs font-semibold md:text-base">GMD -</h4>
                  <h4 class="text-xs font-semibold md:text-base">6020303879</h4>

                  <span
                    v-clipboard:copy="'6020303879'"
                    v-clipboard:success="onCopy"
                  >
                    <svg
                      type="button"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
                <div class="flex gap-2 items-center">
                  <h4 class="text-xs font-semibold md:text-base">USD -</h4>
                  <h4 class="text-xs font-semibold md:text-base">4070301895</h4>
                  <span
                    v-clipboard:copy="'4070301895'"
                    v-clipboard:success="onCopy"
                  >
                    <svg
                      type="button"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
                <div class="flex gap-2 items-center">
                  <h4 class="text-xs font-semibold md:text-base">EURO -</h4>
                  <h4 class="text-xs font-semibold md:text-base">4080301138</h4>
                  <span
                    v-clipboard:copy="'4080301138'"
                    v-clipboard:success="onCopy"
                  >
                    <svg
                      type="button"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <h4 class="text-xs font-semibold md:text-base">Account Name</h4>
              <h4 class="text-xs font-semibold md:text-base">
                EVANGELIST SAM-ZUGA
              </h4>
            </div>
          </div>
        </div>
        <div class="form-group mb-6">
          <label
            for="formFile"
            class="form-label inline-block mb-2 text-gray-700"
            >Upload proof of payment</label
          >
          <input
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
            required
            @change="handleImage"
          />
        </div>

        <button
          type="submit"
          class="mt-3 w-full px-6 py-3 bg-[#000407] text-[#f0b90b] font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-white hover:shadow-none hover:text-[#f0b90b] transition duration-150 ease-in-out"
        >
          <div class="d-flex justify-content-center" v-if="loading">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <span v-else>Make Deposit</span>
        </button>
      </form>
    </div>

    <!-- Confirm Hash -->
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div
      class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog relative w-auto pointer-events-none">
        <div
          class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
        >
          <div
            class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
          >
            <h5
              class="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalLabel"
            >
              Proof of Payment
            </h5>
            <button
              type="button"
              class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body relative p-4">
            <div class="form-group mb-6">
              <label
                for="exampleInputPassword1"
                class="form-label inline-block mb-2 text-gray-700"
                >Transaction Hash</label
              >
              <input
                v-model="payload.transaction_hash"
                required
                type="text"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputPassword1"
                placeholder="Tranx hash"
              />
              <small class="text-red-500" v-if="hashErr">
                * Enter transaction hash
              </small>
            </div>
          </div>
          <div
            class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
          >
            <button
              type="button"
              class="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              form="makeDeposit"
              type="submit"
              class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
            >
              Make Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBankDetails: false,
      hashErr: false,
      isFile: false,
      loading: false,
      active: 1,
      dalasiRate: 142.11,
      bnbRate: 0.178391,
      formData: new FormData(),
      payload: {
        wallet_address: "0x5e5fAd42089b30C32BA0114757c647889e65bd43",
        amount_szc: 0,
        amount_gambian_dalasi: 0,
      },
    };
  },

  computed: {
    computedDalasiRate() {
      return Number(Math.round(this.dalasiRate * this.payload.amount_szc));
    },
    computedBNBRate() {
      return Number(this.bnbRate * this.payload.amount_szc);
    },
  },

  methods: {
    onCopy: function (e) {
      this.$toastify({
        text: ` ${e.text} copied!`,
        className: "success",
        style: {
          background: "green",
        },
      }).showToast();
    },
    handleImage(e) {
      this.isFile = true;
      let files = e.target.files;
      if (!files.length) return;
      this.formData = new FormData();
      this.formData.append("payment_proof", files[0], files[0].name);
    },
    async bankDeposit() {
      this.payload.amount_gambian_dalasi = this.computedDalasiRate;
      this.payload.amount_bnb = this.computedBNBRate;

      if (this.payload.transaction_hash || this.isFile) {
        Object.keys(this.payload).forEach((key, value) => {
          this.formData.append(key, this.payload[key]);
          console.log(value);
        });
        try {
          this.loading = true;
          let res = await this.$axios.post("/create-deposit", this.formData);
          console.log(res);

          this.$toastify({
            text: ` ${res.data.message}`,
            className: "success",
            style: {
              background: "green",
            },
          }).showToast();
          this.loading = false;
          (this.formData = new FormData()),
            (this.payload = {
              wallet_address: "0x5e5fAd42089b30C32BA0114757c647889e65bd43",
              amount_szc: 0,
              amount_gambian_dalasi: 0,
            });
          this.hashErr = false;
        } catch (error) {
          this.loading = false;
          console.log(error);
          this.$toastify({
            text: ` ${error.response.data.message}`,
            className: "success",
            style: {
              background: "red",
            },
          }).showToast();
          console.log(error.response);
        }
      } else {
        this.hashErr = true;

        console.log(90);
      }
    },
  },
};
</script>

<style></style>
