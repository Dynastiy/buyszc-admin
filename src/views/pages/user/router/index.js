const UserDashboard = () => import("../views/UserDashboard");
const UserDeposit = () => import("../views/UserDeposit");
const UserPendingDeposit = () => import("../views/Deposits/PendingDeposits");
const UserAllDeposit = () => import("../views/Deposits/AllDeposits");
const UserCancelledDeposit = () =>
  import("../views/Deposits/CancelledDeposits");
const UserCompletedDeposit = () =>
  import("../views/Deposits/CompletedDeposits");
const UserDepositDetails = () => import("../views/Deposits/DepositDetails");

const UserAccounts = () => import("../views/Accounts/UserAccounts");

const UserWithdrawals = () => import("../views/Withdrawals/AllWithdrawals");

import DefaultLayout from "../../../layouts/dashboardLayout.vue";
import store from "../../../../store/index";

export default [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DefaultLayout,
    redirect: "/dashboard/user",
    async beforeEnter(to, from, next) {
      try {
        console.log(store);
        var hasPermission = await store.getters.getAdmin;
        console.log(hasPermission);
        if (hasPermission != "admin") {
          next();
        } else {
          next({
            path: "/login",
            query: { redirectFrom: to.fullPath },
          });
        }
      } catch (e) {
        next({
          path: "/login",
          query: { redirectFrom: to.fullPath },
        });
      }
    },

    children: [
      {
        path: "/user/dashboard",
        name: "Dashboard - User",
        component: UserDashboard,
      },
      {
        path: "/user/deposit",
        name: "Dashboard - Deposit",
        component: UserDeposit,
      },
      {
        path: "/user/deposit/pending",
        name: "Dashboard - Deposit-Pending",
        component: UserPendingDeposit,
      },
      {
        path: "/user/deposit/all",
        name: "Dashboard - Deposit-All",
        component: UserAllDeposit,
      },
      {
        path: "/user/deposit/cancelled",
        name: "Dashboard - Deposit-Cancelled",
        component: UserCancelledDeposit,
      },
      {
        path: "/user/deposit/completed",
        name: "Dashboard - Deposit-Completed",
        component: UserCompletedDeposit,
      },
      {
        path: "/user/deposit/:id",
        name: "Dashboard - Deposit-Details",
        component: UserDepositDetails,
      },
      {
        path: "/user/accounts",
        name: "Dashboard - Accounts",
        component: UserAccounts,
      },
      {
        path: "/user/withdrawals",
        name: "Dashboard - Withdrawals",
        component: UserWithdrawals,
      },
    ],
  },
];
