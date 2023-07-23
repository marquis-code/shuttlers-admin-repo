<template>
	<component :is="component" />
</template>

<script setup lang="ts">
import Dashboard from '@/components/headers/modules/Dashboard.vue'
import RouteSearches from '@/components/headers/modules/routeSearches.vue'

const componentRouteKey = {
    '/dashboard': Dashboard,
    '/route-searches': RouteSearches
}

const component = computed(() => {
    console.log(useRoute().path)
    return componentRouteKey[useRoute().path]
})
</script>

<style scoped>

</style>
