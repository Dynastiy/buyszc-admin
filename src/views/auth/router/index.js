const signIn = () => import("../views/signIn.vue");
const signUp = () => import("../views/signUp.vue");
const home = () => import("../views/HomeView.vue");

export default [
  {
    path: "/home",
    name: "home",
    component: home,
    meta: { title: "Home" },
  },
  {
    path: "/login",
    name: "signin",
    component: signIn,
    meta: { title: "Sign In" },
  },
  {
    path: "/sign-up",
    name: "signup",
    component: signUp,
    meta: { title: "Sign Up" },
  },
];
