import userIcon from '@/assets/icons/src/users.vue'

export default
  {
    title: 'Users',
    outePath: '/users/insights',
    description: '',
    iconComponent: shallowRef(userIcon),
    rootPath: '/users',
    modulePermission: 'USERS',
    children: [
      {
        title: 'Insights',
        routePath: '/users/insights',
          oldPath: '/users/insights',
          shouldRedirect: false,
        description: 'Insights into company requests'
      },
      {
        title: 'Manage Users',
        routePath: '/users',
        oldPath: '/users/list',
          shouldRedirect: false,
        description: ''
      },
      {
        title: ' Batch Bookings',
        routePath: '/users/bookings',
        oldPath: '/bookings/batch/',
          shouldRedirect: false,
        description: ''
      },
      {
        title: ' Batch Refund',
        routePath: '/users/batch-refund',
          shouldRedirect: false,
        description: ''
      }
    ]
    }
