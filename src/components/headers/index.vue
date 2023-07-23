<template>
	<component :is="component" />
</template>

<script setup lang="ts">
import Dashboard from '@/components/headers/modules/Dashboard.vue'

const componentRouteKey = {
    '/dashboard': Dashboard
}

const component = computed(() => {
    console.log(useRoute().path)
    return componentRouteKey[useRoute().path]
})
</script>

<style scoped>

</style>
