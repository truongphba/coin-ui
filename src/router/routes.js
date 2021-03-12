const routes = [
  // Đăng nhập
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/Register.vue')
  },
  // Đăng xuất
  {
    path: '/logout',
    name: 'logout',
    component: () => import('pages/Logout.vue')
  },
  // Client
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: '',
        meta: {
          title: 'Home'
        },
        name: 'home',
        component: () => import('pages/Home.vue')
      },
      {
        path: 'market',
        meta: {
          title: 'Market'
        },
        name: 'market',
        component: () => import('pages/Market.vue')
      },
      {
        path: 'news',
        meta: {
          title: 'News'
        },
        name: 'news',
        component: () => import('pages/News.vue')
      },
      {
        path: 'news/:id',
        meta: {
          title: 'News Detail'
        },
        name: 'newDetail',
        component: () => import('pages/NewDetail.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
