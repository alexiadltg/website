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
    path: "/admin/users",
    name: "admin",
    component: () => import("@/components/AdminBoard.vue"),
     
  },
  {
    path: "/admin/gameSettings",
    name: "adminGame",
    component: () => import("@/components/GameSettings.vue"),
     
  },
  {
    path: "/admin/stats",
    name: "adminStats",
    component: () => import("@/components/Image.vue"),
     
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
