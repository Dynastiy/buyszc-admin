<template>

  <div>
    <appHeader />
    <div>
      <div class="landing--page">
        <div class="main--content">
          <div class="container">
            <div class="calculator--box">
              <div class="">
                <h1>
                  Buy <span class="szc">SZC</span> with
                  <span class="text-success"> DALASI</span> or
                  <span class="bnb">BNB</span>
                </h1>
              </div>
              <div class="main--calculator">
                <!-- First Slide  -->
                <div class="first--slide" v-show="slide_1">
                  <p class="small text-danger text-center mb-3 font-weight-bold" v-if="!isLoggedIn">
                    You are not logged In. Please <router-link to="/sign-up">Register</router-link> or <router-link to="/login">Login</router-link> to continue.
                  </p>
                  <div class="ngn--bnb">
                    <label for="" class="mb-2"
                      >Enter Amount of NGN or BNB</label
                    >
                    <div class="d-flex mb-4">
                      <select name="" :disabled="disabled" id="my-select" role="button" @change="chooseCurrency" >
                        <option value="ngn">GMD</option>
                        <option value="bnb">BNB</option>
                      </select>
                      <input type="number" :disabled="disabled" @keyup="exchange" v-if="currency === 'bnb' " placeholder="Amount in BNB" class="w-100" name="" v-model="payload.amount_bnb" id="" />
                      <input type="number" :disabled="disabled" @keyup="exchange" v-else class="w-100" name="" placeholder="Amount in GMD" v-model="payload.amount_naira" id="" />
                    </div>
                  </div>
                  <div class="szc--amount">
                    <label for="" class="mb-2">Amount of SZC</label>
                    <input type="number" class="w-100" :disabled="disabled" v-model="payload.amount_szc" name="" id="" />
                  </div>
                  <div class="mt-3 text-center">
                    <button class="main--btn login" @click="buyszc" v-if="isLoggedIn">Buy</button>
                    <button class="main--btn login" @click="goToRegister" v-else>register</button>
                  </div>
                </div>

                <!-- Second Slide  -->
                <div class="second--slide " v-show="slide_2">
                  <div class="bank--details" v-if="currency === 'ngn' ">
                    <h4 class="mb-4">
                      Make Payment to receive
                      <span class="szc">{{ payload.amount_szc }} SZC</span> worth
                      <span class="text-success">₦{{ payload.amount_naira }}</span>
                    </h4>
                    <p>Bank Name: ZENITH BANK</p>
                    <h5 class="my-2">Account Number: <span> {{ account_details.account_number }} </span>
                <span class="material-icons" type="button" style="font-size:16px; color: #ff0000"
                  v-clipboard:copy="account_details.account_number"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">content_copy</span></h5>
                    <h6>Account Name: EVANGELIST SAM-ZUGA</h6>
                  </div>
                  <div class="bnb--address" v-else>
                    <h4>
                      Make Payment to receive
                      <span class="szc">{{ payload.amount_szc }} SZC</span> worth
                      <span class="bnb">{{ payload.amount_bnb }}BNB</span>
                    </h4>
                    <h5>
                      <h5>BNB Wallet Address: <span class="material-icons" type="button" style="font-size:16px; color: #ff0000"
                  v-clipboard:copy="account_details.bnb"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">content_copy</span> <span class="small"> {{ account_details.bnb }} </span>
                </h5>
                    </h5>
                  </div>
                  <div
                    class="mt-3 text-center d-flex align-items-center justify-content-center"
                    style="gap: 20px"
                  >
                    <button class="main--btn login" @click="backTo2">
                      Back
                    </button>
                    <button class="main--btn login" @click="step3">
                      Continue
                    </button>
                  </div>
                </div>

                <!-- Third Slide  -->
                <div class="third--slide" v-show="slide_3">
                  <div class="szc--amount">
                    <label for="" class="mb-2">Enter Wallet Address</label>
                    <input type="text" v-model="payload.wallet_address" class="w-100" name="" id="" />
                  </div>
                  <div class="szc--amount mt-3" v-if="currency === 'bnb' ">
                    <label for="" class="mb-2">Enter Transaction Hash</label>
                    <input type="text" v-model="payload.transaction_hash" class="w-100" name="" id="" />
                  </div>
                  <div class="szc--amount mt-3" v-else>
                    <div class="center" >
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
                  </div>
                  <div
                    class="mt-3 text-center d-flex align-items-center justify-content-center"
                    style="gap: 20px"
                  >
                    <button class="main--btn login" @click="goBack">
                      Back
                    </button>
                    <button class="main--btn login" @click="complete">
                      Complete
                    </button>
                  </div>
                </div>

                <!-- Completed Slide  -->
                <div class="text-center" v-show="slide_4">
                  <span
                    class="material-icons bg-success rounded-circle text-white p-2"
                    style="font-size: 60px"
                  >
                    check
                  </span>
                  <h3 class="text-success">Success</h3>
                  <h6 class="mb-3">Funds will be disbursed in...</h6>
                  <h4 id="countdown" class="mt-4"></h4>
                  <progress value="0" max="180" id="progressBar"></progress>
                  <!-- <p>View Dashboard for Status</p> -->
                  <div class="mt-3">
                    <button class="main--btn login">
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


<!-- HOw it Works -->
         <section class="how-it-works mt-4">
        <div class="container">
            <h2 class="text-center mb-4">How it Works</h2>
            <div>
              <p>
                     Sam Zugacoin is a unique brainchild that aims to rebuild Africa's dying economy by becoming Africa's first coin in equity and investment funding for Africa's government instead of China. Starting a business in Africa can often be a gargantuan task, especially since the prospects of obtaining a loan are few and far between, we will give out loans to aid businesses and encourage investors.
<pre></pre><b> BUYSZC ACCEPTS PAYMENTS DONE MANUALLY INTO A SPECIFIC BANK ACCOUNTS or BNB Wallets AND CONFIRMATION IS DONE 3MIN AFTER A SUCCESFUL TRANSACTION. </b>

<pre></pre>
You can logged into your dashboard to monitor your transaction STATUS if SUCCESFULL or PENDING.
                </p>
            </div>
        </div>
    </section>
      </div>
    </div>
    <appFooter />
  </div>
</template>

<script src="vue-clipboard2-master/dist/vue-clipboard.min.js"></script>
<script>
import axios from 'axios'
import appHeader from '../components/appHeader.vue';
import appFooter from '../components/appFooter.vue';
export default {
  components: { appHeader, appFooter },
  data() {
    return {
      slide_1: true,
      slide_2: false,
      slide_3: false,
      slide_4: false,
      payload: {
        payment_proof: null,
        amount_szc: '',
        amount_bnb: '',
        amount_naira: '',
        transaction_hash: '',
        wallet_address: '',
      },
      account_details: {
        account_number: "6020303879",
        bnb: "0x5e5fAd42089b30C32BA0114757c647889e65bd43"
      },
      currency: '',
      naira_rate: '',
      exchange_Price: '',
      usdPrice: '',
      bnb_rate: '',
      disabled: true,
    };
  },
  methods: {
    onCopy: function (e) {
      //  console.log(e);
       this.$toastify({
          text: `Copied`,
          className: "info",
          style: {
            background: "#f00",
          },
        }).showToast();
    },
    
    chooseCurrency(){
      var priceOptions = document.getElementById("my-select");
      var selOption = priceOptions.options[priceOptions.selectedIndex].value;
      // console.log(selOption);
      this.currency = selOption
      this.exchange()
    },
     getNaira(){
      axios
        .get('https://v6.exchangerate-api.com/v6/068c19b21593d6f62990aa1b/pair/USD/GMD')
        .then((response) => {
          // console.log(response.data.conversion_rate);
          this.naira_rate = response.data.conversion_rate
        })
    },
    getSZC() {
      axios
        .get('https://prices.szcmerchant.com/api/assets/3')
        .then((response) => {
          this.zuga_data = response.data
          this.usdPrice = response.data.recent_price
          // console.log(this.usdPrice);
          // console.log(this.zuga_data);
        })
    },
    exchange() {
       if (this.currency === 'bnb' ) {
         let price = (this.bnb_rate * (1 / this.usdPrice)  ) * this.payload.amount_bnb
          this.payload.amount_szc = String(price)
          // console.log(price);

       }
       else if (this.currency === 'ngn' ) {
         let price =  ((1/this.naira_rate) * (1 / this.usdPrice)  ) * this.payload.amount_naira
          this.payload.amount_szc = String(price)
       }
       else{
         this.payload.amount_szc = '';
       }
     },
     async getBnB(){
        let response = await axios.get('https://api.coincap.io/v2/assets/binance-coin')
            this.bnb_rate = response.data.data.priceUsd
            // console.log(this.bnb_rate);
            
    },
    showPreview($event) {
      var input = event.target;
      this.payload.payment_proof = input.files[0];
      // this.payload.payment_proof  = URL.createObjectURL(event.target.files[0])
      // console.log(this.payload.payment_proof);
      if ($event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";
      }
    },
    onError: function (e) {
       console.log('Failed to copy texts')
    },
    goToRegister(){
      this.$router.push('/sign-up')
    },
    buyszc() {
      this.slide_1 = false;
      this.slide_2 = true;
    },
    step3() {
      this.slide_2 = false;
      this.slide_3 = true;
    },
    goBack() {
      this.slide_3 = false;
      this.slide_2 = true;
    },
    backTo2(){
     this.slide_1 = true;
      this.slide_2 = false;
    },
    complete() {
      this.slide_3 = false;
      this.slide_4 = true;
      // Submit Buy Szc Request
      this.createDeposit()
    // Countdown timer function
    },
    async createDeposit(){
      if (this.$store.getters.isLoggedIn) {
       
      if (this.currency  == 'bnb' ) {
        let formData = new FormData()
      formData.append("amount_bnb" , this.payload.amount_bnb)
      formData.append("transaction_hash" , this.payload.transaction_hash)
      formData.append("wallet_address" , this.payload.wallet_address)
      formData.append("amount_szc", this.payload.amount_szc)
      try {
        const res =  await this.$axios.post('/create-deposit', formData)
        // console.log(res);
        var timeleft = 180;
          document.getElementById("countdown").innerHTML = timeleft;
          var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
              clearInterval(downloadTimer);
              var timeralert = document.getElementById("countdown")
              var progressBar = document.getElementById("progressBar")
              timeralert.style.display = "none"
              progressBar.style.display = "none"
            }
            document.getElementById("countdown").innerHTML = timeleft + "secs";
            document.getElementById("progressBar").value = 180 - timeleft;
            timeleft -= 1;
          }, 1000);
      } catch (error) {
        console.log('error');
      }
      }
      else{
        let formData = new FormData()
      formData.append("amount_naira" , this.payload.amount_naira)
      formData.append("wallet_address" , this.payload.wallet_address)
      formData.append("payment_proof" , this.payload.payment_proof)
      formData.append("amount_szc", this.payload.amount_szc)
      try {
        const res =  await this.$axios.post('/create-deposit', formData)
        console.log('res');
        var timeleft = 180;
          document.getElementById("countdown").innerHTML = timeleft;
          var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
              clearInterval(downloadTimer);
              var timeralert = document.getElementById("countdown")
              var progressBar = document.getElementById("progressBar")
              timeralert.style.display = "none"
              progressBar.style.display = "none"
            }
            document.getElementById("countdown").innerHTML = timeleft + "secs";
            document.getElementById("progressBar").value = 180 - timeleft;
            timeleft -= 1;
          }, 1000);
      } catch (error) {
        console.log('error');
      }
      }
      }
      else {
       console.log("you are not logged in");
    }
  }
  },
  mounted(){
    this.getNaira();
    this.getSZC();
    this.getBnB();
         if (this.$store.getters.isLoggedIn) {
           this.disabled = false;
        }
        // console.log(this.$store.getters.isLoggedIn);
  },
  created(){
    this.currency = 'ngn'
  },
  computed:{
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    }
  }
};
</script>

<style scoped>
@import url('@/assets/css/partials.css');
body {
    background-color: var(--accent-color);
}

body.active {
    background-color: rgba(0, 0, 0, 0.7);
}

.row {
    padding: 0;
    margin: 0;
}

.app--header {
    background-color: #fff;
    padding: 1rem 0;
    box-shadow:inset 0px 6px 9px rgba(0, 0, 0, 0.04);
}


.hero--section h1 {
    font-size: 48px;
}

.span {
    color: var(--secondary-color);
}

.main--content{
    background: url('../../../assets/img/bg.png');
    height: 80vh;
        background-size: cover;
        background-color: rgba(0, 0, 0, 0.7);
        background-blend-mode: overlay;
        display: flex;
        align-items: center;
}
/* Main App Drawer  */

.main--app--drawer {
    background-color: #fff;
    width: 252px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    height: 100vh;
    /* overflow-y: scroll; */
}

.top--image {
    padding: 2rem 0;
}

.main--app--drawer .menu--header {
    color: var(--secondary-color);
    text-transform: uppercase;
    font-size: 14px;
    display: block;
    padding: 0.5rem 2rem;
    font-weight: bold;
}

.main--app--drawer a {
    color: var(--main-color);
    display: block;
    padding: 0.8rem 2rem;
    font-size: 14px;
    font-weight: 400;
}

.main--app--drawer .router-link-exact-active {
    background-color: var(--secondary-color);
    color: #fff;
    font-weight: bold;
}

.main--app--drawer a:hover {
    background-color: var(--secondary-color);
    color: #fff;
}


/* Dashboard App Drawer  */

#main--dashboard {
    margin-left: 252px;
    padding: 2rem;
}


br {
    margin: 0;
}

.buy--btn {
    background-color: var(--secondary-color);
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 10px;
    margin-top: 20px;
    color: var(--main-color);
    font-weight: bold;
    width: 100%;
    border: 1px solid var(--secondary-color);
}

.buy--btn:hover {
    background-color: transparent;
    color: var(--secondary-color);
}

.amount {
    padding: 50px 0;
    background-color: var(--main-color);
}

.user--login {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login--box {
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.04);
    padding: 2rem;
    border-radius: 10px;
    background-color: #fff;
    width: 30%;
}

.login--box input {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    border: 1px solid var(--main-color);
    /* margin-bottom: 15px; */
}

.login--box a {
    color: var(--secondary-color) !important;
}

#dashboard--header {
    margin-left: 252px;
    background-color: #fff;
    padding: 1rem 2rem;
}

.search--field {
    background: var(--accent-color);
    border-radius: 10px;
    border: 1px solid var(--gray-400);
    width: 40%;
    padding-left: 0.4rem;
}

.search--field input[type="search"] {
    border: none;
    background-color: transparent;
    display: block;
    width: 100%;
    padding: 0.6rem 0.2rem;
    border-radius: 10px;
}

.search--field input[type="search"]:focus {
    outline: none;
}

.search--field input[type="search"]::placeholder {
    color: var(--gray-500);
}

.user--avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-weight: bold;
    border-radius: 50%;
}

.a,
.b,
.c,
.d,
.e,
.A,
.B,
.C,
.D,
.E {
    background-color: #FF0000 !important;
    color: #fff;
}

.f,
.g,
.h,
.i,
.j,
.J,
.I,
.H,
.G,
.F {
    background-color: #FFB20F;
}

.K,
.L,
.M,
.N,
.O,
.P,
.m,
.n,
.o,
.p,
.k,
.l {
    background-color: #000;
    color: #fff;
}

.q,
.r,
.s,
.t,
.u,
.Q,
.R,
.S,
.T,
.U {
    background-color: #01445f;
    color: #fff;
}

.v,
.w,
.x,
.y,
.z,
.V,
.W,
.X,
.Y,
.Z {
    background-color: rgb(11, 100, 11);
    color: #fff;
}

.menu--open {
    display: none;
}

.menu--close {
    display: none;
}


/* Dashboard */

.analytics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
}


.table td,
.table th {
    border-top: none;
    border-bottom: none;
    font-size: 0.8rem;
    vertical-align: middle;
}

.table td {
    color: var(--main-color);
    font-weight: 500;
}

.table thead th {
    border-bottom: none;
    color: var(--gray-600) !important;
}

.other--tables .table thead th {
    border-bottom: 1px solid var(--main-color);
    color: var(--gray-700);
}

.other--tables .table td {
    color: var(--gray-800);
}

.cancelled {
    background-color: rgb(255, 198, 198);
    color: red;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
}

.completed {
    background-color: #CBF4C9;
    color: rgb(3, 116, 3);
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
}

.pending {
    background-color: rgb(255, 229, 189);
    color: #ffb20f;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
}



.activate {
    background-color: #007337;
    border-radius: 5px;
    padding: 2px 10px;
    border: none;
    font-size: 15px;
}

.activate:hover {
    background-color: #00733893;
}

.de_activate {
    background-color: #ffff00c5;
    border-radius: 5px;
    padding: 2px 10px;
    border: none;
    font-size: 15px;
}

.de_activate:hover {
    background-color: #ffff0073;
}

.ban {
    background-color: rgba(255, 0, 0, 0.747);
    border-radius: 5px;
    padding: 2px 10px;
    border: none;
    font-size: 15px;
}

.ban:hover {
    background-color: rgba(255, 0, 0, 0.4);
}

.unban {
    background-color: rgba(172, 255, 47, 0.74);
    border-radius: 5px;
    padding: 2px 10px;
    border: none;
    font-size: 15px;
}

.unban:hover {
    background-color: rgba(172, 255, 47, 0.4);
}

.top .work__header {
    color: var(--accent-text-color);
    margin: 0;
    font-size: 0.9rem;
}

.top .small {
    color: var(--inactive-text2);
    font-size: 0.7rem;
    margin-top: 0.4rem;
}


/* Right Side */


.center {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-input input {
    display: none;
}

.form-input label {
    display: block;
    /* width:45%; */
    /* height:45px; */
    /* margin-left: 25%; */
    /* padding: 0.3rem 4rem; */
    /* line-height:20px; */
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    background: var(--main-color);
    color: #fff !important;
    font-size: 14px;
    /* font-family:"Open Sans",sans-serif; */
    /* text-transform:Uppercase; */
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.form-input img {
    width: 100%;
    height: 100px;
    display: none;
    margin-bottom: 20px;
}


/* App Footer  */

.footer {
    background: var(--main-color);
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: bottom;
    margin-top: 3.3rem;
}

.footer a,
.footer p {
    color: var(--gray-200);
}

.footer a:hover {
    color: var(--gray-100);
}

.footer h4 {
    color: var(--secondary-color);
}

.customer--care {
    position: fixed;
    bottom: 3%;
    right: 0;
    z-index: 999999;
}

.back-to-top {
    background-color: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: max-content;
    border: none;
    padding: 0.4rem;
    font-size: 5rem;
    /* top: 0;
    left: 0; */
}

.logout {
    background-color: var(--secondary-color);
    color: #fff;
    padding: 0.3rem 1.2rem;
    border-radius: 5px;
}

.logout:hover {
    cursor: pointer;
}

.calculator--box{
    /* height: 500px; */
    display: grid;
    align-items: center;
    grid-template-columns: 40% 60%;
}
.main--calculator {
    background-color: #fff;
    border-radius: 10px;
    /* height: 300px; */
    /* box-shadow: inset 0px 3px 4px rgba(0, 0, 0, 0.7); */
    padding: 1.8rem;
    width: 100%;
   
}
.main--calculator label{
    display: block;
}
.main--calculator .szc--amount  input[type=number], .main--calculator .szc--amount  input[type=text]{
    width: 100%;
    padding: 0.5rem 0.3rem;
    border-radius: 5px;
    border: 1px solid var(--gray-400);
}
.main--calculator .ngn--bnb input[type=number]{
    width: 100%;
    padding: 0.5rem 0.3rem;
    border-radius: 0 5px 5px 0;
    border: 1px solid var(--gray-400);
    border-left: none;
}
.main--calculator select{
    /* width: 100%; */
    padding: 0.5rem 0.3rem;
    background-color: var(--main-color);
    color: #fff;
    /* font-weight: bold; */
    /* border-radius: 5px; */
    border-radius: 5px 0 0 5px;
    border: 1px solid var(--gray-400);
}
.main--calculator select:focus {
    outline: none;
}
.main--calculator select option {
    padding: 1rem !important;
}
.szc {
    color: #f0b90b;
}
.bnb {
    color: #f0b90b;
}
.main--content h1 {
    color: #fff;
    font-size: 3rem;
}
    @media (max-width: 990px) {
        .calculator--box {
            grid-template-columns: auto;
        }
        .main--content h1 {
            text-align: center;
        }
        .login--box {
            width: 90%;
        }
        .prices {
            grid-template-columns: auto;
            gap: var(--spacer);
            margin-top: 50px;
        }
        /* .hero--section {
            height: ;
        } */
        .container {
            padding: 0.3rem 1rem;
        }
        .amount--container {
            grid-template-columns: auto;
        }
        .main--btn {
            padding: 0.5rem 0.9rem;
        }
        .login--box {
            width: 90%;
        }
        .main--app--drawer {
            left: -1000px;
            z-index: 999;
        }
        .main--app--drawer.active {
            left: 0;
        }
        #main--dashboard {
            margin-left: 0;
            padding: 0.8rem 1rem;
        }
        #dashboard--header {
            margin-left: 0;
            padding: 0.8rem 1rem;
        }
        #side-bar {
            width: 70%;
        }
        .menu--open {
            display: block;
        }
        .menu--close {
            display: block;
        }
        .analytics {
            grid-template-columns: auto;
            grid-gap: 20px;
        }
        .single__user {
            display: unset;
        }
        .right__side {
            margin-top: 0.8rem;
        }
        .payment-modal-content {
            width: 80%;
        }
    }
</style>
