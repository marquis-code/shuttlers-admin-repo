<template>
	<component :is="component" />
</template>
<script setup lang="ts">
import GenericHeader from './GenericHeader.vue'
import ShuttleRequests from '@/components/headers/modules/Companies/shuttleRequests.vue'
import Fleets from '@/components/headers/modules/Fleets/index.vue'
import AddFleets from '@/components/headers/modules/Fleets/AddFleets.vue'
import Dashboard from '@/components/headers/modules/Dashboard.vue'
import RouteSearches from '@/components/headers/modules/routeSearches.vue'
import Admin from '@/components/headers/modules/Admin/index.vue'
import CreateAdmin from '@/components/headers/modules/Admin/add-admin.vue'
import Drivers from '@/components/headers/modules/Drivers/index.vue'
import DriverDetails from '@/components/headers/modules/Drivers/driver-details.vue'
import Events from '@/components/headers/modules/Events.vue'
import Transactions from '@/components/headers/modules/Transactions/index.vue'
import Transactions_id from '@/components/headers/modules/Transactions/id.vue'
import Referral from '@/components/headers/modules/Referral.vue'
import Promotion from '@/components/headers/modules/Promotion.vue'
import Partners from '@/components/headers/modules/Partners/index.vue'
import Companies from '@/components/headers/modules/Companies/index.vue'
import Company_insight from '@/components/headers/modules/Companies/insight.vue'
import Campaigns from '@/components/headers/modules/Campaigns.vue'
import Users from '@/components/headers/modules/Users/index.vue'
import NotifyUsers from '@/components/headers/modules/Users/notify.vue'
import AddUser from '@/components/headers/modules/Users/add-user.vue'
import UsersInsights from '@/components/headers/modules/Users/insights.vue'
import BatchRefund from '@/components/headers/modules/Users/batch-refund.vue'
import BatchBooking from '@/components/headers/modules/Users/BatchBooking/index.vue'
import CreateBatchBooking from '@/components/headers/modules/Users/BatchBooking/create-batch-booking.vue'
import sos from '@/components/headers/modules/commute/sos.vue'
import UserDetails from '@/components/headers/modules/Users/user-details.vue'
import CompanyDetails from '@/components/headers/modules/Companies/company-details.vue'
import BatchBookingDetails from '@/components/headers/modules/Users/BatchBooking/batch-booking-details.vue'
import PartnerDetails from '@/components/headers/modules/Partners/partner-details.vue'
import PartnerPayout from '@/components/headers/modules/Partners/partner-payout.vue'
import Trips from '@/components/headers/modules/Trips/index.vue'
import Routes from '@/components/headers/modules/Routes/index.vue'
import Waitlist from '@/components/headers/modules/Waitlist/index.vue'
import SuggestedRoutes from '@/components/headers/modules/Routes/suggested-routes.vue'
import Charter from '@/components/headers/modules/Charter/index.vue'
import TripTracking from '@/components/headers/modules/Trips/track-vehicle.vue'

const componentRouteArray = [
    { routes: ['dashboard'], component: Dashboard },
    { routes: ['route-searches', 'route-searches-top-destination', 'route-searches-top-origin'], component: RouteSearches },
    { routes: ['companies', 'companies-demo-requests'], component: Companies },
    { routes: ['companies-id-status-company-info', 'companies-id-status-stats', 'companies-id-status-staff', 'companies-id-status-wallet', 'companies-id-status-trip-report', 'companies-id-status-company-groups', 'companies-id-status-credit-line', 'companies-id-status-routes', 'companies-id-status-requests', 'companies-id-status-corporate-pay', 'companies-id-status-staff-settings', 'companies-id-status-capacity-configuration'], component: CompanyDetails },
    { routes: ['companies-insights'], component: Company_insight },
    { routes: ['companies-shuttle-requests'], component: ShuttleRequests },
    { routes: ['users'], component: Users },
    { routes: ['users-add'], component: AddUser },
    { routes: ['users-batch-refund', 'users-batch-refund-create'], component: BatchRefund },
    { routes: ['users-notify'], component: NotifyUsers },
    { routes: ['users-insights'], component: UsersInsights },
    { routes: ['users-bookings'], component: BatchBooking },
    { routes: ['users-id-active-bookings', 'users-id-cancelled-trips', 'users-id-credit-line-usage', 'users-id-past-bookings', 'users-id-rides', 'users-id-transactions', 'users-id-user-info'], component: UserDetails },
    { routes: ['users-bookings-create-batch-booking'], component: CreateBatchBooking },
    { routes: ['users-bookings-id-booking-info'], component: BatchBookingDetails },
    { routes: ['partners', 'partners-new-partners', 'partners-interested-partners'], component: Partners },
    { routes: ['partners-payouts'], component: PartnerPayout },
    { routes: ['partners-id-accountSid-partner-info', 'partners-id-accountSid-vehicles', 'partners-id-accountSid-drivers', 'partners-id-accountSid-completed-trips', 'partners-id-accountSid-accounts'], component: PartnerDetails },
    { routes: ['drivers'], component: Drivers },
    { routes: ['drivers-id-driver-info', 'drivers-id-customer-rating'], component: DriverDetails },
    { routes: ['events', 'events-upcoming'], component: Events },
    { routes: ['transactions'], component: Transactions },
    { routes: ['transactions-id'], component: Transactions_id },
    { routes: ['fleet', 'fleet-inspection-days'], component: Fleets },
    { routes: ['fleet-add'], component: AddFleets },
    { routes: ['referral'], component: Referral },
    { routes: ['promotion'], component: Promotion },
    { routes: ['campaigns'], component: null },
    { routes: ['admin'], component: Admin },
    { routes: ['admin-add'], component: CreateAdmin },
    { routes: ['configuration'], component: null },
    { routes: ['campaigns'], component: Campaigns },
    { routes: ['trips-sos'], component: sos },
    { routes: ['trips-type-active', 'trips-type-upcoming', 'trips-type-completed', 'trips-type-bus-captains'], component: Trips },
    { routes: ['trips-routes', 'trips-routes-suspended'], component: Routes },
    { routes: ['trips-routes-suggested-routes'], component: SuggestedRoutes },
    { routes: ['trips-waitlist'], component: Waitlist },
    { routes: ['trips-charter'], component: Charter },
    { routes: ['trips-vehicle'], component: TripTracking },
    { routes: ['users-id-past-bookings-b_id'], component: GenericHeader }
]

const componentRouteKey = componentRouteArray.reduce((acc, curr) => {
    curr.routes.forEach((route) => {
        acc[route] = curr.component
    })
    return acc
}, {})

const component = computed(() => {
    return componentRouteKey[useRoute().name as string]
})
</script>
<style scoped></style>
