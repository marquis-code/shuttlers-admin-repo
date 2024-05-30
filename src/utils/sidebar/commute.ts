import charterIcon from '@/assets/icons/src/charter.vue'
import tripIcon from '@/assets/icons/src/trip.vue'
import trackIcon from '@/assets/icons/src/track.vue'
import commuteTrackVehicleIcon from '@/assets/icons/src/commuteTrackVehicle.vue'
import commuteRoutesIcon from '@/assets/icons/src/commuteRoutes.vue'
import commuteRouteReplayIcon from '@/assets/icons/src/commuteRouteReplay.vue'
import commuteSuggestedRouteIcon from '@/assets/icons/src/commuteSuggestedRoute.vue'
import commuteWaitListIcon from '@/assets/icons/src/commuteWaitlist.vue'
import commuteRentalIcon from '@/assets/icons/src/commuteRental.vue'
import commuteEmergencyReportIcon from '@/assets/icons/src/commuteEmergencyReport.vue'
import commuteTripIssuesIcon from '@/assets/icons/src/commuteTripIssues.vue'
export default {
  title: 'Commute',
  routePath: null,
  description: '',
  iconComponent: shallowRef(charterIcon),
  rootPath: '/trips',
  modulePermission: ['TRIPS', 'ROUTES', 'CHARTER'],
  children: [
    {
      iconComponent: tripIcon,
      title: 'Trips',
      routePath: '/trips/type/active',
      description: 'Insights into company requests',
      oldPath: '/trips/list/active-trips',
      shouldRedirect: false,
      excludedPaths: ['/trips/track-vehicle']
    },
    {
      title: 'Track Vehicle',
      routePath: '/trips/vehicle',
      oldPath: '/trips/track-vehicle',
      shouldRedirect: true,
      description: '',
      iconComponent: markRaw(commuteTrackVehicleIcon)
    },
    {
      title: 'Routes',
      routePath: '/trips/routes',
      oldPath: '/routes',
      description: 'All routes',
      shouldRedirect: true,
      excludedPaths: ['/routes/suggested-routes'],
      iconComponent: markRaw(commuteRoutesIcon)
    },
    {
      title: 'Routes Replay',
      routePath: '/trips/replay',
      oldPath: '/routes',
      description: 'All routes',
      iconComponent: markRaw(commuteRouteReplayIcon)
    },
    {
      title: 'Suggested routes',
      routePath: '/trips/routes/suggested-routes',
      oldPath: '/routes/suggested-routes',
      shouldRedirect: true,
      description: '',
      iconComponent: markRaw(commuteSuggestedRouteIcon)
    },
    {
      title: 'Waitlist',
      routePath: '/trips/waitlist',
      oldPath: '/waitlist',
      shouldRedirect: true,
      description: '',
      iconComponent: markRaw(commuteWaitListIcon)
    },
    {
      title: 'Rental',
      routePath: '/trips/rental',
      description: 'Handle shuttlers charter requests',
      iconComponent: markRaw(commuteRentalIcon)
    },
    {
      title: 'Emergency report',
      routePath: '/trips/sos',
      oldPath: '/trips/sos',
      description: 'Handle shuttlers sos requests',
      iconComponent: markRaw(commuteEmergencyReportIcon)
    },
    {
      title: 'Trip issues',
      routePath: '/trips/trip-issues',
      oldPath: '/trips/trips-issues',
      description: 'Handle shuttlers trip issues',
      iconComponent: markRaw(commuteTripIssuesIcon)
    }
  ]
}
