const routes = [
  // Đăng nhập
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
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
  },
  // admin
  {
    path: '/admin/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        meta: {
          title: 'Thống kê'
        },
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue')
      },
      {
        path: 'categories',
        meta: {
          title: 'Danh mục'
        },
        name: 'categories',
        component: () => import('pages/Category.vue')
      },
      {
        path: 'products',
        meta: {
          title: 'Sản phẩm'
        },
        name: 'products',
        component: () => import('pages/Product.vue')
      },
      {
        path: 'orders',
        meta: {
          title: 'Đơn hàng'
        },
        name: 'orders',
        component: () => import('pages/Order.vue')
      },
      {
        path: 'blogs',
        meta: {
          title: 'Tin tức'
        },
        name: 'blogs',
        component: () => import('pages/Article.vue')
      },
      {
        path: 'contracts',
        meta: {
          title: 'Liên hệ'
        },
        name: 'contracts',
        component: () => import('pages/Contact.vue')
      },
      {
        path: 'banner',
        meta: {
          title: 'banner'
        },
        name: 'banner',
        component: () => import('pages/Banner.vue')
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
