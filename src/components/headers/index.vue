<template>
	<component :is="component" />
</template>
<script setup lang="ts">
import Fleet from '@/components/headers/modules/Fleet.vue'
import Dashboard from '@/components/headers/modules/Dashboard.vue'
import RouteSearches from '@/components/headers/modules/routeSearches.vue'
import Admin from '@/components/headers/modules/Admin.vue'
import Drivers from '@/components/headers/modules/Drivers.vue'
import Events from '@/components/headers/modules/Events.vue'
import Transactions from '@/components/headers/modules/Transactions.vue'
import Referral from '@/components/headers/modules/Referral.vue'
import Promotion from '@/components/headers/modules/Promotion.vue'
import Partners from '@/components/headers/modules/Partners.vue'
const componentRouteKey = {
    admin: Admin,
    dashboard: Dashboard,
    drivers: Drivers,
    events: Events,
    transactions: Transactions,
    fleet: Fleet,
    referral: Referral,
    promotion: Promotion,
    partners: Partners,
    'route-searches': RouteSearches
}

const component = computed(() => {
    const res = useRoute().fullPath.split('/')
    const parentRoute = useRoute().fullPath.split('/')[1]
    const routeMap = new Map()
    routeMap.set([...res], parentRoute)
    return routeMap
})

</script>
<style scoped></style>
