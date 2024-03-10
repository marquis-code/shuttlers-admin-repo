import charterIcon from '@/assets/icons/src/charter.vue'
import tripIcon from '@/assets/icons/src/trip.vue'
import trackIcon from '@/assets/icons/src/track.vue'

  export default {
    title: 'Commute',
    routePath: null,
    description: '',
    iconComponent: shallowRef(charterIcon),
    rootPath: '/trips',
    modulePermission: ['TRIPS', 'ROUTES', 'CHARTER'],
    children: [
      {
        iconComponent: (tripIcon),
        title: 'Trips',
        routePath: '/trips/type/active',
        description: 'Insights into company requests',
        oldPath: '/trips/list/active-trips',
          shouldRedirect: false,
        excludedPaths: ['/trips/track-vehicle']
      },
      {
        iconComponent: (trackIcon),
        title: 'Track Vehicle',
        routePath: '/trips/vehicle',
        oldPath: '/trips/track-vehicle',
          shouldRedirect: true,
        description: ''
      },
      {
        title: 'Routes',
        routePath: '/trips/routes',
        oldPath: '/routes',
        description: 'All routes',
          shouldRedirect: true,
        excludedPaths: ['/routes/suggested-routes']
      },
      {
        title: 'Routes Replay',
        routePath: '/trips/replay',
        oldPath: '/routes',
        description: 'All routes'
      },
      {
        title: 'Suggested routes',
        routePath: '/trips/routes/suggested-routes',
        oldPath: '/routes/suggested-routes',
        shouldRedirect: true,
        description: ''
      },
      {
        title: 'Waitlist',
        routePath: '/trips/waitlist',
        oldPath: '/waitlist',
        shouldRedirect: true,
        description: ''
      },
      {
        title: 'Rental',
        routePath: '/trips/rental',
        description: 'Handle shuttlers charter requests'
      },
      {
        title: 'Emergency report',
        routePath: '/trips/sos',
        oldPath: '/trips/sos',
        description: 'Handle shuttlers sos requests'
      },
      {
        title: 'Trip issues',
        routePath: '/trips/trip-issues',
        oldPath: '/trips/trips-issues',
        description: 'Handle shuttlers trip issues'
      }
    ]
  }
