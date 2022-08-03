<template>
  <div>
    <div class="">
      <!-- <button
        type="button"
        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        data-bs-toggle="modal"
        data-bs-target="#withdwar"
      >
        Vertically centered modal
      </button> -->
    </div>

    <div
      class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="withdwar"
      tabindex="-1"
      aria-labelledby="withdwarTitle"
      aria-modal="true"
      role="dialog"
    >
      <div
        class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none"
      >
        <div
          class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
        >
          <div
            class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
          >
            <h5
              class="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalScrollableLabel"
            >
              Withdraw Funds
            </h5>
            <button
              type="button"
              class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body relative p-4">
            <form id="editAccount" @submit.prevent="withdraw">
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Bank Name</label
                >
                <input
                  required
                  v-model="payload.bank_name"
                  type="text"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInputPassword1"
                  placeholder="Bank name"
                />
              </div>
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Account Number</label
                >
                <input
                  required
                  v-model="payload.account_no"
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInputPassword1"
                  placeholder="Account number"
                />
              </div>
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Account Holder's Name</label
                >
                <input
                  required
                  v-model="payload.account_name"
                  type="text"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInputPassword1"
                  placeholder="Holder's name"
                />
              </div>
              <div class="form-group mb-6">
                <label
                  for="exampleInputPassword1"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Amount (GMD)
                </label>
                <input
                  required
                  v-model="payload.amount"
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-1 border-solid border-[#f0b90b] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInputPassword1"
                  placeholder="Amount"
                />
              </div>
            </form>
          </div>
          <div
            class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
          >
            <button
              type="button"
              class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              form="editAccount"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
            >
              Withdraw
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
      payload: {},
    };
  },

  methods: {
    async withdraw() {
      try {
        let res = await this.$axios.post(`/make-withdrawal`, this.payload);

        if (res.data.success != false) {
          this.$toastify({
            text: ` ${res.data.message}`,
            className: "success",
            style: {
              background: "green",
            },
          }).showToast();
        }

        this.$emit("getAccounts");

        this.account = {};
      } catch (error) {
        this.$toastify({
          text: ` ${error.response.data.message}`,
          className: "warning",
          style: {
            background: "red",
          },
        }).showToast();
      }
    },
  },
};
</script>

<style></style>
