import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/first-setup',
          name: 'FirstSetup',
          component: () => import('@/views/FirstSetup.vue'),
      },
      {
          path: '/second-setup',
          name: 'SecondSetup',
          component: () => import('@/views/SecondSetup.vue'),
      }
  ]
})

export default router
