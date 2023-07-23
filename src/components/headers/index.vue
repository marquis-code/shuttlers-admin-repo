<template>
	<component :is="component" />
</template>

<script setup lang="ts">
import Dashboard from '@/components/headers/modules/Dashboard.vue'
import RouteSearches from '@/components/headers/modules/routeSearches.vue'
import Admin from '@/components/headers/modules/Admin.vue'

const componentRouteKey = {
    admin: Admin,
    dashboard: Dashboard,
    'route-searches': RouteSearches
}

const component = computed(() => {
    const res = useRoute().fullPath.split('/')[1]

    return componentRouteKey[res]
})
</script>

<style scoped>

</style>
