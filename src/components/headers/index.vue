<template>
	<component :is="component" />
</template>
<script setup lang="ts">
import { headerComponentRouteArray } from '@/utils/dashboard_headers'

const componentRouteKey = headerComponentRouteArray.reduce((acc, curr) => {
    curr.routes.forEach((route) => {
        acc[route] = curr.component
    })
    return acc
}, {})

const component = computed(() => {
    return componentRouteKey[useRoute().name as string]
})

</script>
