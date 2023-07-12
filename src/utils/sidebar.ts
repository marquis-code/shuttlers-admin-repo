
// const isProductionEnv = process.env.VUE_APP_API_URL === 'https://api.shuttlers.africa' || process.env.VUE_APP_API_URL === 'https://api.shuttlers.ng'

export const TOP_LEVEL_SIDEBAR_MENUS = [
  {
    title: 'Dashboard',
    routePath: '/dashboard',
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/home.svg'),
    children: null,
    modulePermission: ['ROUTES', 'CORPORATES', 'USERS', 'TRIPS', 'PARTNERS', 'DRIVERS', 'EVENTS', 'TRANSACTIONS', 'VEHICLES', 'REFERRALS', 'PROMOTIONS', 'ADMINCONFIG', 'STAFF']
  },
  {
    title: 'Route Search',
    routePath: 'route-searches.review',
    description: '',
    iconPath: null,
    rootPath: '/route-searches',
    feIcon: 'fe-compass',
    children: null,
    modulePermission: 'ROUTES'
  }
]

export const OPS_AND_MANAGEMENT_SIDEBAR_MENUS = [
  {
    title: 'Corporates',
    routePath: null,
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/companies.svg'),
    rootPath: '/companies',
    modulePermission: 'CORPORATES',
    children: [
      {
        title: 'Insights',
        routePath: 'CompanyInsights',
        description: 'Insights into company requests'
      },
      {
        title: 'Companies',
        routePath: 'Companies',
        description: '',
        excludedPaths: ['/companies/insights']
      }
    ]
  },
  {
    title: 'Users',
    routePath: null,
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/users.svg'),
    rootPath: '/users',
    modulePermission: 'USERS',
    children: [
      {
        title: 'Insights',
        routePath: 'UsersInsight',
        description: 'Insights into company requests'
      },
      {
        title: 'Manage Users',
        routePath: 'Users',
        description: '',
        excludedPaths: ['/users/insights']
      },
      {
        title: ' Batch Bookings',
        routePath: 'ListBatchBookings',
        description: ''
      }
    ]
  },

  {
    title: 'Commute',
    routePath: null,
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/charter.svg'),
    rootPath: '/routes',
    modulePermission: ['TRIPS', 'ROUTES', 'CHARTER'],
    children: [
      {
        title: 'Trips',
        routePath: 'Trips',
        description: 'Insights into company requests',
        excludedPaths: ['/trips/track-vehicle']
      },
      {
        title: 'Track Vehicle',
        routePath: 'NewTrackVehicle',
        description: ''
      },
      {
        title: 'Routes',
        routePath: 'RoutesList',
        description: 'All routes',
        excludedPaths: ['/routes/suggested-routes']
      },
      {
        title: 'Suggested routes',
        routePath: 'SuggestedRoutes',
        description: ''
      },
      {
        title: 'Waitlist',
        routePath: 'WaitList',
        description: ''
      },
      {
        title: 'Charter',
        routePath: 'ChartersList',
        description: 'Handle shuttlers charter requests'
      }
    ]
  },
  {
    title: 'Vehicle Partners',
    routePath: null,
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/vehicle_partner.svg'),
    rootPath: '/partners',
    modulePermission: 'PARTNERS',
    children: [
      {
        title: 'Partners List',
        routePath: 'PartnersList',
        description: 'Vechiles Partners List'
      },
      {
        title: 'Payout',
        routePath: 'Payout',
        description: 'Vechiles Partners payout'
      }
    ]
  },
  {
    title: 'Drivers',
    routePath: 'DriversList',
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/users.svg'),
    children: null,

    modulePermission: 'DRIVERS'
  },
  {
    title: 'Events',
    routePath: 'EventList',
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/fleet management.svg'),
    rootPath: '/events',
    children: null,
    modulePermission: 'EVENTS'
  },
  {
    title: 'Transactions',
    routePath: 'transactions.index',
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/payment.svg'),
    children: null,
    modulePermission: 'TRANSACTIONS'
  },
  {
    title: 'Fleet',
    routePath: 'Fleet',
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/charter.svg'),
    children: null,
    modulePermission: 'VEHICLES'
  },
  {
    title: 'Referral Codes',
    routePath: 'ListReferralCodes',
    description: '',
    iconPath: null,
    feIcon: 'fe-tag',
    children: null,
    modulePermission: 'PROMOTIONS'
  },
  {
    title: 'Promo Codes',
    routePath: 'ListPromoCode',
    description: '',
    iconPath: null,
    feIcon: 'fe-tag',
    modulePermission: 'PROMOTIONS',
    children: null
  },

  {
    title: 'Campaigns',
    routePath: null,
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/vehicle_partner.svg'),
    rootPath: '/games&campaigns',
    modulePermission: 'CAMPAIGNS',
    children: [
      {
        title: 'Valentine',
        routePath: 'ValentineCampaignList',
        description: 'Valentine management'
      },
      {
        title: 'CMS Banners',
        routePath: 'BannerConfig',
        description: 'CMS promotional banner',
        excludedPaths: ['/games&campaigns/valentine']
      }
    ]
  }
].filter((i) => !!i)

export const ADMIN_SIDEBAR_MENUS = [
  {
    title: 'Admins',
    routePath: 'StaffList',
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/admin.svg'),
    children: null,
    rootPath: '/admin',
    modulePermission: 'STAFF',
    requiredAdmin: true
  },
  {
    title: 'Configure',
    routePath: null,
    description: '',
    // iconPath: require('@/assets/img/icons/sidebar/configure.svg'),
    rootPath: '/configuration',
    modulePermission: 'ADMINCONFIG',
    children: [
      {
        title: 'Trip Rating Settings',
        routePath: 'TripRatingSettings',
        description: 'Configure and manage trip rating parameters'
      },
      {
        title: 'Vehicle Categories',
        routePath: 'VehicleCategoryManagement',
        description: 'Manage vehicle categories'
      },
      {
        title: 'Amenities',
        routePath: 'VehicleAmenitiesSettings',
        description: 'Manage vehicle amenities'
      },
      {
        title: 'Route Price Control',
        routePath: 'PricingControls',
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
        if (menu.title === 'Dashboard') return true
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
