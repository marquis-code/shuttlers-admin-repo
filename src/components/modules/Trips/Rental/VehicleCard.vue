<template>
	<article class="flex flex-col justify-between bg-light rounded-lg shd py-4  w-full cursor-pointer transite relative" :class="{'border-2 border-green7': showBorder}" @click="setSelectedVehicle(data as Vehicle)">
		<div v-if="showBadge" class="px-2.5 py-1.5  flex items-center bg-green7 text-light absolute right-0 text-xs gap-2 rounded-l">
			<Icon name="bus" class="w-3" />
			{{ data.count }} {{ data.count > 1 ? 'Vehicles' : 'Vehicle' }}
		</div>
		<div class="center px-5  ">
			<img :src="data.images[0]" alt="car image" class=" object-cover rounded-lg h-[160px]">
		</div>

		<div class="flex justify-between flex-wrap mt-4 w-full px-5">
			<div class="flex flex-col ">
				<h4 class="font-medium text-sm">
					{{ data.name }}
				</h4>
				<span class="w-60 text-neut6 text-[11px]">{{ truncateString(data.description, 70) }}</span>
			</div>
			<div class="flex flex-col w-auto">
				<span class="text-neut6 text-[11px] ">Starting from</span>
				<h4 class="font-bold text-green7">
					{{ convertToCurrency(data.price) }}
				</h4>
			</div>
		</div>
		<footer class="border-t flex px-5 pt-3 mt-5 gap-2">
			<div v-for="n in data.amenities" :key="n.name" class="badge">
				<img :src="n.image" alt="icon" class="w-4">
				{{ n.short_name }}
			</div>
			<span class="flex items-center justify-center ml-auto gap-2 text-sm">
				<Icon name="star" class="w-4" />
				<p class="p-0 m-0">5.0</p>
			</span>
		</footer>
	</article>
</template>

<script setup lang="ts">
import { truncateString, convertToCurrency } from '@/composables/utils/formatter'
import { useCharterVehicleUsage, Vehicle } from '@/composables/modules/Rentals'

const { setSelectedVehicle, selectedVehicle, selectedVehiclessList } = useCharterVehicleUsage()
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const showBorder = computed(() => {
	if (selectedVehicle.value.id === props.data.id) return true
	return selectedVehiclessList.value.some((vehicle: any) => {
		return vehicle.id === props.data.id
	})
})

const showBadge = computed(() => {
	return selectedVehiclessList.value.some((vehicle: any) => {
		return vehicle.id === props.data.id
	})
})
</script>

<style scoped>
.shd{
box-shadow: 0px 2px 8px 0px rgba(94, 94, 94, 0.12);
}
footer{
	@apply !z-10
}
.badge{
    @apply text-xs font-medium text-grey4 gap-1.5 rounded-full  px-2.5 py-1.5 bg-grey10 flex items-center
}
</style>
