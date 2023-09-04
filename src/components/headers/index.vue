<template>
	<component :is="component" />
</template>
<script setup lang="ts">
import ShuttleRequests from '@/components/headers/modules/Companies/shuttleRequests.vue'
import Fleets from '@/components/headers/modules/Fleets/index.vue'
import AddFleets from '@/components/headers/modules/Fleets/AddFleets.vue'
import Dashboard from '@/components/headers/modules/Dashboard.vue'
import RouteSearches from '@/components/headers/modules/routeSearches.vue'
import Admin from '@/components/headers/modules/Admin.vue'
import Drivers from '@/components/headers/modules/Drivers.vue'
import Events from '@/components/headers/modules/Events.vue'
import Transactions from '@/components/headers/modules/Transactions.vue'
import Referral from '@/components/headers/modules/Referral.vue'
import Promotion from '@/components/headers/modules/Promotion.vue'
import Partners from '@/components/headers/modules/Partners.vue'
import Companies from '@/components/headers/modules/Companies/index.vue'
import Company_insight from '@/components/headers/modules/Companies/insight.vue'
import Campaigns from '@/components/headers/modules/Campaigns.vue'
import Users from '@/components/headers/modules/Users/index.vue'
import NotifyUsers from '@/components/headers/modules/Users/notify.vue'
import UsersInsights from '@/components/headers/modules/Users/insights.vue'
import BatchRefund from '@/components/headers/modules/Users/batch-refund.vue'
import BatchBooking from '@/components/headers/modules/Users/BatchBooking/index.vue'
import CreateBatchBooking from '@/components/headers/modules/Users/BatchBooking/create-batch-booking.vue'
import sos from '@/components/headers/modules/commute/sos.vue'
import UserDetails from '@/components/headers/modules/Users/user-details.vue'

const componentRouteArray = [
    { routes: ['dashboard'], component: Dashboard },
    { routes: ['route-searches', 'route-searches-top-destination', 'route-searches-top-origin'], component: RouteSearches },
    { routes: ['companies', 'companies-demo-requests'], component: Companies },
    { routes: ['companies-insights'], component: Company_insight },
    { routes: ['companies-shuttle-requests'], component: ShuttleRequests },
    { routes: ['users'], component: Users },
    { routes: ['users-batch-refund', 'users-batch-refund-create'], component: BatchRefund },
    { routes: ['users-notify'], component: NotifyUsers },
    { routes: ['users-insights'], component: UsersInsights },
    { routes: ['users-bookings'], component: BatchBooking },
    { routes: ['users-id-active-bookings', 'users-id-cancelled-trips', 'users-id-credit-line-usage', 'users-id-past-bookings', 'users-id-rides', 'users-id-transactions', 'users-id-user-info'], component: UserDetails },
    { routes: ['users-bookings-create-batch-booking'], component: CreateBatchBooking },
    { routes: ['trips'], component: null },
    { routes: ['partners'], component: Partners },
    { routes: ['drivers'], component: Drivers },
    { routes: ['events', 'events-upcoming'], component: Events },
    { routes: ['transactions'], component: Transactions },
    { routes: ['fleet', 'fleet-inspection-days'], component: Fleets },
    { routes: ['fleet-add'], component: AddFleets },
    { routes: ['referral'], component: Referral },
    { routes: ['promotion'], component: Promotion },
    { routes: ['campaigns'], component: null },
    { routes: ['admin'], component: Admin },
    { routes: ['configuration'], component: null },
    { routes: ['campaigns'], component: Campaigns },
    { routes: ['trips-sos'], component: sos }
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
