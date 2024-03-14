import userIcon from '@/assets/icons/src/users.vue'
import userInsight from '@/assets/icons/src/users/insights.vue'
import manageIUser from '@/assets/icons/src/users/manage.vue'
import batchBookingUser from '@/assets/icons/src/users/batch-book.vue'
import userBatchRefund from '@/assets/icons/src/users/batch-refund.vue'

export default {
  title: 'Users',
  routePath: '/users/insights',
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
      description: 'Insights into company requests',
      iconComponent: userInsight
    },
    {
      title: 'Manage Users',
      routePath: '/users',
      oldPath: '/users/list',
      shouldRedirect: false,
      description: '',
      iconComponent: manageIUser
    },
    {
      title: ' Batch Bookings',
      routePath: '/users/bookings',
      oldPath: '/bookings/batch/',
      shouldRedirect: false,
      description: '',
      iconComponent: batchBookingUser
    },
    {
      title: ' Batch Refund',
      routePath: '/users/batch-refund',
      shouldRedirect: false,
      description: '',
      iconComponent: userBatchRefund
    }
  ]
}
