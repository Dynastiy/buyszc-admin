const AdminDashboard = () => import("../views/AdminDashboard");
const AdminDeposits = () => import("../views/Deposits/views/AllDeposits");
const ViewDeposit = () => import("../views/Deposits/views/ViewDeposit");
const PendingDeposit = () => import("../views/Deposits/views/PendingDeposit");
const CompletedDeposit = () =>
  import("../views/Deposits/views/CompletedDeposits");
const CanceledDeposits = () =>
  import("../views/Deposits/views/CanceledDeposits");

const AllWithdrawal = () => import("../views/Withdrawal/AllWithdrawal");

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
        if (hasPermission == "admin") {
          next();
        } else {
          next({
            path: "/login",
            query: { redirectFrom: to.fullPath },
          });
        }
      } catch (e) {
        next({
          name: "Login",
          query: { redirectFrom: to.fullPath },
        });
      }
    },

    children: [
      {
        path: "/admin/dashboard",
        name: "Dashboard - Admin",
        component: AdminDashboard,
      },
      {
        path: "/admin/dashboard/deposits",
        name: "Dashboard - Deposits",
        component: AdminDeposits,
      },
      {
        path: "/admin/dashboard/deposits/:id",
        name: "Dashboard - Deposit",
        component: ViewDeposit,
      },
      {
        path: "/admin/dashboard/deposit/pending",
        name: "Dashboard - Pending Deposit",
        component: PendingDeposit,
      },
      {
        path: "/admin/dashboard/deposit/completed",
        name: "Dashboard - Completed Deposit",
        component: CompletedDeposit,
      },
      {
        path: "/admin/dashboard/deposit/cancelled",
        name: "Dashboard - Cancelled Deposit",
        component: CanceledDeposits,
      },
      {
        path: "/admin/dashboard/withdrawals",
        name: "Dashboard - Withdrawals",
        component: AllWithdrawal,
      },
    ],
  },
];
