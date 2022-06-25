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
      },
      {
          path: '/list',
          name: 'List',
          component: () => import('@/views/DocList.vue'),
      },
      {
          path: '/new-doc',
          name: 'NewDoc',
          component: () => import('@/views/NewDoc.vue'),
      },
      {
          path: '/detail/:slug',
          name: 'Detail',
          component: () => import('@/views/DocDetail.vue'),
      }
  ]
})

export default router
