// Composables
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("@/components/Landing.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/components/SignUp.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/components/Profile.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/AdminView.vue"),
     
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/components/UserBoard.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
