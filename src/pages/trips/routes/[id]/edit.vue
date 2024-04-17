<template>
	<Skeleton v-if="fetchingRoute" height="300px" radius="15px" />
	<div v-else class="flex">
		<ModulesRoutesCreateForm class="md:min-w-[360px] w-4/12" />
		<MapDisplay :start-point="startPosition" :end-point="endPosition" :props-loading="ploylineLoading" :encoded-polyline="polyline" class="w-8/12 rounded-br-xl" height="87vh" />
	</div>
</template>

<script setup lang="ts">

import { useCreateRoute } from '@/composables/modules/routes/create'

const { endPosition, startPosition, loading, polyline, ploylineLoading, initEditRoute, fetchingRoute } = useCreateRoute()

initEditRoute()

definePageMeta({
  layout: 'dashboard-zero',
  middleware: ['is-authenticated']
})

</script>
