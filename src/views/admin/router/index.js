const AdminDashboard = () =>
    import ("../views/dashboardView");
const UserLists = () =>
    import ("../views/userView");
const AdminDeposits = () =>
    import ("../views/allTransactions");
const PendingDeposit = () =>
    import ("../views/pendingTransactions");
const CompletedDeposit = () =>
    import ("../views/completedTransactions");
const CanceledDeposits = () =>
    import ("../views/cancelledTransactions");

import DefaultLayout from "../../layouts/dashboardLayout.vue";
import store from "../../../store/index";

export default [{
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

    children: [{
            path: "/admin/dashboard",
            name: "Dashboard - Admin",
            component: AdminDashboard,
        },
        {
            path: "/admin/user-list",
            name: "Dashboard - Users",
            component: UserLists,
        },
        {
            path: "/admin/dashboard/deposits",
            name: "Dashboard - Deposits",
            component: AdminDeposits,
        },
        // {
        //     path: "/admin/dashboard/deposits/:id",
        //     name: "Dashboard - Deposit",
        //     component: ViewDeposit,
        // },
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
        // {
        //     path: "/admin/dashboard/withdrawals",
        //     name: "Dashboard - Withdrawals",
        //     component: AllWithdrawal,
        // },
        // {
        //     path: "/admin/dashboard/withdrawals/pending",
        //     name: "Dashboard - Withdrawals pending",
        //     component: PendingWithdrawal,
        // },
        // {
        //     path: "/admin/dashboard/withdrawals/completed",
        //     name: "Dashboard - Withdrawals completed",
        //     component: CompletedWithdrawal,
        // },
        // {
        //     path: "/admin/dashboard/withdrawals/cancelled",
        //     name: "Dashboard - Withdrawals cancelled",
        //     component: CanceledWithdrawals,
        // },
    ],
}, ];