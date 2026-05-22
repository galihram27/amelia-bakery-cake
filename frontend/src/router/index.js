import { createRouter, createWebHistory } from "vue-router";

// import halaman
import Home from "../components/Home.vue";
import Menu from "../components/Menu.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Cart from "../components/Cart.vue";
import Checkout from "../components/Checkout.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/menu",
    name: "menu",
    component: Menu,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
