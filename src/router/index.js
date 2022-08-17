import Vue from "vue";
import VueRouter from "vue-router";
// import DashboardLayout from "../views/layouts/dashboardLayout.vue";

// Routes
import authRoutes from "../views/auth/router";
import adminRoutes from "../views/admin/router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import (
                /* webpackChunkName: "about" */
                "../views/auth/views/signIn.vue"
            ),
    },
    {
        path: "/sign-in",
        name: "Sign In",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/auth/views/signIn.vue"),
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: routes.concat(authRoutes, adminRoutes),
});

export default router;