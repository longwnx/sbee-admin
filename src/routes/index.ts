export const routes = [
  {
    path: '/',
    name: 'Thiết kế',
    children: [
      {
        path: '/',
        name: 'Trang Home',
      },
      {
        path: '/design/custom-pages',
        name: 'Trang tuỳ chỉnh',
      },
      {
        path: '/design/theme',
        name: 'Giao diện',
      },
    ],
  },
  {
    path: '/settings',
    name: 'Cài đặt',
  },
  {
    path: '/app-store-info',
    name: 'Cửa hàng',
  },
  {
    path: '/notifications',
    name: 'Thông báo',
  },
  {
    path: '/manage-user',
    name: 'Quản lý người dùng',
  },
]
