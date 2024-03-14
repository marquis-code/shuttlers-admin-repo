<template>
	<div class="">
		<!-- <ButtonGoBack class="mb-6" /> -->
		<div class="flex h-[calc(100vh-90px)]">
			<ModulesRoutesCreateForm class="md:min-w-[360px]" />

			<MapDisplay :start-point="startPosition" :end-point="endPosition" :props-loading="ploylineLoading" :encoded-polyline="polyline" class="w-8/12 min-h-screen rounded-md" />
		</div>
	</div>
</template>

<script setup lang="ts">

import { useCreateRoute } from '@/composables/modules/routes/create'

const { endPosition, startPosition, loading, polyline, ploylineLoading } = useCreateRoute()

definePageMeta({
  layout: 'dashboard-zero',
  middleware: ['is-authenticated']
})

</script>
