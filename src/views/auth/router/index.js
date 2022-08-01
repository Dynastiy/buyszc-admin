const signIn = () => import("../views/signIn.vue");
const signUp = () => import("../views/signUp.vue");

export default [
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
