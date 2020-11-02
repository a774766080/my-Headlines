import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      { path: '', component: () => import('@/views/Home') },
      { path: '/qa', component: () => import('@/views/qa') },
      { path: '/video', component: () => import('@/views/video') },
      { path: '/my', component: () => import('@/views/my') }
    ]
  },
  { path: '/search', component: () => import('@/views/search') },
  { path: '/article/:articleId', name: 'article', component: () => import('@/views/arcicle'), props: true }
]

const router = new VueRouter({
  routes
})

export default router
