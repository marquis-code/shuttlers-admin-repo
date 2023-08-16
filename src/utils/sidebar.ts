import homeIcon from '@/assets/icons/src/home.vue'
import routeIcon from '@/assets/icons/src/compass.vue'
import corporateIcon from '@/assets/icons/src/companies.vue'
import userIcon from '@/assets/icons/src/users.vue'
import partnerIcon from '@/assets/icons/src/vehicle_partner.vue'
import eventIcon from '@/assets/icons/src/fleet management.vue'
import transactionIcon from '@/assets/icons/src/payment.vue'
import charterIcon from '@/assets/icons/src/charter.vue'
import tagIcon from '@/assets/icons/src/tag.vue'
import adminIcon from '@/assets/icons/src/admin.vue'
import configureIcon from '@/assets/icons/src/configure.vue'

export const TOP_LEVEL_SIDEBAR_MENUS = [
  {
    title: 'Dashboard',
    routePath: '/dashboard',
    description: '',
    iconComponent: shallowRef(homeIcon),
    children: null,
    modulePermission: ['ROUTES', 'CORPORATES', 'USERS', 'TRIPS', 'PARTNERS', 'DRIVERS', 'EVENTS', 'TRANSACTIONS', 'VEHICLES', 'REFERRALS', 'PROMOTIONS', 'ADMINCONFIG', 'STAFF']
  },
  {
    title: 'Route Search',
    routePath: '/route-searches',
    description: '',
    iconComponent: shallowRef(routeIcon),
    rootPath: '/route-searches',
    children: null,
    modulePermission: 'ROUTES'
  }
]

export const OPS_AND_MANAGEMENT_SIDEBAR_MENUS = [
  {
    title: 'Corporates',
    routePath: '/companies/insights',
    description: '',
    iconComponent: shallowRef(corporateIcon),
    rootPath: '/companies',
    modulePermission: 'CORPORATES',
    children: [
        {
        title: 'Insights',
        routePath: '/companies/insights',
        description: 'Insights into company requests'
      },
      {
        title: 'Companies',
        routePath: '/companies',
        description: '',
        excludedPaths: ['/companies/insights']
      }

    ]
  },
  {
    title: 'Users',
    routePath: null,
    description: '',
    iconComponent: shallowRef(userIcon),
    rootPath: '/users',
    modulePermission: 'USERS',
    children: [
      {
        title: 'Insights',
        routePath: '/users',
        description: 'Insights into company requests'
      },
      {
        title: 'Manage Users',
        routePath: '/users',
        description: '',
        excludedPaths: ['/users/insights']
      },
      {
        title: ' Batch Bookings',
        routePath: '/users',
        description: ''
      }
    ]
  },
  {
    title: 'Commute',
    routePath: null,
    description: '',
    iconComponent: shallowRef(charterIcon),
    rootPath: '/trips',
    modulePermission: ['TRIPS', 'ROUTES', 'CHARTER'],
    children: [
      {
        title: 'Trips',
        routePath: '/trips',
        description: 'Insights into company requests',
        excludedPaths: ['/trips/track-vehicle']
      },
      {
        title: 'Track Vehicle',
        routePath: '/trips',
        description: ''
      },
      {
        title: 'Routes',
        routePath: '/trips',
        description: 'All routes',
        excludedPaths: ['/routes/suggested-routes']
      },
      {
        title: 'Suggested routes',
        routePath: '/trips',
        description: ''
      },
      {
        title: 'Waitlist',
        routePath: '/trips',
        description: ''
      },
      {
        title: 'Charter',
        routePath: '/trips',
        description: 'Handle shuttlers charter requests'
      }
    ]
  },
  {
    title: 'Vehicle Partners',
    routePath: null,
    description: '',
    iconComponent: shallowRef(partnerIcon),
    rootPath: '/partners',
    modulePermission: 'PARTNERS',
    children: [
      {
        title: 'Partners List',
        routePath: '/partners',
        description: 'Vechiles Partners List'
      },
      {
        title: 'Payout',
        routePath: '/partners/payouts',
        description: 'Vechiles Partners payout'
      }
    ]
  },
  {
    title: 'Drivers',
    routePath: '/drivers',
    description: '',
    iconComponent: shallowRef(userIcon),
    children: null,
    modulePermission: 'DRIVERS'
  },
  {
    title: 'Events',
    routePath: '/events',
    description: '',
    iconComponent: shallowRef(eventIcon),
    rootPath: '/events',
    children: null,
    modulePermission: 'EVENTS'
  },
  {
    title: 'Transactions',
    routePath: '/transactions',
    description: '',
    iconComponent: shallowRef(transactionIcon),
    children: null,
    modulePermission: 'TRANSACTIONS'
  },
  {
    title: 'Fleet',
    routePath: '/fleet',
    description: '',
    iconComponent: shallowRef(charterIcon),
    children: null,
    modulePermission: 'VEHICLES'
  },
  {
    title: 'Referral Codes',
    routePath: '/referral',
    description: '',
    iconComponent: shallowRef(tagIcon),
    children: null,
    modulePermission: 'PROMOTIONS'
  },
  {
    title: 'Promo Codes',
    routePath: '/promotion',
    description: '',
    iconComponent: shallowRef(tagIcon),
    modulePermission: 'PROMOTIONS',
    children: null
  },
  {
    title: 'Campaigns',
    routePath: null,
    description: '',
    iconComponent: shallowRef(partnerIcon),
    rootPath: '/campaigns',
    modulePermission: 'CAMPAIGNS',
    children: [
      {
        title: 'Valentine',
        routePath: 'campaigns',
        description: 'Valentine management'
      },
      {
        title: 'CMS Banners',
        routePath: 'campaigns',
        description: 'CMS promotional banner',
        excludedPaths: ['/games&campaigns/valentine']
      }
    ]
  }
].filter((i) => !!i)

export const ADMIN_SIDEBAR_MENUS = [
  {
    title: 'Admins',
    routePath: '/admin',
    description: '',
    iconComponent: shallowRef(adminIcon),
    children: null,
    rootPath: '/admin',
    modulePermission: 'STAFF',
    requiredAdmin: true
  },
  {
    title: 'Configure',
    routePath: null,
    description: '',
    iconComponent: shallowRef(configureIcon),
    rootPath: '/configuration',
    modulePermission: 'ADMINCONFIG',
    children: [
      {
        title: 'Trip Rating Settings',
        routePath: '/configuration',
        description: 'Configure and manage trip rating parameters'
      },
      {
        title: 'Vehicle Categories',
        routePath: '/configuration',
        description: 'Manage vehicle categories'
      },
      {
        title: 'Amenities',
        routePath: '/configuration',
        description: 'Manage vehicle amenities'
      },
      {
        title: 'Route Price Control',
        routePath: '/configuration',
        description: 'Manage route pricing centrally'
      }
    ]
  }
]

export function getSidebarMenus(menus, permissionsModules, userRole) {
  return menus
    // eslint-disable-next-line array-callback-return
    .filter((menu) => {
      if (Array.isArray(permissionsModules)) {
        if (menu.title === 'Dashboard' || menu.title === 'Events') return true
        const whiteListRoles = ['admin', 'super_admin']
        if (whiteListRoles.includes(userRole)) return true

        if (userRole === 'user' && menu?.requiredAdmin === true) return false
        for (const permission of permissionsModules) {
          if (whiteListRoles.includes(userRole)) {
            return true
          }

          if (permission === menu.modulePermission) {
            return true
          }

          if (Array.isArray(menu.modulePermission)) {
            if (menu.modulePermission.includes(permission)) {
              return true
            }
          }
        }
      } else {
        return true
      }
    })
    .map((menu) => {
      menu.isOpen = false
      return menu
    })
}
