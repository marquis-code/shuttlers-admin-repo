<template>
	<Modal
		modal="$atts.modal"
		:title="isEdit ? 'Update assigned routes' : 'Assign routes'"
	>
		<form class="flex flex-col gap-4 w-full" @submit.prevent="assignRoutesToEvent">
			<RouteSelector v-if="!isEdit" :multiple="true" @selected="routes = $event" />
			<div v-else class="flex flex-col gap-2">
				<div v-for="n in routes" :key="n.id" class="bg-grey9 flex items-center gap-4 justify-between p-2 rounded-md">
					<p class="text-sm text-dark font-medium">
						{{ n.routeCode }} - {{ n.pickup }}
					</p>
					<Icon name="closed" class="w-5 text-red cursor-pointer shrink-0" @click="removeFromRoutes(n?.id)" />
				</div>
			</div>

			<button type="submit" :disabled="loading || !routes?.length"
				class="mt-40 text-sm bg-dark p-4 text-white text-center w-full border-none outline-none rounded disabled:cursor-not-allowed disabled:bg-[#E0E6ED] capitalize"
			>
				{{ loading ? 'processing...' : 'Assign routes' }}
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useAddRoutesToEvent } from '@/composables/modules/events'

const { loading, routes, assignRoutesToEvent, isEdit, clearObj } = useAddRoutesToEvent()

const removeFromRoutes = (id:number|string) => {
    routes.value = routes.value.filter((el) => el?.id !== id)
}
onBeforeUnmount(() => clearObj())
</script>

<style scoped>
label{
	margin: 0;
}
</style>
