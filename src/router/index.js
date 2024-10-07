import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Product from '@/views/Product/index.vue'
import Cart from '@/views/Cart/index.vue'
import OrderPage from '@/views/Order/OrderPage.vue'
import OrderList from '@/views/Order/OrderList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: Product,
        },
        {
          path: "/cart",
          component: Cart
        },
        {
          path: "/login",
          component: Login
        },
        {
          path: "/orders",
          component: OrderList
        },
        {
          path: "/orders/:id",
          component: OrderPage
        }
      ]
    }
  ]
})

export default router
